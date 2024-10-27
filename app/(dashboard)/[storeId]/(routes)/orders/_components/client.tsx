"use client" 
//9:33:44
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { OrderColumns, columns } from "./columns";
import ApiList from "@/components/api-list";
interface OrdersClientProps{ 
  data: OrderColumns[] 
}
export const OrdersClient = ({data}:OrdersClientProps) => {  
  const params = useParams(); 
  const router = useRouter(); 
  return (
    <>
      <div className="flex items-center justify-between"> 
          <Heading title={`Orders (${data.length})`} description="Manave orders for your store"/> 
      </div> 
      
      <Separator/> 
      <DataTable searchKey="name" columns={columns} data={data} /> 
    </>
  )
}
