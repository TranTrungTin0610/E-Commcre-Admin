import { db } from "@/lib/firebase";
import {  Cuisine } from "@/type-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CuisineForm } from "./_components/cuisine-form";

const BillBoardPage = async({ 
    params, 
} : { 
    params: { 
        cuisineId: string, 
        storeId: string
    }; 
}) => {  
    const cuisine = (await getDoc(doc(db,"store", params.storeId, "cuisines",params.cuisineId))).data() as Cuisine 
    const billboardData = ( 
        await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
     ).docs.map((doc)=> doc.data()) as Cuisine[]  
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6"></div>
                <CuisineForm initialData = {cuisine} />
        </div>
     
    )
}
export default BillBoardPage