const mongoose = require('mongoose')



async function conectaBancoDeDados() {

    try {

        console.log('Conexão com o banco de dados iniciou') //iniciou o banco

        await mongoose.connect() //await(esperar) e fez a conexão com mongoDB

        console.log('Conexão com o banco de dados feita com sucesso!') //mensagem que a conexão foi um sucesso

    } catch(erro) {

        console.log(erro) //Informa a mensagem de erro que apresenta

    }

}



module.exports = conectaBancoDeDados