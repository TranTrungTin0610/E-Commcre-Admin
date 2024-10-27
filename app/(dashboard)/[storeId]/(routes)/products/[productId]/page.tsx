import { db } from "@/lib/firebase";
import {  Category, Cuisine, Kitchen, Product, Size} from "@/type-db";
import {  collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductForm } from "./_components/product-form";

const ProductPage = async({ 
    params, 
} : { 
    params: { 
        productId: string, 
        storeId: string
    }; 
}) => {  
    const product = (await getDoc(doc(db,"store", params.storeId, "products",params.productId))).data() as Product  
    const categoriesData = (await getDocs(collection(doc(db, "stores", params.storeId),
     "categories"))).docs.map(doc => doc.data()) as Category[] 

     const sizesData = (await getDocs(collection(doc(db, "stores", params.storeId),
     "sizes"))).docs.map(doc => doc.data()) as Size[]

     const kitchensData = (await getDocs(collection(doc(db, "stores", params.storeId),
     "kitchens"))).docs.map(doc => doc.data()) as Kitchen[] 

     const cuisinesData = (await getDocs(collection(doc(db, "stores", params.storeId),
     "cuisines"))).docs.map(doc => doc.data()) as Cuisine[]

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6"></div>
                <ProductForm initialData = {product} categories={categoriesData} kitchens={kitchensData} sizes={sizesData} cuisines={cuisinesData}/>
        </div>
     
    )
}
export default ProductPage