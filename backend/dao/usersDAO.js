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
            if ("email" in filters) {
                query = { 'email': { $eq: filters["email"] } }
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

    static async addUser(email, password, name, rights){
        try {
            const userData = { 
                email: email,
                password: password,
                name: name,
                rights: rights
             }
      
            return await users.insertOne(userData)
          } catch (e) {
            console.error(`Unable to post user: ${e}`)
            return { error: e }
          }
    }
}