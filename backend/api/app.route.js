import express from "express"
import goodsController from "./goods.controller.js"
import UsersController from "./users.controller.js"
import multer from "multer"

// SET STORAGE
const storage = multer.diskStorage({
    destination: 'C:/Users/duda2/Desktop/BARX2_FULL/backend/Goods_Pics',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.route("/goods")
    .get((goodsController.apiGetGoods))

router.route("/users").get((UsersController.apiGetUsers))

router.route("/users/user")
    .post(UsersController.apiPostUser)
    .delete(UsersController.apiDeleteUser)
    .put(UsersController.apiUpdateUser)


router.route("/goods/item")
    .post(upload.single("image"), goodsController.apiPostItem)
    .delete(goodsController.apiDeleteItem)
    .put(upload.single("image"), goodsController.apiUpdateItem)

router.route("/goods/id")
    .get(goodsController.apiGetItemById)

router.route("/fetchImage")
    .get((goodsController.apiFetchImg))

export default router