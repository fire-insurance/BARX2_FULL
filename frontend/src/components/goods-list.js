import React, { useState, useEffect } from "react";
import ItemDataService from "../services/items.js"
import { Link, useParams } from 'react-router-dom'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Header from '../components/header';
import Footer from "./footer.js";
import "../css/goods.css"
import GoodsObject from "./goodsObject.js";

const GoodsList = (props) => {

  const currentUser = props.user

  let type = useParams().type
  if (type !== 'All' && type) {
    type = [...type].slice(0, type.length - 1).join('')
  }
  const search_name = useParams().search_value
  const [goods, setGoods] = useState([])
  const [searchVal, setSearchVal] = useState('')

  if (search_name && search_name !== searchVal)
    setSearchVal(search_name)

  useEffect(() => {
    if (search_name) {
      searchByName(search_name)
    }
    if (type) {
      if (type === 'All') getGoods()
      else searchByType(type)
    }
    else {
      type = 'All'
      getGoods()
    }

  }, [])

  const getGoods = () => {
    ItemDataService.findAll()
      .then(response => {
        setGoods(response.data.goods)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onChangeType = (e) => {
    const sType = e.target.value;

    sType === 'All' ? refreshList() : searchByType(sType);
  }

  const refreshList = () => {
    getGoods()
  }

  const search = (query, by) => {
    console.log(query)
    ItemDataService.find(query, by)
      .then(response => {
        setGoods(response.data.goods)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const searchByName = (sName) => {
    search(sName, 'name')
  }

  const searchByType = (type) => {
    search(type, 'type')
  }

  return (
    <div className="AppContainer">
      <Header user={currentUser} searchByName={searchByName}></Header>
      <div className="main">
        <div className="temp"></div>
        <section className="catalog">
          <article className="options">
            <Select onChange={onChangeType} variant="filled" name="input" label="Select Example" defaultValue={type ? type : 'All'} className="options__TypeSelect">
              <MenuItem value="All" label="Option 1" >Все товары</MenuItem>
              <MenuItem value="Shaker" label="Option 2" >Шейкеры</MenuItem>
              <MenuItem value="Jigger" label="Option 3" >Джиггеры</MenuItem>
              <MenuItem value="Syrup" label="Option 4" >Сиропы</MenuItem>
              <MenuItem value="Spoon" label="Option 4" >Ложки</MenuItem>
              <MenuItem value="Streiner" label="Option 4" >Стрейнеры</MenuItem>
            </Select>
          </article>
          {
            goods.length ? (<div className="Items"> <GoodsObject goods={goods} renderForUser={true} /></div>) : (<p>Ничего не найдено</p>)
          }
        </section>
        <div className="temp"></div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default GoodsList;
