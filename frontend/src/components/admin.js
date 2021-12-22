import React, { useState, useEffect } from "react";
import Login from "./login.js"
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import logo from "../Icons/main_logo.png"
import UserDataService from "../services/users";
import ItemDataService from "../services/items.js";
import GoodsObject from "./goodsObject.js";
import "../css/admin.css"
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import looking_glass from "../Icons/looking_glass.png"
import plusIcon from "../Icons/plus.png"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


function Admin(props) {

    const [userEmployee, setUserEmpoyee] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    const [goods, setGoods] = useState([])
    const [dataSet, setDataSet] = useState('Goods')
    const [searchValue, setSearchValue] = React.useState('')
    const [isAddingItem, setIsAddingItem] = React.useState(false)
    const [itemToDelete, setItemToDelete] = React.useState([])

    const handleDataSetChange = (event, newDataSet) => {
        if (newDataSet !== null)
            setDataSet(newDataSet)
    }

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const Search = () => {
        // if (props.searchByName) {
        //     props.searchByName(searchValue)
        // }
        // navigate(`/catalog/search=${searchValue}`)
    }

    const checkIsUserAnEmployee = (userRights, userEmail) => {
        if (userRights === 'Admin' || userRights === 'Moderator') {
            setUserEmpoyee(userRights)
            setUserEmail(userEmail)
        }
        else window.location.assign('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }

    const type = '';

    // let type = useParams().type
    // if (type !== 'All' && type) {
    //     type = [...type].slice(0, type.length - 1).join('')
    // }
    // const search_name = useParams().search_value
    // const [goods, setGoods] = useState([])
    // const [searchVal, setSearchVal] = useState('')

    // if (search_name && search_name !== searchVal)
    //     setSearchVal(search_name)

    useEffect(() => {
        getGoods()
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

    const Input = styled('input')({
        display: 'none',
    });

    let newItemStyle = {
        display: isAddingItem ? 'flex' : 'none'
    }

    const setNewItemStyleTrue = () => {
        setIsAddingItem(true)
    }

    const setNewItemStyleFalse = () => {
        setIsAddingItem(false)
    }

    const onSubmitNewItemForm = (event) => {
        event.preventDefault()
        const item_name = event.target.name.value
        const item_price = event.target.price.value
        const item_type = event.target.type.value
        const item_img = event.target.img.files[0]

        const formData = new FormData()
        formData.append('image', item_img, item_img.name)
        formData.append('name', item_name)
        formData.append('price', item_price)
        formData.append('type', item_type)
        ItemDataService.createItem(formData)
        getGoods()
        setIsAddingItem(false)
        event.target.reset()
    }

    const confirmDeleteItem = (id, name) => {
        setItemToDelete([name, id])
    }

    const deleteItem = () => {
        ItemDataService.deleteItem(itemToDelete[1])
        setItemToDelete([])
        getGoods()
    }

    const deleteConfirmationStyle = {
        display: itemToDelete[0] ? 'block' : 'none'
    }

    return (
        <div>
            <div className="deleteConfirmationWrapper" style={deleteConfirmationStyle}>
                <div className="deleteConfirmation">
                    <p>Вы действительно хотите удалить {itemToDelete[0]}?</p>
                    <div className="deleteConfirmation__btnGroup">
                        <Button variant="outlined" color="success" onClick={deleteItem}>Удалить</Button>
                        <Button variant="outlined" color="error" onClick={e => setItemToDelete([])}>Отмена</Button>
                    </div>
                </div>
            </div>
            {
                userEmployee ? (
                    <div className="AppContainer">
                        <article className="controlBoard">
                            <div></div>
                            <div className="controlBoard__Data">
                                <div className="controlBoard__Data__TopData">
                                    <p className="userInfo">Сотрудник: <span>{userEmail} | {userEmployee}</span> </p>
                                    <ToggleButtonGroup
                                        value={dataSet}
                                        exclusive
                                        onChange={handleDataSetChange}
                                        color="info"
                                    >
                                        <ToggleButton className="toggleBtn" value="Goods">Товары</ToggleButton>
                                        <ToggleButton className="toggleBtn" value="Users">Пользователи</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                <div className="controlBoard__Data__BottomData">
                                    <Select onChange={onChangeType} name="input" label="Select Example" defaultValue={type ? type : 'All'} className="controlBoard__Data__BottomData__Select">
                                        <MenuItem value="All" label="Option 1" >Все товары</MenuItem>
                                        <MenuItem value="Shaker" label="Option 2" >Шейкеры</MenuItem>
                                        <MenuItem value="Jigger" label="Option 3" >Джиггеры</MenuItem>
                                        <MenuItem value="Syrup" label="Option 4" >Сиропы</MenuItem>
                                        <MenuItem value="Spoon" label="Option 4" >Ложки</MenuItem>
                                        <MenuItem value="Streiner" label="Option 4" >Стрейнеры</MenuItem>
                                    </Select>
                                    <div className="header__SearchBar">
                                        <button className="header__SearchBar__SearchButton" onClick={Search}>
                                            <img className="headerImg" src={looking_glass} alt="looking glass picture" />
                                        </button>
                                        <input onChange={onChangeSearchValue} className="header__SearchBar__SearchInput" type="text" placeholder="Поиск..." />
                                    </div>
                                </div>
                            </div>

                            <div></div>
                        </article>
                        <div className="main adminMain">
                            <div className="temp"></div>
                            <section className="catalog catalogAdmin">

                                <IconButton className="addObjBtn" color="primary" onClick={setNewItemStyleTrue} disabled={isAddingItem}>
                                    <img src={plusIcon}></img>
                                </IconButton>

                                <article className="Items">

                                    <form className="Item NewItem" style={newItemStyle} onSubmit={onSubmitNewItemForm}>
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" className="NewItem__InputImg" id="icon-button-file" type="file" name="img" multiple={false} />
                                            <IconButton color="primary" className="NewItem__InputImg" aria-label="upload picture" component="span">
                                                <PhotoCamera className="NewItem__InputImg" />
                                            </IconButton>
                                        </label>
                                        <div className="NewItem__TextInputs">
                                            <TextField id="filled-basic" className="NewItem__TextInput" id='name' name="name" label="Название" variant="filled" />
                                            <TextField id="filled-basic" className="NewItem__TextInput" id='price' name="price" label="Цена" variant="filled" />
                                            <Select className="NewItem__SelectInput" name="type" label="Select Example" defaultValue='Shaker'>
                                                <MenuItem value="Shaker" label="Option 1" >Шейкер</MenuItem>
                                                <MenuItem value="Jigger" label="Option 2" >Джиггер</MenuItem>
                                                <MenuItem value="Syrup" label="Option 3" >Сироп</MenuItem>
                                                <MenuItem value="Spoon" label="Option 4" >Ложка</MenuItem>
                                                <MenuItem value="Streiner" label="Option 5" >Стрейнер</MenuItem>
                                            </Select>
                                        </div>

                                        <div className="NewItem__Buttons">
                                            <Button variant="contained" color='primary' type="submit" >Принять</Button>
                                            <Button variant="contained" color="error" onClick={setNewItemStyleFalse} type='reset'>Отмена</Button>
                                        </div>

                                    </form>
                                    {goods.length ? (<GoodsObject goods={goods} renderForUser={false} deleteItem={confirmDeleteItem} />) : (<p>Загрузка</p>)}
                                </article>

                            </section>
                            <div className="temp"></div>
                        </div>
                    </div>
                ) :
                    (<section className="LoginWrapper" >
                        <div className="Login">
                            <a href="/" className="Login__Logo">
                                <img src={logo} alt="Главная страница" />
                            </a>

                            <div className="Login__Nav">
                                <div className="Login__Nav__NotRegistered">
                                    Войдите как сотрудник
                                </div>

                            </div>
                            <Login login={props.login} checkIsUserAnEmployee={checkIsUserAnEmployee}></Login>
                        </div>
                    </section>)
            }</div>)
}


export default Admin;