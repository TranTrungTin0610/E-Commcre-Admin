import { collection, doc, getDocs } from "firebase/firestore";
import { KitchenClient } from "./_components/client";
import { db } from "@/lib/firebase";
import {   Kitchen } from "@/type-db";
import { KitchenColumns } from "./_components/columns";
import { format } from "date-fns";
const KitchenPage = async({params}:{params:{storeId : string}}) => {  
     const kitchenData = ( 
        await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
     ).docs.map((doc)=> doc.data()) as Kitchen[] 
    const formattedKitchens :KitchenColumns[] = kitchenData.map(item => ({ 
        id: item.id, 
        name: item.name, 
        value: item.value, 
        createdAt: item.createAt ? format(item.createAt.toDate(), "MMM do, yyy"): "",
    }))
    return <div className="flex-col">
        <div className="flex-1 spcae-y-4 p-8 pt-6">
            <KitchenClient data={formattedKitchens}/>
        </div>
    </div> 
}
export default KitchenPage;  