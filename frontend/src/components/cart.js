import React from "react";
import Header from "./header";
import Footer from "./footer";
import CartItem from "./small/cartItem";
import '../css/cart.css'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
function Cart(props) {

    const goodsLocalStorage = window.localStorage;
    const [retrievedGoods, setRetrievedGoods] = React.useState([])
    const currentUser = props.user
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [itemsPriceArr, setItemsPriceArr] = React.useState([])
    const [changedTotalPrice, setChangedTotalPrice] = React.useState(false)

    React.useEffect(() => {
        retrieveItemsFromLocalStorage()
        console.log(itemsPriceArr)
        let new_total_price = itemsPriceArr.reduce((sum, elem) => { return sum + elem }, 0)
        setTotalPrice(new_total_price)

    }, [changedTotalPrice])

    const retrieveItemsFromLocalStorage = () => {
        const lsItems = []
        for (let key in goodsLocalStorage) {
            if (goodsLocalStorage.hasOwnProperty(key)) {
                lsItems.push([key, goodsLocalStorage.getItem(key)]); // пропустит такие ключи, как "setItem", "getItem" и так далее
            }
        }
        setRetrievedGoods(lsItems)
    }

    const updateTotalPrice = (addToPrice) => {
        if (!isNaN(addToPrice) && !isNaN(totalPrice)) {
            console.log(totalPrice)
            console.log(addToPrice)
            setTotalPrice(totalPrice + addToPrice)
        }
    }

    return (
        <div className="AppContainer" >
            <Header user={currentUser}></Header>
            <div className="main">
                <div className="temp"></div>
                <section className="catalog catalogCart" style={{ gridTemplateColumns: `1fr 0.5fr` }}>
                    <div className="CartItems" >
                        {retrievedGoods ?
                            retrievedGoods.map(cartItem => {
                                return <CartItem item={cartItem} key={cartItem[0]} updateTotalPrice={updateTotalPrice} itemsPriceArr={itemsPriceArr} setChangedTotalPrice={setChangedTotalPrice} />
                            })
                            : (<p>Тут пока пусто</p>)}
                    </div>
                    <div className="CartInfo Card">
                        <div className="InfoHeader">
                            <p>ИТОГО</p>
                        </div>

                        <div className="Total">
                            <p className="Black">Сумма</p>
                            <p className="TotalPrice">{totalPrice}</p>
                        </div>

                        <div className="Delivery">
                            <p className="Black">Доставка</p>
                            <Select name="input" variant="standard" label="Select Example" defaultValue='RussianPost' className="controlBoard__Data__BottomData__Select">
                                <MenuItem value="RussianPost" label="Почта РФ" >Почта РФ</MenuItem>
                                <MenuItem value="Courier" label="Option 2" >Курьер</MenuItem>
                            </Select>
                        </div>

                        <div className="Checkout">
                            <p>Оплатить</p>
                        </div>
                    </div>
                </section>
                <div className="temp"></div>
            </div >
            <Footer></Footer>
        </div >
    );
}

export default Cart;
