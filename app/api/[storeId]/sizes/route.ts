import { db } from "@/lib/firebase";
import { Size } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request, {params} : {params : {storeId: string}}) => { 
    try {
        const {userId} = auth()     
        const body = await req.json() 
        if(!userId) { 
            return new NextResponse("Un-Authorize", {status: 400})
        }   
        const {name, value} = body; 
        if(!name) { 
            return new NextResponse("Size Name is missing", {status: 400})
        }
        if(!value) { 
            return new NextResponse("Size Id is missing", {status: 400})
        } 
        if(!params.storeId) { 
            return new NextResponse("Store Id is missing", {status: 400})
        }  
        const store = await getDoc(doc(db, "stores", params.storeId)); 
        if(store.exists()){ 
            let storeData = store.data(); 
            if(storeData?.userId !== userId){ 
                return new NextResponse("Un-Authorized Access", {status: 500}); 
            }
        }   
        const sizeData = { 
            name, 
            value,
            createAt: serverTimestamp(),
        }; 
        const sizeRef = await addDoc( 
            collection(db, "stores", params.storeId, "sizes"), 
            sizeData
        ) 
        const id = sizeRef.id; 
        await updateDoc(doc(db,"stores", params.storeId, "sizes", id), { 
            ...sizeData, 
            id, 
            updatedAt: serverTimestamp()
        }) 
        return NextResponse.json({id, ...sizeData})

    } catch (error) {
        console.log(`SIZE_POST: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }


}


export const GET = async (req: Request, {params} : {params : {storeId: string}}) => { 
    try {
        if(!params.storeId) { 
            return new NextResponse("Store Id is missing", {status: 400})
        }  
        const sizesData = (await getDocs(
            collection(doc(db,"stores", params.storeId), "sizes")
        )).docs.map(doc => doc.data()) as Size[];
        return NextResponse.json(sizesData)
    } catch (error) {
        console.log(`SIZE_GET: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }


}