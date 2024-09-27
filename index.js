const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:KJsim29sjakjm437A@cluster0.m8eas.mongodb.net'

const dbName = 'exercicio-livro'

async function main() {

    const client = new MongoClient(dbUrl)
    console.log('Conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!')

    const db = client.db(dbName)
    const collection = db.collection('livros')

    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    app.get('/livros', async function (req, res) {
        const itens = await collection.find().toArray()

        res.send(itens)
    })

    app.listen(3000)
}

main()