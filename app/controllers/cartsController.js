const cartModel = require('../daos/cartsDAO')
class CartsController{

    async allCarts(){
        try{
            const carts = await cartModel.all()
            return carts
        } catch(error){
            throw new Error(error.message)
        }
    }


    async cartById(id){
        try{
            const cart = await cartModel.findById(id)
            if (!cart) return null
            return cart
        } catch(error){
            throw new Error(error.message)
        }
    }


    async saveCart(){
        try{
            const cart = await cartModel.save()
            return cart
        } catch(error){
            throw new Error(error.message)
        }
    }


    async saveProductInCart(idProduct, idCart){
        try{
            const cart = await cartModel.saveInCart(idProduct, idCart)
            return cart
        } catch(error){
            throw new Error(error.message)
        }
    }


    async deleteCart(id){
        try{
            const cartDeleted = await cartModel.delete(id)
            if (!cartDeleted) return null
            return cartDeleted
        } catch(error){
            throw new Error(error.message)
        }
    }


    async deleteProductInCart(idProduct, idCart){
        try{
            const cartDeleted = await cartModel.deleteProductInCart(idProduct, idCart)
            if (!cartDeleted) return null
            return cartDeleted
        } catch(error){
            throw new Error(error.message)
        }
    }

}

module.exports = new CartsController()