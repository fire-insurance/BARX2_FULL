import http from "../http-common";

class ItemDataService{
    static findAll(page = 0){
        return http.get(`/goods?page=${[[page]]}`);
    }
    
    static getById(id){
        return http.get(`/goods/id/${id}`);
    }

    static find(query, by = "name", page=0){
        return http.get(`/goods?${by}=${query}&page=${page}`)
    }

    static createItem(data){
        return http.put("/goods/item", data)
    }
    
    static updateItem(data){
        return http.put("/goods/item", data)
    }

    static deleteItem(id){
        return http.delete(`/goods/item?id=${id}`);
    }
}

export default ItemDataService;