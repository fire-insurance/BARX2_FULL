import express from "express"
import cors from "cors"
import app_route from "./api/app.route.js"

const app = express()

// Сервер может принимать json документы
app.use(cors())
app.use(express.json())

// ссылки для доступа
app.use("/api/v1/", app_route)
app.use("*", (req, res) => res.status(404).json({ error: "Такой страницы не существует" }))

export default app