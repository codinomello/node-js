const mysql = require('mysql2/promise') // importa o módulo mysql2

// criação da conexão com o banco de dados
const connection = mysql.createPool({
    host: 'localhost',           // seu host (pode ser localhost)
    user: 'root',                // seu usuário do MySQL
    password: '',                // sua senha do MySQL
    database: 'sistema_reservas' // nome do banco de dados
})

// função para testar a conexão
async function testConnection() {
    try {
        await connection.query('SELECT 1')
        console.log('Conexão com o banco de dados realizada com sucesso!')
    } catch (err) {
        console.error(`Erro ao se conectar ao banco de dados: ${err}`)
    }
}

testConnection() // testa a conexão

module.exports = connection
