let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.RESTREVIEWS_NS).collection("users")
        } catch (error) {
            console.error(`Невозможно получить коллекцию в goodsDAO: ${error}`)
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("rights" in filters) {
                query = { "rights": { $eq: filters["rights"] } }
            }
        }

        let cursor

        try {
            cursor = await users
                .find(query)
        } catch (error) {
            console.error(`Невозможно выполнить запрос: ${error}`)
            return { usersList: [], totalUsersNumber: 0 }
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalUsersNumber = await users.countDocuments(query)

            return { usersList, totalUsersNumber }
        } catch (error) {
            console.error(`Невозможно получить массив из запроса или подсчитать число документов: ${error}`)
        
            return { usersList: [], totalUsersNumber: 0 }
        }
    }
}