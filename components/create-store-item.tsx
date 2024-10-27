"use client"

import { PlusCircle } from "lucide-react"

interface CreateNewStoreItemProp { 
    onClick: () => void
}
export const CreateNewStoreItem = ({onClick}: CreateNewStoreItemProp) => {
  return (
    <div onClick={onClick} className="flex items-center bg-gray-50 px-2 py-1 cursor-pointer text-muted-foreground hover:text-primary">
    <PlusCircle className="mr-2 h-5 w-5"/>
        Create Store

    </div>
  )
}
 