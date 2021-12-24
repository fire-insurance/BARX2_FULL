import React from "react";
import { useEffect } from "react";
import trashCan from '../../Icons/delete.png'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../css/single.user.css"
const SingleUser = (props) => {

    const user = props.user
    const [rightsAccessebility, setRightsAccessebility] = React.useState(false)

    useEffect(() => {
        console.log(props.loggedUserRights)
        if (user.rights === 'Admin') setRightsAccessebility(true)
        else if (user.rights === 'Moderator' && props.loggedUserRights === 'Moderator') setRightsAccessebility(true)
        else setRightsAccessebility(false)
    }, [])


    const updUserRights = (event) => {
        props.updateUserRights(user._id, event.target.value)
    }


    return (

        <div className="User">
            <p className="User__Data">Email: <span className="User__Data__Content">{user.email}</span> </p>
            <p className="User__Data">Имя: <span className="User__Data__Content"> {user.name}</span></p>

            <div className="User__Controls">
                <Select className="User__Controls__Rights" onChange={updUserRights} name="type" label="Select Example" disabled={rightsAccessebility} defaultValue={user.rights}>
                    <MenuItem value="User" label="Option 1" >Пользователь</MenuItem>
                    <MenuItem value="Admin" label="Option 2" >Админ</MenuItem>
                    <MenuItem value="Moderator" label="Option 3" >Модератор</MenuItem>
                </Select>

                <div className="User__Controls__Button__Delete" onClick={e => props.setUserToDelete([user._id, user.email])} style={{
                    display: rightsAccessebility ? 'none' : 'block'
                }}>
                    < img src={trashCan} />
                </div>
            </div>

        </div >
    )
}

export default SingleUser;