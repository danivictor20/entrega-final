const productModel = require('../models/productsModel')
class ProductsController{

    async allProducts(){
        try{
            const products = await productModel.all()
            return products
        } catch(error){
            throw new Error(error.message)
        }
    }


    async productById(id){
        try{
            const product = await productModel.findById(id)
            if (!product) return null
            return product
        } catch(error){
            throw new Error(error.message)
        }
    }


    async saveProduct(fields){
        try{
            const product = await productModel.save(fields)
            return product
        } catch(error){
            throw new Error(error.message)
        }
    }


    async updateProduct(fields, id){
        try{
            const productUpdated = await productModel.update(fields, id)
            if (!productUpdated) return null
            return productUpdated
        } catch(error){
            throw new Error(error.message)
        }
    }


    async deleteProduct(id){
        try{
            const productDeleted = await productModel.delete(id)
            if (!productDeleted) return null
            return productDeleted
        } catch(error){
            throw new Error(error.message)
        }
    }

}

module.exports = new ProductsController()