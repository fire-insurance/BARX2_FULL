import React, { useState, useEffect } from "react";
import ItemDataService from "../services/items.js"
import { Link } from 'react-router-dom'
import Header from '../components/header';
import Footer from "./footer.js";
import "../css/goods.css"
import whiteHeartPic from '../Icons/white_heart.png'

const GoodsList = (props) => {

  const [goods, setGoods] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('')

  useEffect(() => {
    getGoods()
  })

  const getGoods = () => {
    ItemDataService.findAll()
      .then(response => {
        setGoods(response.data.goods)
      })
      .catch(error => {
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

  const searchByType = () => {
    search(searchType, 'type')
  }

  return (
    <div className="AppContainer">
      <Header></Header>
      <div className="main">
        <div className="temp"></div>
        <section className="catalog">
          <article className="options">
          </article>
          <article className="Items">

            {goods.map(item => {
              return (
                <div className="Item" key={item._id}>
                  <img src={`Goods_Pics/${item.picture_URL}`} alt="" />
                  <p className="Item__Price">{item.price}</p>
                  <p className="Item__Description">{item.name}</p>
                  <div className="Item__CartNHeart">
                    <input className="Item__CartNHeart__MoveToCart" type="submit" value="В корзину" />
                    <div className="Item__CartNHeart__MvToFavorites">
                      <img src={whiteHeartPic} />
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
