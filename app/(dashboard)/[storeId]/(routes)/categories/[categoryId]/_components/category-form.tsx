"use client"
import { Heading } from "@/components/heading"
import { ImageUpload } from "@/components/image-upload"
import { AlertModal } from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { storage } from "@/lib/firebase"
import {  Billboards, Category } from "@/type-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { deleteObject, ref } from "firebase/storage"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
interface CategoryFormProps{ 
    initialData: Category, 
    billboards: Billboards[]
}
 
const formSchema = z.object({
  name: z.string().min(1), 
  billboardsId: z.string().min(1)
})

export const CategoryForm = ({initialData,billboards }:CategoryFormProps) => { 
  const form = useForm({
    resolver: zodResolver(formSchema), // Đã sửa: Để nguyên resolver và tự động xác định kiểu dữ liệu
    defaultValues: initialData
  }) 
  const [isLoading, setIsLoading] = useState(false)  
  const [open, setOpen] = useState(false)
  const params = useParams() 
  const router = useRouter()   
  const title = initialData ? "Edit Category" : "Create Category" 
  const description = initialData ? "Edit a category" : "Add a new category" 
  const toastMessage = initialData ? "Category Updated" : "Category Created" 
  const action = initialData ? "Save Changes" : "Create category" 
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try { 
      const {billboardsId: formBillId} = form.getValues() 
      const matchingBillboard = billboards.find((item)=> item.id === formBillId)
      setIsLoading(true) 
      if (initialData) {   
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, {...data, billboardLabel:matchingBillboard?.label});
      } else {
        await axios.post(`/api/${params.storeId}/categories`, {...data, billboardLabel:matchingBillboard?.label});
      }  
      toast.success(toastMessage);  
      router.push(`/${params.storeId}/categories`)
    } catch (error) {
      toast.error("Something went wrong");
    }finally{  
      router.refresh(); 
      setIsLoading(false)
    }
  }
  const onDelete = async () => { 
    try {
      setIsLoading(true) 

        await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`,); 

      toast.success("Category Removed");  
      router.refresh(); 
      router.push(`/${params.storeId}/categories`)
    } catch (error) {
      toast.error("Something went wrong");
    }finally{ 
      setIsLoading(false) 
      setOpen(false)
    }
  }
  return ( 
    <div className="ml-5"> 
    <AlertModal 
       isOpen={open} 
       onClose={()=> setOpen(false)} 
       onConfirm={onDelete} 
       loading={isLoading}
    /> 
      <div className="flex items-center justify-center">
        <Heading title={title} description={description}/> 
       {initialData && (
         <Button disabled={isLoading} variant={"destructive"} size={"icon"} onClick={()=> setOpen(true)}> 
         <Trash className="h-4 w-4"/>
       </Button>
       )}
      </div> 
      <Separator/>  
      <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
              

             <div className="grid grid-cols-3 gap-8 ">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder='Your category name...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage /> {/** Đã sửa: Đảm bảo thông báo lỗi hiển thị */}
                      </FormItem>
                    )}
              /> 
              <FormField
                    control={form.control}
                    name='billboardsId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billboard</FormLabel>
                        <FormControl>
                          <Select disabled={isLoading}
                           onValueChange={field.onChange}
                           value={field.value}
                           defaultValue={field.value} >
                            <FormControl>
                                <SelectTrigger>
                                  <SelectValue defaultValue={field.value} 
                                  placeholder="Select a billboard" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {billboards.map(billboard => (
                                <SelectItem key={billboard.id} value={billboard.id}>
                                  {billboard.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage /> {/** Đã sửa: Đảm bảo thông báo lỗi hiển thị */}
                      </FormItem>
                    )}
              />
             </div>
                <Button disabled={isLoading} type='submit' size={"sm"}>
                  Save changes
                </Button>
            </form>
          </Form>  
    </div>
  )
}
