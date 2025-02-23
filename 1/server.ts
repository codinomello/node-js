const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./script')

const app = express()

// middlewares
app.use(bodyParser.json()) // analisa o corpo das requisições como JSON
app.use(cors())            // permite requisições de outros domínios

// rota de consulta GET
app.get('/usuários', async (req, res) => {
    const query = `SELECT * FROM usuarios`
    try {
        const [users] =  await connection.query(query)
        res.status(200).json({users})
        // console.log(users)
    } catch (err) {
        console.error(`Erro ao se conectar ao banco de dados: ${err}`)
    }
})

// app.post(() => {})

// inicia o servidor na porta 3000
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
