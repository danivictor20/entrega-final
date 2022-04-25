const cartsController = require('../controllers/cartsController')
const { Router } = require('express')
const statusResponse = require('http-status');
const cartsRouter = Router()

const isAdmin = require('../middlewares/users/validRolUser')
const rolAdmin = false

cartsRouter
    .get('/', isAdmin(rolAdmin), async (req, res) => {
        try{
            const carts = await cartsController.allCarts()
            res.status(statusResponse.OK).json({carts})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .get('/:id', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.cartById(req.params.id)
            if (cart) res.status(statusResponse.OK).json({cart})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .get('/:id/productos', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.cartById(req.params.id)
            if (cart) res.status(statusResponse.OK).json({
                products: cart.productos
            })
            else res.status(statusResponse.NOT_FOUND).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })
    
    .post('/', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.saveCart()
            res.status(statusResponse.CREATED).json({cart})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .post('/:id/productos', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.saveProductInCart(req.body.id_producto, req.params.id)
            if (cart) res.status(statusResponse.CREATED).json({cart})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Algún recurso no fue encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .delete('/:id', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.deleteCart(req.params.id)
            if (cart) res.status(statusResponse.OK).json({cart})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .delete('/:id/productos/:idProd', isAdmin(rolAdmin), async (req, res) => {
        try{
            const cart = await cartsController.deleteProductInCart(req.params.idProd, req.params.id)
            if (cart) res.status(statusResponse.OK).json({cart})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Carrito no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })


module.exports = cartsRouter