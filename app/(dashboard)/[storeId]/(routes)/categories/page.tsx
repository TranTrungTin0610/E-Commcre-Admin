import { collection, doc, getDocs } from "firebase/firestore";
import { CategoryClient } from "./_components/client";
import { db } from "@/lib/firebase";
import {  Category } from "@/type-db";
import { CategoryColumns } from "./_components/columns";
import { format } from "date-fns";

const CategoriesPage = async({params}:{params:{storeId : string}}) => {  
     const categoriesData = ( 
        await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
     ).docs.map((doc)=> doc.data()) as Category[] 
    const formattedCategories : CategoryColumns[] = categoriesData.map(item => ({ 
        id: item.id, 
        name: item.name, 
        billboardLabel: item.billboardLabel, 
        createdAt: item.createAt ? format(item.createAt.toDate(), "MMM do, yyy"): "",
    }))
    return <div className="flex-col">
        <div className="flex-1 spcae-y-4 p-8 pt-6">
            <CategoryClient data={formattedCategories}/>
        </div>
    </div> 
}
export default CategoriesPage;  