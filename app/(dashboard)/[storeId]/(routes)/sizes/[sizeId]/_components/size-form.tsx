"use client" 
import { Heading } from "@/components/heading"
import { AlertModal } from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {  Size } from "@/type-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
interface SizeFormProps{ 
    initialData: Size, 
}
 
const formSchema = z.object({
  name: z.string().min(1), 
  value: z.string().min(1)
})

export const SizeForm = ({initialData }:SizeFormProps) => { 
  const form = useForm({
    resolver: zodResolver(formSchema), // Đã sửa: Để nguyên resolver và tự động xác định kiểu dữ liệu
    defaultValues: initialData
  }) 
  const [isLoading, setIsLoading] = useState(false)  
  const [open, setOpen] = useState(false)
  const params = useParams() 
  const router = useRouter()   
  const title = initialData ? "Edit size" : "Create size" 
  const description = initialData ? "Edit a size" : "Add a new size" 
  const toastMessage = initialData ? "size Updated" : "size Created" 
  const action = initialData ? "Save Changes" : "Create size" 
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try { 
      setIsLoading(true)  
      console.log(data)
      if (initialData) {   
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/sizes`,data);
      }  
      toast.success(toastMessage);  
      router.push(`/${params.storeId}/sizes`)
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

        await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`,); 

      toast.success("Size Removed");  
      router.refresh(); 
      router.push(`/${params.storeId}/sizes`)
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
                            placeholder='Your size name...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage /> {/** Đã sửa: Đảm bảo thông báo lỗi hiển thị */}
                      </FormItem>
                    )}
              /> 
              <FormField
                    control={form.control}
                    name='value'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder='Your value value...'
                            {...field}
                          />
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
