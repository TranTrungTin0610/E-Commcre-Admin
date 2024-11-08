"use client"
import { Modal } from "@/components/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react"
//1:09/40
 
const SetupPage = () => { 
  const onOpen = useStoreModal((state) => state.onOpen) 
  const isOpen = useStoreModal((state) => state.isOpen)  
  useEffect(()=> { 
    if(!isOpen) { 
      onOpen()
    }
  }, [isOpen, onOpen])
  return null
}

export default SetupPage
