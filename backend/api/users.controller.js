import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
    static async apiGetUsers(req, res) {
        // Получаем из тела запроса кол-во страниц и пользователей на странице
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        // Получаем из тела запроса фильтры 
        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        else if (req.query.rigths){
            filters.rigths = req.query.rigths
        }

        // Получаем список пользователей и их кол-во из БД
        const {usersList, totalUsersNumber} = await UsersDAO.getUsers({
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
        res.json(response)
    }
}