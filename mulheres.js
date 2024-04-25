const express = require("express")   //aqui estou iniciando o express
const router = express.Router()  //aqui estou configurando a primeira parte da rota
const {v4: uuidv4} = require('uuid') //solicitando a biblioteca NPM uuid

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')
const app = express()    //aqui estou iniciando o app
app.use(express.json()) //tratando as requisições
const porta = 3333    //criando a porta 3333

//GET
function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro){
        console.log(erro)
    }
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

//PATCH 
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
      if (mulher.id === request.params.id) {
        return mulher
      }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }
    
    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response) {
  function todasMenosEla(mulher) {
    if(mulher.id != request.params.id) {
      return mulher
    }
  }

  const mulheresQueFicam = mulheres.filter(todasMenosEla)

  response.json(mulheresQueFicam)
}


//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}


 
app.use(router.get('/mulheres', mostraMulheres)) //configurado rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurado rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurado a rota PATCH/mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurado a rota DELETE/mulheres

app.listen(porta, mostraPorta)  //Servidor ouvindo a porta