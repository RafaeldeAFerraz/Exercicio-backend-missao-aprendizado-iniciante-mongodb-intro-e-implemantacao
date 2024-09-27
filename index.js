const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

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

    app.get('/livros/:id', async function (req, res) {
        const id = req.params.id
        const item = await collection.findOne({ _id: new ObjectId(id) })

        if (!item) {
            return res.status(404).send('Item não encontrado')
        }

        res.send(item)
    })

    app.use(express.json())

    app.post('/livros', async function(req, res) {
        const novoItem = req.body
        
        if(!novoItem || !novoItem.nome){
            return res.status(400).send('Corpo da requisição deve conter a propriedade `nome`.')
        }
        
        if(collection.indexExists(novoItem)) {
            return res.status(409).send('Esse item já existe na collection.')
        }

        await collection.insertOne(novoItem)

        res.status(201).send(novoItem)
    })

    app.listen(3000)
}

main()