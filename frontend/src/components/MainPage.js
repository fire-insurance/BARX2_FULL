import React from "react";
import { Link } from 'react-router-dom'

import BostonShaker from "../MainPageGoods/BostonShaker.png"
import Jigger from "../MainPageGoods/Jigger.png"
import Streiner from "../MainPageGoods/Streiner.png"
import Spoon from "../MainPageGoods/spoon.png"
import Syrup from "../MainPageGoods/Syrup.png"
import Miscellanious from "../MainPageGoods/miscellanious.png"

import CardTypes from './small/CardTypes'
import Footer from "./footer";
import Header from "./header";
import "../css/MainPage.css"

function MainPage() {

  return (
    <div>
      <Header></Header>
      <main className="main">
        <div className="temp"></div>
        <div className="Wrapper">
          <section className="main__GoodsTypes">
            <CardTypes imgSrc={BostonShaker} title={'Шейкеры'} description={'Бостон, Цейлон, Коблер'}></CardTypes>
            <CardTypes imgSrc={Jigger} title={'Джиггеры'} description={'Металл, Стекло, Пластик'}></CardTypes>
            <CardTypes imgSrc={Syrup} title={'Сиропы'} description={'Monin, Barline, Tempo'}></CardTypes>
            <CardTypes imgSrc={Spoon} title={'Ложки'} description={'Нарезные, С пяткой, С вилами'}></CardTypes>
            <CardTypes imgSrc={Streiner} title={'Стрейнеры'} description={'Съемные, несъемные'}></CardTypes>
            <CardTypes imgSrc={Miscellanious} title={'Каталог'} description={'Все товары'}></CardTypes>
          </section>
        </div>
        <div className="temp"></div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
