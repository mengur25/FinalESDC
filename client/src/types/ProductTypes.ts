import { Seller } from "./SellerTypes";

export interface Product{
    id?: number;
    title:string;
    description:string;
    mrpPrice:number;
    sellingPrice:number;
    discountPercent:number;
    quantity:number;
    color:string;
    sizes:string;
    images:string[];
    numRatings?:number;
    category?:Category;
    seller?:Seller;
    createAt?:Date;
}


export interface Category{
    id?: number;
    name:string;
    categoryId:string;
    parentCategory?:Category;
    level:number;
}

