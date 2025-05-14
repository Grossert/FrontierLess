const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('frontierless', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

//testar conexão
try{
    sequelize.authenticate()
    console.log('Conexão realizada com sucesso.')
}catch(err) {
    console.log('Erro ao tentar conexão com a base de dados.', 
        err)
}

module.exports = sequelize