import { db } from "@/lib/firebase";
import {  Size } from "@/type-db";
import {  doc, getDoc } from "firebase/firestore";
import { SizeForm } from "./_components/size-form";

const SizePage = async({ 
    params, 
} : { 
    params: { 
        sizeId: string, 
        storeId: string
    }; 
}) => {  
    const size = (await getDoc(doc(db,"store", params.storeId, "sizes",params.sizeId))).data() as Size 
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6"></div>
                <SizeForm initialData = {size} />
        </div>
     
    )
}
export default SizePage