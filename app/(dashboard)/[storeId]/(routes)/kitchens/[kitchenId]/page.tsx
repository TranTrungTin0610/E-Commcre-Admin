import { db } from "@/lib/firebase";
import {  Kitchen, Size } from "@/type-db";
import {  doc, getDoc } from "firebase/firestore";
import { KitchenForm } from "./_components/kitchen-form";
const KitchenPage = async({ 
    params, 
} : { 
    params: { 
        kitchenId: string, 
        storeId: string
    }; 
}) => {  
    const kitchen = (await getDoc(doc(db,"store", params.storeId, "kitchens",params.kitchenId))).data() as Kitchen 
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6"></div>
                <KitchenForm initialData = {kitchen} />
        </div>
     
    )
}
export default KitchenPage