const { promises: fs } = require('fs')
const moment = require('moment')

class Products{
    constructor(){
        this.route = './app/dbTemp/products.txt'
    }

    formatFieldsProducts({fields = {}, product = {}}){
        return {
            id: product.id || 1,
            timestamp: moment().format('L LTS'),
            nombre: fields.nombre || product.nombre || 's/d',
            descripcion: fields.descripcion || product.descripcion || 's/d',
            codigo: fields.codigo || product.codigo || 's/d',
            foto: fields.foto || product.foto || 's/d',
            precio: fields.precio || product.precio || 0.0,
            stock: fields.stock || product.stock || 0,
        }
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
        let products = []
        try{

            const dataProducts = await fs.readFile(this.route)
            if (dataProducts.toString() != ''){
                products = JSON.parse(dataProducts)
            }
            return products

        } catch(error){
            if (error.code == 'ENOENT'){
                const statusCreated = await this.createDBTemp()
                if (statusCreated) return products
                else throw new Error('No se pudo crear el contenedor de Productos')
            }
            throw new Error(error.message)
        }
    }

    async findById(id){
        try{
            id = parseInt(id)
            const products = await this.all()
            return products.find(prod => prod.id == id)
        } catch(error){
            throw new Error(error.message)
        }
    }

    async save(product){
        try{
            const newProduct = this.formatFieldsProducts({fields: product})
            const products = await this.all()
            const id = products.length
                ? products[products.length - 1].id + 1
                : 1
            newProduct.id = id
            products.push(newProduct)
            await fs.writeFile(this.route, JSON.stringify(products, null, 2))
            return newProduct
        } catch(error){
            throw new Error(error.message)
        }
    }

    async update(product, id){
        try{
            id = parseInt(id)
            const productExist = await this.findById(id)
            if (productExist){
                const products = await this.all()
                const indexList = products.findIndex(prod => prod.id == id)
                
                products[indexList] = this.formatFieldsProducts({
                    fields: product,
                    product: productExist
                })
                await fs.writeFile(this.route, JSON.stringify(products, null, 2))
                return products[indexList]
                
            }
            return undefined

        } catch(error){
            throw new Error(error.message)
        }
    }

    async delete(id){
        try{
            id = parseInt(id)
            const productExist = await this.findById(id)
            if (productExist){
                const products = await this.all()
                const listFilter = products.filter(prod => prod.id != id)
                await fs.writeFile(this.route, JSON.stringify(listFilter, null, 2))
                return productExist
            }
            return undefined

        } catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = new Products()