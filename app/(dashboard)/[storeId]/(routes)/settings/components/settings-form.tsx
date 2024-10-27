"use client"
import { ApiAlert } from "@/components/api-alert"
import { Heading } from "@/components/heading"
import { AlertModal } from "@/components/modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"
import { Store } from "@/type-db"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
//3:43:00
interface SettingFormProps{ 
    initialData: Store
}
 
const formSchema = z.object({
  name: z.string().min(3, "Store name should be minimum 3 characters") // Đã sửa
})

export const SettingForm = ({initialData}:SettingFormProps) => { 
  const form = useForm({
    resolver: zodResolver(formSchema), // Đã sửa: Để nguyên resolver và tự động xác định kiểu dữ liệu
    defaultValues: initialData
  }) 
  const [isLoading, setIsLoading] = useState(false)  
  const [open, setOpen] = useState(false)
  const params = useParams() 
  const router = useRouter()  
  const origin = useOrigin()
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true) 
      const response = await axios.patch(`/api/stores/${params.storeId}`, data);  
      toast.success("Store Updated");  
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }finally{ 
      setIsLoading(false)
    }
  }
  const onDelete = async () => { 
    try {
      setIsLoading(true) 
      const response = await axios.delete(`/api/stores/${params.storeId}`);  
      toast.success("Store Removed");  
      router.refresh(); 
      router.push('/')
    } catch (error) {
      toast.error("Something went wrong");
    }finally{ 
      setIsLoading(false) 
      setOpen(false)
    }
  }
  return ( 
    <> 
    <AlertModal 
       isOpen={open} 
       onClose={()=> setOpen(false)} 
       onConfirm={onDelete} 
       loading={isLoading}
    />
      <div className="flex items-center justify-center">
        <Heading title="Settings" description="Manage Store Preferances"/> 
        <Button variant={"destructive"} size={"icon"} onClick={()=> setOpen(true)}> 
          <Trash className="h-4 w-4"/>
        </Button>
      </div> 
      <Separator/> 
      <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
              
              {/** 4. Đã sửa tại đây: Đảm bảo sử dụng FormMessage với prop errors để hiển thị thông báo lỗi */}
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
                            placeholder='Your store name...'
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

          <Separator/> 
          <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
    </>
  )
}
