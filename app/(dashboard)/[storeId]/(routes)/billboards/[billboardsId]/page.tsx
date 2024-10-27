import { db } from "@/lib/firebase";
import { Billboards } from "@/type-db";
import { doc, getDoc } from "firebase/firestore";
import { BillBoardForm } from "./_components/billboard-form";

const BillBoardPage = async({ 
    params, 
} : { 
    params: { 
        billboardsId: string, 
        storeId: string
    }; 
}) => {  
    const billboard = (await getDoc(doc(db,"store", params.storeId, "billboards",params.billboardsId))).data() as Billboards 
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6"></div>
                <BillBoardForm initialData = {billboard} />
        </div>
     
    )
}
export default BillBoardPage