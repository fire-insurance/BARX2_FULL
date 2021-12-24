import UsersDAO from "../dao/usersDAO.js"
import bcrypt from 'bcrypt'

export default class UsersController {
    static async apiGetUsers(req, res) {
        // Получаем из тела запроса кол-во страниц и пользователей на странице
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        // Получаем из тела запроса фильтры 
        let filters = {}
        if (req.query.email) {
            filters.email = req.query.email
        }
        else if (req.query.rights) {
            filters.rights = req.query.rights
        }
        // Получаем список пользователей и их кол-во из БД
        const { usersList, totalUsersNumber } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage
        })


        // Возвращаем ответ на HTTP-запрос
        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalUsersNumber
        }
        return res.json(response)
    }

    static async apiPostUser(req, res) {
        const email = req.body.userEmail
        const password = bcrypt.hashSync(req.body.userPassword, 10)
        const name = req.body.userName
        const rigths = req.body.userRights
        console.log(password)
        try {
            const userResponse = await UsersDAO.addUser(
                email,
                password,
                name,
                rigths
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteUser(req, res) {
        try {
            const userToDeleteID = req.query.id;
            const itemResponse = await UsersDAO.deleteUser(
                userToDeleteID
            )
            res.json({ status: "success" })
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    
    static async apiUpdateUser(req, res) {
        const _id = req.body._id
        const rights = req.body.rights
        console.log(_id)
        console.log(rights)

        try {
            const itemResponse = await UsersDAO.updateUser(
                _id,
                rights
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}