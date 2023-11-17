const Sequelize = require("sequelize");

const sequelize = new Sequelize("123", "teste", "teste@gmail.com", "123",{
    host:'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conexão realizada com sucesso!")
}).catch(function(){
    console.log("Erro na conexão");
});

module.exports = sequelize;