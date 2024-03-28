const express = require("express") 
const router = express.Router()    

const app = express()    
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Ingrid Vianna',
        imagem: 'https://drive.google.com/file/d/1Q8B9XvWc5sHs2lLSep2Cdqwi5SR1EKgb/view?usp=drive_link',
        minibio: 'Estudante de desenvolvimento Fullstack'
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)