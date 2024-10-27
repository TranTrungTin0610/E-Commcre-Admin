import { db } from "@/lib/firebase";
import {  Kitchen } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const PATHCH = async (req: Request, {params} : {params : {storeId: string, kitchenId: string}}) => { 
    try {
        const {userId} = auth()     
        const body = await req.json() 
        if(!userId) { 
            return new NextResponse("Un-Authorize", {status: 400})
        }   
        const {name,value} = body; 
        if(!name) { 
            return new NextResponse("Kitchen Name is missing", {status: 400})
        }
        if(!value) { 
            return new NextResponse("Kitchen value is missing", {status: 400})
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
        const sizeRef  = await getDoc( 
            doc(db, "stores", params.storeId,"kitchens", params.kitchenId)
        )
        if(sizeRef.exists()){ 
            await updateDoc( 
                doc(db, "stores", params.storeId, "kitchens", params.kitchenId), { 
                    ...sizeRef.data(), 
                    name, 
                    value,
                    updatedAt: serverTimestamp()
                }
            )
        }else{ 
            return new NextResponse("Size Not Found", {status: 404})
        } 
        const kitchen = (
            await getDoc ( 
                doc(db, "stores", params.storeId, "kitchens", params.kitchenId)
            )
        ).data() as Kitchen[]

        return NextResponse.json(kitchen)

    } catch (error) {
        console.log(`KITCHEN_PATCH: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }


} 

export const DELETE = async (req: Request, {params} : {params : {storeId: string, kitchenId: string}}) => { 
    try {
        const {userId} = auth()         
        if(!userId) { 
            return new NextResponse("Un-Authorize", {status: 400})
        }   
        if(!params.storeId) { 
            return new NextResponse("Store Id is missing", {status: 400})
        }  
        if(!params.kitchenId) { 
            return new NextResponse("Kitchen Id is missing", {status: 400})
        }  
        const store = await getDoc(doc(db, "stores", params.storeId)); 
        if(store.exists()){ 
            let storeData = store.data(); 
            if(storeData?.userId !== userId){ 
                return new NextResponse("Un-Authorized Access", {status: 500}); 
            }
        }   
        const kitchenRef  =  doc(db, "stores", params.storeId,"kitchens", params.kitchenId) 
        await deleteDoc(kitchenRef)

        return NextResponse.json({msg: "Kitchen Deleted"})

    } catch (error) {
        console.log(`KITCHEN_DELETE: ${error}`) 
        return new NextResponse("Internal Server Error", {status: 500})
    }


}

