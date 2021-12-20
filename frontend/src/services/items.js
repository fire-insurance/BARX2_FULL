import http from "../http-common";

class ItemDataService{
    static findAll(page = 0){
        return http.get(`?page=${[[page]]}`);
    }
    
    static getById(id){
        return http.get(`/id/${id}`);
    }

    static  find(query, by = "name", page=0){
        return http.get(`?${by}=${query}&page=${page}`)
    }

    static  createItem(data){
        return http.put("/item", data)
    }
    
    static updateItem(data){
        return http.put("/item", data)
    }

    static deleteReview(id){
        return http.delete(`/item?id=${id}`);
    }
}

export default ItemDataService;