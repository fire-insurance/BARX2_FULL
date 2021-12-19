import http from "../http-common";

class ItemDataService{
    getAll(page = 0){
        return http.get(`?page=${[[page]]}`);
    }
    
    get(id){
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page=0){
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createItem(data){
        return http.put("/item", data)
    }
    
    updateItem(data){
        return http.put("/item", data)
    }

    deleteReview(id){
        return http.delete(`/item?id=${id}`);

    }
}

export default ItemDataService;