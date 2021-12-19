import express from "express"
import goodsController from "./goods.controller.js"

const router = express.Router()

router.route("/").get((goodsController.apiGetGoods))


export default router