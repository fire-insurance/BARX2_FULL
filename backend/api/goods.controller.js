import GoodsDAO from "../dao/goodsDAO.js"

export default class GoodsController {

    static async apiFetchImg(req, res) {
        const __rootDir = 'C:/Users/duda2/Desktop/BARX2_FULL/backend/Goods_Pics/'
        const imgPath = req.query.imgPath;
        res.sendFile(`${imgPath}`, { root: __rootDir })
    }

    static async apiGetGoods(req, res) {
        const goodsPerPage = req.query.goodsPerPage ? parseInt(req.query.goodsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        else if (req.query.type) {
            filters.type = req.query.type
        }

        const { goodsList, totalGoodsNumber } = await GoodsDAO.getGoods({
            filters,
            page,
            goodsPerPage
        })

        let response = {
            goods: goodsList,
            page: page,
            filters: filters,
            entries_per_page: goodsPerPage,
            total_results: totalGoodsNumber
        }
        res.json(response)
    }

    static async apiPostItem(req, res) {
        const pic_url = req.file.filename
        const name = req.body.name;
        const price = req.body.price;
        const type = req.body.type;
        try {
            const itemResponse = await GoodsDAO.addItem(
                name,
                price,
                type,
                pic_url
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteItem(req, res) {
        try {
            const itemToDeleteID = req.query.id;
            const itemResponse = await GoodsDAO.deleteItem(
                itemToDeleteID
            )
            res.json({ status: "success" })
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}