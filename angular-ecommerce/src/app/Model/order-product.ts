import { CartProduct } from "./cart-product"

export class OrderProduct{
    id:number
    name:String
    price:number
    quantity:number
    OrderTrackingNumber:String
    imageURL:String

    constructor(cartProduct:CartProduct)
    {
        this.imageURL=cartProduct.imageURL
        this.name=cartProduct.name
        this.price=cartProduct.price
        this.quantity=cartProduct.quantity
    }
    
}