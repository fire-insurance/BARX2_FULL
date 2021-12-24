import React from "react";
import whiteHeartPic from '../Icons/white_heart.png'
import SingleUser from "./small/single-user";
import UserDataService from "../services/users";
import Button from '@mui/material/Button';

function UsersList(props) {

    const [users, setUsers] = React.useState([])
    const [userToDelete, setUserToDelete] = React.useState([]) //_id, email
    const [userToUpdateRights, setUserToUpdateRights] = React.useState([]) //_id, new rights

    React.useEffect(() => {
        props.currentUserType === 'All' ? getUsers() : searchByRights(props.currentUserType)
        if (props.searchByEmail) search(props.searchByEmail, 'email')
    }, [props.currentUserType, props.searchByEmail])

    const getUsers = () => {
        UserDataService.findAll()
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const refreshList = () => {
        getUsers()
    }

    const searchByRights = (rights) => {
        search(rights, 'rights')
    }

    const search = (query, by) => {
        console.log(query)
        UserDataService.find(query, by)
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => {
                console.error(error)
            })
    }


    const divStyle = {
        display: 'grid',
        gridTemplateColums: 'auto',
        gap: '1px',
        backgroundColor: 'rgba(0, 0, 0, 0.048)'
    }

    const deleteConfirmationStyle = {
        display: userToDelete[0] ? 'block' : 'none'
    }

    const deleteUser = () => {
        UserDataService.deleteUser(userToDelete[0])
            .then(e => {
                setUserToDelete([])
                refreshList()
            })
    }

    const updateUserRights = (_id, rights) => {
        console.log(userToUpdateRights)
        UserDataService.updateUserRights({ _id: _id, rights: rights }) //_id, new rights
            .then(e => {
                refreshList()
            })
    }

    return (
        <div>
            <div className="deleteConfirmationWrapper" style={deleteConfirmationStyle}>
                <div className="deleteConfirmation">
                    <p>Вы действительно хотите удалить {userToDelete[1]}?</p>
                    <div className="deleteConfirmation__btnGroup">
                        <Button variant="outlined" color="success" onClick={deleteUser}>Удалить</Button>
                        <Button variant="outlined" color="error" onClick={e => setUserToDelete([])}>Отмена</Button>
                    </div>
                </div>
            </div>
            <div style={divStyle}>
                {users.length === 0 ? <p>Ничего не найдено</p> : users.map(user => {
                    return <SingleUser key={user._id} user={user} setUserToDelete={setUserToDelete} updateUserRights={updateUserRights} loggedUserRights={props.loggedUserRights} />
                })}
            </div>

        </div>
    )
}

export default UsersList;