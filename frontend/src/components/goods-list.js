import React, {useState, useEffect} from "react";
import ItemDataService from "../services/items"
import {Link} from 'react-router-dom'

import Header from '../components/header';

const GoodsList = (props) => {

  const [goods, setGoods] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('')

  useEffect(()=>{
    getGoods()
  })

  const getGoods = () =>{
    ItemDataService.getAll()
      .then(response => {
        setGoods(response.data.goods)
      })
      .catch(error =>{
        console.error(error)
      })
  }

  const refreshList = () => {
    getGoods()
  }

  const search = (query, by) => {
    ItemDataService.find(query, by)
    .then(response => {
      setGoods(response.data.goods)
    })
    .catch(error => {
      console.error(error)
    })
  }

  const searchByName = () => {
    search(searchName, 'name')
  }

  searchByType = () => {
    search(seachType, 'type')
  }

  return (
    <div className="GoodsList">
      <Header></Header>
    </div>
  );
}

export default GoodsList;
