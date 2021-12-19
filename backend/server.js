import express from "express"
import cors from "cors"
import goods from "./api/goods.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/goods", goods)
app.use("*", (req, res) => res.status(404).json({ error: "Такой страницы не существует" }))

export default app