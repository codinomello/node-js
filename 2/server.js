const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const connection = require('./script')

// cria o servidor
const app = express()

// middlewares
app.use(bodyParser.json()) // analisa o corpo das requisições como JSON
app.use(cors())            // permite requisições de outros domínios

// rota de consulta GET
app.get('/clientes', async (req, res) => {
    const query = `SELECT * FROM clientes`
    try {
        const [users] =  await connection.query(query)
        res.status(200).json(users)
        // console.log(users)
    } catch (err) {
        console.error(`Erro ao se conectar ao banco de dados: ${err}`)
    }
})

// rota de consulta POST
app.post('/clientes', async (req, res) => {
    const {nome, telefone, email, senha, data_cadastro} = req.body
    const hashed_senha = bcrypt.hashSync(senha, 10)
    console.log(hashed_senha)

    try {
        const query = `INSERT INTO clientes (nome, telefone, email, senha, data_cadastro)
                        VALUES (?, ?, ?, ?, ?)`
        await connection.query(query, [nome, telefone, email, senha, data_cadastro])
        res.status(201).json({message: 'Cliente cadastrado com sucesso.'}) // envia o status HTTP
    } catch (err) {
        console.error(`Erro ao se conectar ao banco de dados: ${err}`)
        res.status(500).json({message: 'Erro ao cadastrar usuário.'}) // envia o status HTTP 500
    }
})

// rota de login
app.post('/login', async (req, res) => {
    const {email, senha} = req.body
    try {
        const query = `SELECT email, senha FROM clientes WHERE email = ?`
        const [user] = await connection.query(query, [email]) 
        if (!user || user.length === 0){
            throw new Error ('Usuário ou senha inválidos.')
        }
        const decript_senha = bcrypt.compareSync(senha, user[0].senha)
        console.log(user)
        if (decript_senha) {
            res.status(200).json({message: 'Login realizado com sucesso.'})
        } else {
            res.status(400).json({message: 'Usuário ou Senha inválidos.'})
        }
    } catch (err) {
        res.status(500).json({message: "Erro interno."})
    }
})

// rota PUT
app.put('/clientes/:email', async (req, res) => {
    const {nome, telefone, senha} = req.body
    const email = req.params.email // captura os parâmetros da URL
    const hashed_senha = bcrypt.hashSync(senha, 10)
    try {
        const query = `UPDATE clientes SET nome = ?, telefone = ?, senha = ? WHERE email = ?`
        await connection.query(query, [nome, telefone, hashed_senha, email])
        res.status(200).json({message: "Dados foram atualizados."})
    } catch (err) {
        res.status(500).json({message: "Não foi possível atualizar os dados."})
    }
})

// inicia o servidor na porta 3000
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})