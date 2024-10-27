import { collection, doc, getDocs } from "firebase/firestore";
import { OrdersClient } from "./_components/client";
import { db } from "@/lib/firebase";
import {   Order } from "@/type-db";
import { OrderColumns } from "./_components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async({params}:{params:{storeId : string}}) => {  
     const ordersData = ( 
        await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
     ).docs.map((doc)=> doc.data()) as Order[]
    const formattedOrders :OrderColumns[] = ordersData.map(item => ({ 
        id: item.id,  
        isPaid: item.isPaid, 
        phone: item.phone,  
        address: item.address,  
        products: item.orderItems.map(item => item.name).join(", "), 
        order_status: item.order_status,   
        totalPrice: formatter.format(
            item.orderItems.reduce((total, item)=> { 
                if(item && item.qty !== undefined){ 
                    return total + Number(item.price * item.qty)
                }
                return total
            }, 0)
        ),  
        images: item.orderItems.map(item => item.images[0].url),
        createdAt: item.createdAt ? format(item.createdAt.toDate(), "MMM do, yyy"): "",
    }))
    return <div className="flex-col">
        <div className="flex-1 spcae-y-4 p-8 pt-6">
            <OrdersClient data={formattedOrders}/>
        </div>
    </div> 
}
export default OrdersPage;  