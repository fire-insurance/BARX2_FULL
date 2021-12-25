import React from "react";
import ItemDataService from "../../services/items"
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { display } from "@mui/system";

function CartItem(props) {

    let itemID = props.item[0]
    const [itemQuantity, setItemQuantity] = React.useState(props.item[1])
    const [itemImg, setItemImg] = React.useState('')
    const [item, setItem] = React.useState([])

    async function getItem() {
        ItemDataService.getById(itemID)
            .then(response => {
                setItem(response.data.item)
            })
            .catch(error => {
                console.error(error)
            })
    }

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

    React.useEffect(() => {
        async function fetchData() {
            if (!item.picture_URL) return
            const [response, error] = await get(`http://localhost:5000/api/v1/fetchImage?imgPath=${item.picture_URL}`)
            if (error)
                console.log(error)
            else {
                setItemImg(response)
            }
        }

        getItem()
            .then(e => {
                fetchData()
                if (!isNaN(itemQuantity) && !isNaN(item.price)) {
                    props.itemsPriceArr.push(item.price * itemQuantity)
                    props.setChangedTotalPrice(true)
                    props.setChangedTotalPrice(false)
                }
            })

    }, [item.picture_URL])

    const onQuantityChange = (event) => {
        const new_quantity = event.target.value
        props.updateTotalPrice(item.price * (new_quantity - itemQuantity))
        window.localStorage.setItem(itemID, new_quantity)
        setItemQuantity(new_quantity)
    }

    const deleteItemFromCart = () => {
        window.localStorage.removeItem(itemID)
        props.updateTotalPrice(-item.price * itemQuantity)
        setItemQuantity(0)
    }

    return (
        <div className="Item Cart ItemCart" style={{ width: '550px', display: itemQuantity ? 'grid' : 'none' }}>
            <img className="Item__ImgAndDesc__MainImg" src={itemImg} alt="item image" />
            <div className="ItemInfo">
                <p className="Price">{item.price}</p>
                <p className="Description">{item.name}</p>

                <div className="Quantity">
                    <p>Кол-во</p>
                    <Select name="input" variant="standard" label="Select Example" key={`select-${itemQuantity}`} defaultValue={itemQuantity} onChange={onQuantityChange} className="controlBoard__Data__BottomData__Select">
                        <MenuItem value="1" label="1" >1</MenuItem>
                        <MenuItem value="2" label="2" >2</MenuItem>
                        <MenuItem value="3" label="1" >3</MenuItem>
                        <MenuItem value="4" label="2" >4</MenuItem>
                        <MenuItem value="5" label="1" >5</MenuItem>
                    </Select>
                </div>
            </div>

            <div className="Close" onClick={deleteItemFromCart}>
                <p>x</p>
            </div>
        </div>
    )
}

export default CartItem;