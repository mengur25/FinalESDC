export interface PickupAddress{
    name: string;
    mobile:string;
    pincode:string;
    address:string;
    locality:string;
    city:string;
    ward:string;
}
export interface BankDetails{
    accountNumber: string;
    ifsCode:string;
    accountHolderName:string;
}

export interface BusinessDetails{
    bussinessName:string;
}

export interface Seller{
    id?:number;
    mobile:string;
    otp:string;
    gstin:string;
    pickupAddress: PickupAddress;
    bankDetails: BankDetails;
    sellerName:string;
    email:string;
    businessDetails: BusinessDetails;
    password: string;
    accountStatus?:string;
}

export interface SellerReport{
    id?:number;
    seller:Seller;
    totalEarnings:number;
    totalSales: number;
    totalTax: number;
    netEarnings: number;
    totalOrdera: number;
    canceledOrders: number;
    totalTransactions: number;
}