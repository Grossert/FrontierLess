const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('frontierless4', 'frontierless_adm', 'Es7sFH@6Ug6!5Ww', {
    host: 'db4free.net',
    dialect: 'mysql'
})

//testar conexão
try {
    sequelize.authenticate()
    console.log('Conexão realizada com sucesso.')
} catch (err) {
    console.log('Erro ao tentar conexão com a base de dados.',
        err)
}

module.exports = sequelize