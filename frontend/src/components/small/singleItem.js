import React from "react";
import { useEffect } from "react";
import whiteHeartPic from '../../Icons/white_heart.png'
import trashCan from '../../Icons/delete.png'

const SingleItem = (props) => {

    const item = props.item
    const renderForUser = props.renderForUser

    const [itemImg, setItemImg] = React.useState('')

    async function get(url) {
        try {
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'image/*'
                }
            })
            const blob = await response.blob()
            return [URL.createObjectURL(blob), null];
        }
        catch (error) {
            console.error(`get: error occurred ${error}`);
            return [null, error]
        }
    }

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const [response, error] = await get(`http://localhost:5000/api/v1/fetchImage?imgPath=${item.picture_URL}`)
            if (error)
                console.log(error)
            else {
                setItemImg(response)
            }
        }
        fetchData();
    }, [item.picture_URL])

    const test = () => {
        console.log(item.name)
    }

    return (
        <div className="Item">

            <div className="Item__ImgAndDesc">
                <img className="Item__ImgAndDesc__MainImg" src={itemImg} alt="" />
                <p className="Item__ImgAndDesc__Description">{item.name}</p>
            </div>

            <div className="Item__PriceAndButtons">
                <p className="Item__PriceAndButtons__Price">{item.price}</p>
                {renderForUser ? (
                    <div className="Item__PriceAndButtons__Buttons">
                        <input className="Item__PriceAndButtons__Buttons__MoveToCart" type="submit" value="В корзину" />
                        <div className="Item__PriceAndButtons__Buttons__MvToFavorites">
                            <img src={whiteHeartPic} />
                        </div>
                    </div>
                ) : (
                    <div className="Item__PriceAndButtons__Buttons">
                        <input className="Item__PriceAndButtons__Buttons__MoveToCart Edit" type="submit" value="Изменить" />
                        <div className="Item__PriceAndButtons__Buttons__MvToFavorites Delete" onClick={e => props.deleteItem(item._id, item.name)}>
                            <img src={trashCan} />
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default SingleItem;