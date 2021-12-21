import http from "../http-common";
import axios from 'axios';

class UserDataService {
    static findAll(page = 0) {
        return http.get(`/users?page=${[[page]]}`);
    }

    static getById(id) {
        return http.get(`/users/id/${id}`);
    }

    static find(query, by = "email", page = 0) {
        return http.get(`/users?${by}=${query}&page=${page}`)
    }

    static createUser(userData) {
        return http.post("/users/user", userData)
    }

    static updateUser(data) {
        // return http.put("/users/user", data)

    }

    static deleteUser(id) {
        return http.delete(`/users/iser?id=${id}`);
    }
}

export default UserDataService;