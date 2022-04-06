const productsRouter = require('./routes/productsRoutes')
const cartsRouter = require('./routes/cartsRoutes')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartsRouter)

app.use(function(req, res) {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
});

module.exports = app