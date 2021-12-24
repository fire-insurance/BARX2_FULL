import React from "react";
import { useEffect } from "react";
import whiteHeartPic from '../../Icons/white_heart.png'
import trashCan from '../../Icons/delete.png'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SingleItem = (props) => {

    const item = props.item
    const renderForUser = props.renderForUser

    const [itemImg, setItemImg] = React.useState('')
    const [isChanging, setIsChanging] = React.useState(false)

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


    const Input = styled('input')({
        display: 'none',
    });

    const onUpdateItemSubmit = (event) => {
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
        formData.append('_id', item._id)

        props.updateItem(formData)
        setIsChanging(false)
    }

    return (
        <div >
            {renderForUser ? (
                <div className="Item">
                    <div className="Item__ImgAndDesc">
                        <img className="Item__ImgAndDesc__MainImg" src={itemImg} alt="item image" />
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
            ) : (isChanging ? (
                <form className="Item NewItem" onSubmit={onUpdateItemSubmit}>
                    <label htmlFor="update-item-button-file">
                        <Input accept="image/*" className="NewItem__InputImg" id="update-item-button-file" type="file" name="img" multiple={false} />
                            <IconButton color="primary" className="NewItem__InputImg" aria-label="upload picture" component="span">
                                <PhotoCamera className="NewItem__InputImg" />
                            </IconButton>       
                    </label>
                    <div className="NewItem__TextInputs">
                        <TextField id="filled-basic" className="NewItem__TextInput" id='name' name="name" label="Название" variant="filled" defaultValue={item.name} required />
                        <TextField id="filled-basic" className="NewItem__TextInput" id='price' name="price" label="Цена" variant="filled" defaultValue={item.price} required />
                        <Select className="NewItem__SelectInput" name="type" label="Select Example" defaultValue={item.type} required>
                            <MenuItem value="Shaker" label="Option 1" >Шейкер</MenuItem>
                            <MenuItem value="Jigger" label="Option 2" >Джиггер</MenuItem>
                            <MenuItem value="Syrup" label="Option 3" >Сироп</MenuItem>
                            <MenuItem value="Spoon" label="Option 4" >Ложка</MenuItem>
                            <MenuItem value="Streiner" label="Option 5" >Стрейнер</MenuItem>
                        </Select>
                    </div>

                    <div className="NewItem__Buttons">
                        <Button variant="contained" color='primary' type="submit" >Принять</Button>
                        <Button variant="contained" color="error" onClick={e => setIsChanging(false)} type='reset'>Отмена</Button>
                    </div>

                </form>
            ) : (
                <div className="Item">
                    <div className="Item__ImgAndDesc">
                        <img className="Item__ImgAndDesc__MainImg" src={itemImg} alt="item image" />
                        <p className="Item__ImgAndDesc__Description">{item.name}</p>
                    </div>

                    <div className="Item__PriceAndButtons">
                        <p className="Item__PriceAndButtons__Price">{item.price}</p>

                        <div className="Item__PriceAndButtons__Buttons">
                            <input className="Item__PriceAndButtons__Buttons__MoveToCart Edit" type="submit" value="Изменить" onClick={e => setIsChanging(true)} />
                            <div className="Item__PriceAndButtons__Buttons__MvToFavorites Delete" onClick={e => props.deleteItem(item._id, item.name)}>
                                <img src={trashCan} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default SingleItem;