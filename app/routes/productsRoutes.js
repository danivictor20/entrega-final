const productsController = require('../controllers/productsController')
const statusResponse = require('../config/statusResponse')
const { Router } = require('express')
const productsRouter = Router()

productsRouter
    .get('/', async (req, res) => {
        try{
            const products = await productsController.allProducts()
            res.status(statusResponse.httpOk).json({products})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .get('/:id', async (req, res) => {
        try{
            const product = await productsController.productById(req.params.id)
            if (product) res.status(statusResponse.httpOk).json({product})
            else res.status(statusResponse.httpNotFound).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .post('/', async (req, res) => {
        try{
            const product = await productsController.saveProduct(req.body)
            res.status(statusResponse.httpCreated).json({product})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .put('/:id', async (req, res) => {
        try{
            const product = await productsController.updateProduct(req.body, req.params.id)
            if (product) res.status(statusResponse.httpOk).json({product})
            else res.status(statusResponse.httpNotFound).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

    .delete('/:id', async (req, res) => {
        try{
            const product = await productsController.deleteProduct(req.params.id)
            if (product) res.status(statusResponse.httpOk).json({product})
            else res.status(statusResponse.httpNotFound).json({error: 'Producto no encontrado'})
        } catch(error){
            res.status(statusResponse.httpErr).json({error: error.message})
        }
    })

module.exports = productsRouter