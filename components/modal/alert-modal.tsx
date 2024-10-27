"use client "
import { useEffect, useState } from "react"
import { Modal } from "@/components/modal"
import { Button } from "@/components/ui/button"

 
interface AlertModalProps{ 
    isOpen: boolean, 
    onClose : () => void, 
    onConfirm: () => void, 
    loading: boolean
}
export const AlertModal = ({isOpen, onClose, onConfirm, loading}: AlertModalProps) => { 
    const [isMounted, setIdMounted] = useState(false) 
    useEffect(()=> { 
        setIdMounted(true) 
    }, [])
    if(!isMounted){ 
        return null
    }
    return ( 
        <Modal title="Are you sure ? " description="This action cannot be undone!..." isOpen={isOpen} onClose={onClose}> 
             <div className="pt-6 space-x-2 flex items-center justify-end"> 
                <Button disabled={loading} variant={"outline"} onClick={onClose}>Cancel</Button> 
                <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>Comfirm</Button>
             </div>
        </Modal>
    )
}