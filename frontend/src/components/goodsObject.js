import React from "react";
import whiteHeartPic from '../Icons/white_heart.png'
import trashCan from '../Icons/delete.png'
import SingleItem from "./small/singleItem";

function GoodsObject(props) {
  const renderForUser = props.renderForUser
  const [goods, setGoods] = React.useState([])

  React.useEffect(() => {
    setGoods(props.goods)
  })

  const divStyle = {
    display: 'grid',
    gridTemplateColums: 'auto',
    gap: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.048)'
  }

  return (
    <div style={divStyle}>
      {goods.length === 0 ? <p>Ничего не найдено</p> : goods.map(item => {
        return <SingleItem key={item._id} renderForUser={renderForUser} deleteItem={props.deleteItem} updateItem={props.updateItem} item={item} />
      })}
    </div>
  )
}

export default GoodsObject;