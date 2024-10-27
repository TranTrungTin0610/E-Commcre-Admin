"use client"
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { CategoryColumns, columns } from "./columns";
import ApiList from "@/components/api-list";
interface CategoryClientProps{ 
  data: CategoryColumns[] 
}
 
export const CategoryClient = ({data}:CategoryClientProps) => {  
  const params = useParams(); 
  const router = useRouter(); 
  return (
    <>
      <div className="flex items-center justify-between"> 
          <Heading title={`Categories (${data.length})`} description="Manave categories for your store"/> 
          <Button onClick={()=> router.push(`/${params.storeId}/categories/create`)}>
              <Plus className="h-4 w-4 mr-2"/> 
              Add New
          </Button>
      </div> 
      <Separator/> 
      <DataTable searchKey="name" columns={columns} data={data} /> 
      <Heading title="API" description="API calls for categories"/>
      <Separator/>  
      <ApiList entityName="categories" entityNameId="categoryId"/>
    </>
  )
}
