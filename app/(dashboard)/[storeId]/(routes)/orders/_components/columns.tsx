"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./cell-actions"
import CellImage from "./cell-image"
export type OrderColumns = { 
    id: string, 
    phone: string, 
    address: string, 
    products: string, 
    totalPrice: string, 
    images: string[], 
    isPaid: boolean, 
    createdAt: string, 
    order_status: string
}
export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({row}) => (
       <div className="grid grid-cols-2 gap-2">
          <CellImage data={row.original.images} /> 
       </div>
    )
   
  }, 
  {
    accessorKey: "phone",
    header: "Phone"
   
  }, 
  {
    accessorKey: "address",
    header: "Address"
   
  }, 
  {
    accessorKey: "totalPrice",
    header: "TotalPrice"
   
  }, 
  {
    accessorKey: "isPaid",
    header: "Payment"
   
  }, 
  {
    accessorKey: "isPaid",
    header: "Payment Status"
   
  }, 

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  { 
    id: "action", 
    cell: ({row}) => <CellAction data={row.original} />
  }




]
