module.exports.checkAuth = function (req, res, next) {

    const userId = req.session.userid

    if(!userId) {
        return res.status(403).send('Acesso negado. Você precisa estar autenticado para acessar esta página.');
    }

    next()
}