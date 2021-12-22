let goods
import {ObjectID} from "mongodb"
export default class GoodsDAO {



    static async injectDB(conn) {
        if (goods) {
            return
        }
        try {
            goods = await conn.db(process.env.RESTREVIEWS_NS).collection("goods")
        } catch (error) {
            console.error(`Невозможно получить коллекцию в goodsDAO: ${error}`)
        }
    }

    static async getGoods({
        filters = null,
        page = 0,
        goodsPerPage = 20
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("type" in filters) {
                query = { "type": { $eq: filters["type"] } }
            }
        }

        let cursor

        try {
            cursor = await goods
                .find(query)
        } catch (error) {
            console.error(`Невозможно выполнить запрос: ${error}`)
            return { goodsList: [], totalGoodsNumber: 0 }
        }

        const displayCursor = cursor.limit(goodsPerPage).skip(goodsPerPage * page)

        try {
            const goodsList = await displayCursor.toArray()
            const totalGoodsNumber = await goods.countDocuments(query)

            return { goodsList, totalGoodsNumber }
        } catch (error) {
            console.error(`Невозможно получить массив из запроса или подсчитать число документов: ${error}`)

            return { goodsList: [], totalGoodsNumber: 0 }
        }
    }

    static async addItem(name, price, type, pic_url) {
        try {
            const itemData = {
                name: name,
                type: type,
                picture_URL: pic_url,
                price: price
            }

            return await goods.insertOne(itemData)
        } catch (e) {
            console.error(`Unable to post item: ${e}`)
            return { error: e }
        }
    }

    static async deleteItem(itemID) {
        console.log(itemID)
        try {
            const deleteResponse = await goods.deleteOne({
                _id: ObjectID(itemID)
            })

            return deleteResponse
        } catch (e) {
            console.error(`Невозможно удалить: ${e}`)
            return { error: e }
        }
    }
}