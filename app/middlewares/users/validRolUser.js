const isAdmin = (rolAdmin) => {
    return (req, res, next) => {
        if (rolAdmin) next()
        else res.send({ error : -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    }
}

module.exports = isAdmin