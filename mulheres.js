const express = require("express")   //aqui estou iniciando o express
const router = express.Router()  //aqui estou configurando a primeira parte da rota
const cors = require('cors') // inicia o pacote cors para integração frontEnd

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')

const app = express()    //aqui estou iniciando o app

app.use(cors())
app.use(express.json()) //tratando as requisições
const porta = 3333    //criando a porta 3333

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)

    }catch(erro){
        console.log(erro)
    }
}

//POST 
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio,
      citacao: request.body.citacao
    })
    
    try {
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
    } catch(erro) {
      console.log(erro)
    }
}

//PATCH 
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
          mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
          mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
          mulherEncontrada.imagem = request.body.imagem
        }

        if(request.body.citacao) {
          mulherEncontrada = request.body.citacao
        }  

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()    

        response.json(mulherAtualizadaNoBancoDeDados)

    } catch(erro) {
        console.log(erro)
    } 
}

//DELETE
async function deletaMulher(request, response) {
  try {
      await Mulher.findByIdAndDelete(request.params.id)
      response.json({ mensagem: 'Mulher Deletada com sucesso'})
  } catch(erro) {
    console.log(erro)
  }

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