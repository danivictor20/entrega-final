require('dotenv').config()
const app = require('./app/app')
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, console.log(`http://localhost:${PORT}`))
server.on('error', err => console.log('Servicio fallido', err))