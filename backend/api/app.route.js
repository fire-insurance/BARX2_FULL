import express from "express"
import goodsController from "./goods.controller.js"
import UsersController from "./users.controller.js"

const router = express.Router()

router.route("/goods").get((goodsController.apiGetGoods))
router.route("/users").get((UsersController.apiGetUsers))
export default router