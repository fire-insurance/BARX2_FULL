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
        else if (req.query.rigths) {
            filters.rigths = req.query.rigths
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
}