const { promises: fs } = require('fs')
const moment = require('moment')
const productModel = require('./productsDAO')

class Carts{
    constructor(){
        this.route = './app/dbTemp/carts.txt'
    }

    async createDBTemp(){
        try{
            await fs.writeFile(this.route, '')
            return 1
        } catch(error){
            return 0
        }
    }

    async all(){
        let carts = []
        try{

            const dataCarts = await fs.readFile(this.route)
            if (dataCarts.toString() != ''){
                carts = JSON.parse(dataCarts)
            }
            return carts

        } catch(error){
            if (error.code == 'ENOENT'){
                const statusCreated = await this.createDBTemp()
                if (statusCreated) return carts
                else throw new Error('No se pudo crear el contenedor de Carritos')
            }
            throw new Error(error.message)
        }
    }

    async findById(id){
        try{
            id = parseInt(id)
            const carts = await this.all()
            return carts.find(prod => prod.id == id)
        } catch(error){
            throw new Error(error.message)
        }
    }

    async save(){
        try{
            const carts = await this.all()
            const id = carts.length
                ? carts[carts.length - 1].id + 1
                : 1
            const newCart = {
                id,
                timestamp: moment().format('L LTS'),
                productos: []
            }
            carts.push(newCart)
            await fs.writeFile(this.route, JSON.stringify(carts, null, 2))
            return newCart
        } catch(error){
            throw new Error(error.message)
        }
    }

    async saveInCart(idProduct, idCart){
        try{
            idProduct = parseInt(idProduct)
            idCart = parseInt(idCart)
            const cart = await this.findById(idCart)
            if (cart){
                const product = await productModel.findById(idProduct)
                if (product){
                    
                    cart.productos.push(product)
                    const carts = await this.all()
                    const indexList = carts.findIndex(cartIndex => cartIndex.id == cart.id)
                    carts[indexList] = cart
                    await fs.writeFile(this.route, JSON.stringify(carts, null, 2))
                    return cart

                }
                return undefined
            }
            return undefined

        } catch(error){
            throw new Error(error.message)
        }
    }

    async delete(id){
        try{
            id = parseInt(id)
            const cartExist = await this.findById(id)
            if (cartExist){
                const carts = await this.all()
                const listFilter = carts.filter(cart => cart.id != id)
                await fs.writeFile(this.route, JSON.stringify(listFilter, null, 2))
                return cartExist
            }
            return undefined

        } catch(error){
            throw new Error(error.message)
        }
    }

    async deleteProductInCart(idProduct, idCart){
        try{
            idProduct = parseInt(idProduct)
            idCart = parseInt(idCart)
            const cart = await this.findById(idCart)
            if (cart){
                cart.productos = cart.productos.filter(prod => prod.id != idProduct)
                const carts = await this.all()
                const indexList = carts.findIndex(cartIndex => cartIndex.id == cart.id)
                carts[indexList] = cart
                await fs.writeFile(this.route, JSON.stringify(carts, null, 2))
                return cart
            }
            return undefined

        } catch(error){
            throw new Error(error.message)
        }
    }

}

module.exports = new Carts()