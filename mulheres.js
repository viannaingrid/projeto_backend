const express = require("express")   //aqui estou iniciando o express
const router = express.Router()  //aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid') //solicitando a biblioteca NPM uuid

const app = express()    //aqui estou iniciando o app
const porta = 3333    //criando a porta 3333

//Criado a lista inicial de mulheres 
const mulheres = [
    {
        id: '1',

        nome: 'Simara Conceição',
     
        imagem: 'https://bit.ly/3LJIyOF',
     
        minibio: 'Desenvolvedora e instrutora',
     
      },
     
      {
        id: '2',

        nome: 'Iana Chan',
     
        imagem: 'https://bit.ly/3JCXBqP',
     
        minibio: 'CEO & Founder da PrograMaria',
     
      },
     
      {
        id: '3',
     
        nome: 'Luana Pimentel',
     
        imagem: 'https://bit.ly/3FKpFaz',
     
        minibio: 'Senior Staff Software Engineer',
     
      }
]

//GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//POST 
function criaMulher(request, response) {
    const novaMulher = {
      id: uuidv4(),
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
    
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}


 
app.use(router.get('/mulheres', mostraMulheres)) //configurado rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurado rota POST /mulheres
app.listen(porta, mostraPorta)  //Servidor ouvindo a porta