import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import GoodsDAO from "./dao/goodsDAO.js"
import UsersDAO from "./dao/usersDAO.js"

// Получаем .env переменные
dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
    .catch(err => {
        console.log(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await GoodsDAO.injectDB(client)
        await UsersDAO.injectDB(client)
        app.listen(port,() => {
            console.log(`listening on port ${port}`)
        })
    })