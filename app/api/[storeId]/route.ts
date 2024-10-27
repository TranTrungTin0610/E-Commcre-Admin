import { db, storage } from "@/lib/firebase"
import { Store } from "@/type-db"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { NextResponse } from "next/server"
export const PATCH = async (req: Request, {params}: {params: {storeId: string}})  => { 
    try {
        const {userId} = auth()     
        const body = await req.json() 
        if(!userId) { 
            return new NextResponse("Un-Authorize", {status: 400})
        }    

        if(!params.storeId) { 
            return new NextResponse("Store Name is missing", {status: 400})
        } 
        const {name} = body;  
        if(!name) { 
            return new NextResponse("Store Name is missing", {status: 400})
        }
       const docRef = doc(db, "stores", params.storeId); 
       await updateDoc(docRef, {name})
       const store = (await getDoc(docRef)).data() as Store
        return NextResponse.json(store); 
    } catch (error) {
        console.log(`STORES_PATCH: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }

} 


export const DELETE = async (req: Request, {params}: {params: {storeId: string}})  => { 
    try {
        const {userId} = auth()     
        if(!userId) { 
            return new NextResponse("Un-Authorize", {status: 400})
        }    

        if(!params.storeId) { 
            return new NextResponse("Store Name is Required", {status: 400})
        } 
       const docRef = doc(db, "stores", params.storeId);  
       //TODO: Delete all the subcollections and along with those data filed  
       
       //billboads  
       const billboadsQuerySnapshot = await getDocs(
        collection(db, `stores/${params.storeId}/billboards`) 
       )
       billboadsQuerySnapshot.forEach(async (billboardDoc) => { 
        await deleteDoc(billboardDoc.ref)
        //remove the images from the storage
        const imageUrl = billboardDoc.data().imageUrl
        if(imageUrl){ 
            const imageRef = ref(storage, imageUrl)
            await deleteObject(imageRef)
        }
       })
        //category 
       const sizesQuerySnapshot = await getDocs( 
        collection(db, `stores/${params.storeId}/sizes`)
       )
       sizesQuerySnapshot.forEach(async(sizeDoc)=> { 
        await deleteDoc(sizeDoc.ref)
       })

       //sizes 
       const categoriesQuerySnapshot = await getDocs( 
        collection(db, `stores/${params.storeId}/categories`)
       )
       categoriesQuerySnapshot.forEach(async(categoryDoc)=> { 
        await deleteDoc(categoryDoc.ref)
       })

       //kitchens 
       const kitchensQuerySnapshot = await getDocs( 
        collection(db, `stores/${params.storeId}/kitchens`)
       )
       kitchensQuerySnapshot.forEach(async(kitchenDoc)=> { 
        await deleteDoc(kitchenDoc.ref)
       })
       //cuisine
       const cuisinesQuerySnapshot = await getDocs( 
        collection(db, `stores/${params.storeId}/cuisines`)
       )
       cuisinesQuerySnapshot.forEach(async(cuisineDoc)=> { 
        await deleteDoc(cuisineDoc.ref)
       })
       //products and its images
       const productsQuerySnapshot = await getDocs(
        collection(db, `stores/${params.storeId}/products`) 
       )
       productsQuerySnapshot.forEach(async (productDoc) => { 
        await deleteDoc(productDoc.ref)
        //remove the images from the storage
        const imageArray = productDoc.data().images; 
        if(imageArray && Array.isArray(imageArray)){ 
            await Promise.all( 
                imageArray.map(async (image) => { 
                    const imageRef = ref(storage, image.url) 
                    await deleteObject(imageRef)
                })
            )
        }
       })
       //orders and its products images 
       const ordersQuerySnapshot = await getDocs(
        collection(db, `stores/${params.storeId}/orders`) 
       )
       ordersQuerySnapshot.forEach(async (orderDoc) => { 
        await deleteDoc(orderDoc.ref)


        const ordersItemArray = orderDoc.data().orderItems 
        if(ordersItemArray && Array.isArray(ordersItemArray)){ 
            await Promise.all(
                ordersItemArray.map(async (orderItem) => { 
                    const itemImagesArray = orderItem.images; 
                    if(itemImagesArray && Array.isArray(itemImagesArray)){ 
                        await Promise.all( 
                            itemImagesArray.map(async (image)=> { 
                                const imageRef = ref(storage, image.url)
                                await deleteObject(imageRef)
                            })
                        )
                    }
                })
            )
        }
       })
       //finelly deleting the store
       await deleteDoc(docRef)
        return NextResponse.json({msg: "Store and all of its sub-collections deleted"}); 
    } catch (error) {
        console.log(`STORES_PATCH: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }

} 