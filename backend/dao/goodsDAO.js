let goods
import { ObjectId } from "mongodb"
import fs from "fs"

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
                query = { 'name': { $regex: filters["name"] } }
            } else if ("type" in filters) {
                query = { "type": { $eq: filters["type"] } }
            }
            else if ("_id" in filters) {
                query = { "_id": { $eq: filters['_id'] } }
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


    static async updateItem(_id, name, price, type, pic_url) {

        try {
            const foundItem = await this.getImgByID(_id)
            const item_pictureURL = foundItem[0].picture_URL
            fs.unlinkSync('C:/Users/duda2/Desktop/BARX2_FULL/backend/Goods_Pics/' + item_pictureURL)
        } catch (e) {
            console.error(`Невозможно удалить картинку: ${e}`)
            return { error: e }
        }

        try {
            return await goods.updateOne({ _id: ObjectId(_id) },
                { $set: { name: name, type: type, picture_URL: pic_url, price: price } })
        } catch (e) {
            console.error(`Unable to update item: ${e}`)
            return { error: e }
        }
    }

    static async getImgByID(itemID) {
        let cursor
        const query = { "_id": { $eq: ObjectId(itemID) } }
        console.log(query)
        try {
            cursor = await goods
                .find(query)
        } catch (error) {
            console.error(`Невозможно выполнить запрос: ${error}`)
            return []
        }
        try {
            const goodsList = await cursor.toArray()

            return goodsList;
        } catch (error) {
            console.error(`Невозможно получить массив из запроса или подсчитать число документов: ${error}`)

            return goodsList
        }
    }

    static async deleteItem(itemID) {

        try {

            const foundItem = await this.getImgByID(itemID)
            const item_pictureURL = foundItem[0].picture_URL
            fs.unlinkSync('C:/Users/duda2/Desktop/BARX2_FULL/backend/Goods_Pics/' + item_pictureURL)

            const deleteResponse = await goods.deleteOne({
                _id: ObjectId(itemID)
            })

            return deleteResponse
        } catch (e) {
            console.error(`Невозможно удалить: ${e}`)
            return { error: e }
        }
    }
}