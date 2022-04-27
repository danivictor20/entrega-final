const productsController = require('../controllers/productsController')
const { Router } = require('express')
const statusResponse = require('http-status');
const productsRouter = Router()

const isAdmin = require('../middlewares/users/validRolUser')
const rolAdmin = true

productsRouter
    .get('/', async (req, res) => {
        try{
            const products = await productsController.allProducts()
            res.status(statusResponse.OK).json({products})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .get('/:id', async (req, res) => {
        try{
            const product = await productsController.productById(req.params.id)
            if (product) res.status(statusResponse.OK).json({product})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .post('/', isAdmin(rolAdmin), async (req, res) => {
        try{
            const product = await productsController.saveProduct(req.body)
            res.status(statusResponse.CREATED).json({product})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .put('/:id', isAdmin(rolAdmin), async (req, res) => {
        try{
            const product = await productsController.updateProduct(req.body, req.params.id)
            if (product) res.status(statusResponse.OK).json({product})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

    .delete('/:id', isAdmin(rolAdmin), async (req, res) => {
        try{
            const product = await productsController.deleteProduct(req.params.id)
            if (product) res.status(statusResponse.OK).json({product})
            else res.status(statusResponse.NOT_FOUND).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    })

module.exports = productsRouter