"use client"

import { useStoreModal } from '@/hooks/use-store-modal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import axios from "axios"

import { Modal } from '@/components/modal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

/** 
 * 1. Đã sửa tại đây: Định nghĩa schema với .min(3) thay vì sử dụng một object với message 
 * vì bản thân zod sẽ tự xử lý message thông qua form errors của react-hook-form.
 */
const formSchema = z.object({
  name: z.string().min(3, "Store name should be minimum 3 characters") // Đã sửa
})

export const StoreModal = () => {
  const storeModal = useStoreModal()
  const [isLoading, setIsLoading] = useState(false)
  
  /** 
   * 2. Đã sửa tại đây: Không cần sử dụng `z.infer<typeof formSchema>` 
   * vì `react-hook-form` sẽ tự động infer thông qua zodResolver.
   */
  const form = useForm({
    resolver: zodResolver(formSchema), // Đã sửa: Để nguyên resolver và tự động xác định kiểu dữ liệu
    defaultValues: {
      name: "" 
    }
  })

  /** 
   * 3. Đã sửa tại đây: Loại bỏ kiểu infer trong hàm onSubmit, react-hook-form 
   * tự động xác định kiểu từ schema thông qua zodResolver.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => { // Đã thêm kiểu dữ liệu cho values
    try {
      setIsLoading(true) 
      const response = await axios.post("/api/stores", values);  
      toast.success("Store Created");  
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error("Something went wrong");
    }finally{ 
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title='Create a new store'
      description='Add a new store to manage the products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              
              {/** 4. Đã sửa tại đây: Đảm bảo sử dụng FormMessage với prop errors để hiển thị thông báo lỗi */}
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
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  disabled={isLoading}
                  type='button'
                  variant={"outline"}
                  size={"sm"}
                  onClick={storeModal.onClose} // Đã sửa: Đảm bảo nút hủy đóng modal
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type='submit' size={"sm"}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
