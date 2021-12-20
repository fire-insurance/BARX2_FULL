import GoodsDAO from "../dao/goodsDAO.js"

export default class GoodsController {
    static async apiGetGoods(req, res) {
        const goodsPerPage = req.query.goodsPerPage ? parseInt(req.query.goodsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        else if (req.query.type){
            filters.type = req.query.type
        }

        const {goodsList, totalGoodsNumber} = await GoodsDAO.getGoods({
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
}