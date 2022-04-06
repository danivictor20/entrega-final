const cartsController = require('../controllers/cartsController')
const statusResponse = require('../config/statusResponse')
const { Router } = require('express')
const cartsRouter = Router()

cartsRouter
    .get('/', async (req, res) => {
        try{
            const carts = await cartsController.allCarts()
            res.status(statusResponse.httpOk).json({carts})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .get('/:id', async (req, res) => {
        try{
            const cart = await cartsController.cartById(req.params.id)
            if (cart) res.status(statusResponse.httpOk).json({cart})
            else res.status(statusResponse.httpNotFound).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .get('/:id/productos', async (req, res) => {
        try{
            const cart = await cartsController.cartById(req.params.id)
            if (cart) res.status(statusResponse.httpOk).json({
                products: cart.productos
            })
            else res.status(statusResponse.httpNotFound).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })
    
    .post('/', async (req, res) => {
        try{
            const cart = await cartsController.saveCart()
            res.status(statusResponse.httpCreated).json({cart})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .post('/:id/productos', async (req, res) => {
        try{
            const cart = await cartsController.saveProductInCart(req.body.id_producto, req.params.id)
            if (cart) res.status(statusResponse.httpCreated).json({cart})
            else res.status(statusResponse.httpNotFound).json({error: 'Algún recurso no fue encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .delete('/:id', async (req, res) => {
        try{
            const cart = await cartsController.deleteCart(req.params.id)
            if (cart) res.status(statusResponse.httpOk).json({cart})
            else res.status(statusResponse.httpNotFound).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .delete('/:id/productos/:idProd', async (req, res) => {
        try{
            const cart = await cartsController.deleteProductInCart(req.params.idProd, req.params.id)
            if (cart) res.status(statusResponse.httpOk).json({cart})
            else res.status(statusResponse.httpNotFound).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })


module.exports = cartsRouter