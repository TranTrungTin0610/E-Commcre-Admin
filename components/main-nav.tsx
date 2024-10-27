"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export const MainNav = ({className, ...props}:React.HtmlHTMLAttributes<HTMLElement>) => {
    const pathname = usePathname() 
    const params = useParams();  
    const routes = [ 
        { 
            href : `/${params.storeId}`, 
            label : "Overview", 
            active : pathname === `/${params.storeId}`,
        }, 
        { 
            href : `/${params.storeId}/billboards`, 
            label : "Billboards", 
            active : pathname === `/${params.storeId}/billboards`,
        }, 
        { 
            href : `/${params.storeId}/categories`, 
            label : "Categories", 
            active : pathname === `/${params.storeId}/categories`,
        },
        { 
            href : `/${params.storeId}/sizes`, 
            label : "Sizes", 
            active : pathname === `/${params.storeId}/sizes`,
        },
        { 
            href : `/${params.storeId}/kitchens`, 
            label : "Kitchens", 
            active : pathname === `/${params.storeId}/kitchens`,
        },
        { 
            href : `/${params.storeId}/cuisines`, 
            label : "Cuisines", 
            active : pathname === `/${params.storeId}/cuisines`,
        },
        { 
            href : `/${params.storeId}/products`, 
            label : "Product", 
            active : pathname === `/${params.storeId}/products`,
        },
        { 
            href : `/${params.storeId}/orders`, 
            label : "Orders", 
            active : pathname === `/${params.storeId}/orders`,
        },
        { 
            href : `/${params.storeId}/settings`, 
            label : "Setting", 
            active : pathname === `/${params.storeId}/settings`,
        } 

    ]
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 pl-6")}>
            {routes.map((route) => (
                <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", 
                    route.active  
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}>
                {route.label}      
                </Link>
            ))}
        </nav>
  )
}