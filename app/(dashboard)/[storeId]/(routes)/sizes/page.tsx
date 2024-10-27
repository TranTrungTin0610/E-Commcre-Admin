import { collection, doc, getDocs } from "firebase/firestore";
import { SizesClient } from "./_components/client";
import { db } from "@/lib/firebase";
import {   Size } from "@/type-db";
import { SizeColumns } from "./_components/columns";
import { format } from "date-fns";

const SizesPage = async({params}:{params:{storeId : string}}) => {  
     const sizesData = ( 
        await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
     ).docs.map((doc)=> doc.data()) as Size[] 
    const formattedSizes :SizeColumns[] = sizesData.map(item => ({ 
        id: item.id, 
        name: item.name, 
        value: item.value, 
        createdAt: item.createAt ? format(item.createAt.toDate(), "MMM do, yyy"): "",
    }))
    return <div className="flex-col">
        <div className="flex-1 spcae-y-4 p-8 pt-6">
            <SizesClient data={formattedSizes}/>
        </div>
    </div> 
}
export default SizesPage;  