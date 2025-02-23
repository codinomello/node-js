const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connection = require('./script')

const app = express()

// middlewares
app.use(bodyParser.json()) // analisa o corpo das requisições como JSON
app.use(cors())            // permite requisições de outros domínios

// rota básica para testar
app.get('/clientes', async (req, res) => {
    const query = `SELECT * FROM clientes`
    try {
        const [clients] =  await connection.query(query)
        console.log(clients)
    } catch (err) {
        console.error(`Erro ao se conectar ao banco de dados: ${err}`)
    }
})

// inicia o servidor na porta 3000
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
