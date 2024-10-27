import { Timestamp } from "firebase/firestore";
//6:34:58
//Định nghĩa kiểu dữ liệu cho Firebase
export interface Store { 
    id: string, 
    name: string, 
    userId : string, 
    createAt?: Timestamp, 
    updatedAt?: Timestamp
}
export interface Billboards { 
    id: string, 
    label: string, 
    imageUrl: string, 
    createAt?: Timestamp, 
    updatedAt?: Timestamp
}
export interface Category{ 
    id: string,  
    billboardsId: string, 
    billboardLabel: string,  
    name: string 
    createAt?: Timestamp, 
    updatedAt?: Timestamp
}
export interface Size{ 
    id: string, 
    name: string, 
    value: string,
    createAt?: Timestamp, 
    updatedAt?: Timestamp
}
export interface Kitchen{ 
    id: string, 
    name: string, 
    value: string,
    createAt?: Timestamp, 
    updatedAt?: Timestamp
} 
export interface Cuisine{ 
    id: string, 
    name: string, 
    value: string,
    createAt?: Timestamp, 
    updatedAt?: Timestamp
}  
export interface Product{ 
    id: string, 
    name: string, 
    price: number, 
    qty?: number, 
    images: {url: string}[], 
    isFeatured: boolean, 
    isArchived: boolean, 
    category: string, 
    size: string, 
    kitchen: string, 
    cuisine: string, 
    createdAt?: Timestamp, 
    updatedAt?: Timestamp
}
export interface Order{ 
    id: string, 
    isPaid: boolean, 
    phone: string, 
    orderItems: Product[], 
    address: string, 
    order_status: string, 
    createdAt?: Timestamp, 
    updatedAt?: Timestamp
}
 