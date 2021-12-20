import React, { useState, useEffect } from "react";
import ItemDataService from "../services/items.js"
import { Link, useParams } from 'react-router-dom'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Header from '../components/header';
import Footer from "./footer.js";
import "../css/goods.css"
import whiteHeartPic from '../Icons/white_heart.png'

const GoodsList = (props) => {
  let type = useParams().type
  if (type !== 'All') {
    type = [...type].slice(0,type.length-1).join('')
  }

  const [goods, setGoods] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    type === 'All' ? getGoods() :
    searchByType(type)
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

  const searchByType = (type) => {
    search(type, 'type')
  }

  return (
    <div className="AppContainer">
      <Header></Header>
      <div className="main">
        <div className="temp"></div>
        <section className="catalog">
          <article className="options">
            <Select onChange={onChangeType} name="input" label="Select Example" defaultValue={type} className="options__TypeSelect">
              <MenuItem value="All" label="Option 1" >Все товары</MenuItem>
              <MenuItem value="Shaker" label="Option 2" >Шейкеры</MenuItem>
              <MenuItem value="Jigger" label="Option 3" >Джиггеры</MenuItem>
              <MenuItem value="Syrup" label="Option 4" >Сиропы</MenuItem>
              <MenuItem value="Spoon" label="Option 4" >Ложки</MenuItem>
              <MenuItem value="Streiner" label="Option 4" >Стрейнеры</MenuItem>
            </Select>
          </article>
          <article className="Items">
            {goods.length === 0 ? <p>Ничего не найдено</p> : goods.map(item => {
              return (
                <div className="Item" key={item._id}>

                  <div className="Item__ImgAndDesc">
                    <img className="Item__ImgAndDesc__MainImg" src={`../Goods_Pics/${item.picture_URL}`} alt="" />
                    <p className="Item__ImgAndDesc__Description">{item.name}</p>
                  </div>

                  <div className="Item__PriceAndButtons">
                    <p className="Item__PriceAndButtons__Price">{item.price}</p>
                    <div className="Item__PriceAndButtons__Buttons">
                      <input className="Item__PriceAndButtons__Buttons__MoveToCart" type="submit" value="В корзину" />
                      <div className="Item__PriceAndButtons__Buttons__MvToFavorites">
                        <img src={whiteHeartPic} />
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </article>
        </section>
        <div className="temp"></div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default GoodsList;
