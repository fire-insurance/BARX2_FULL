import React from "react";
import logo from "../Icons/main_logo.png"
import "../css/login.css"

import UserDataService from "../services/users";

const Register = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [userExists, setUserExists] = React.useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const errStyle = {
        color: '#ff3d3d',
        display: userExists ? 'block' : 'none'
    }

    const saveUser = () => {
        let userData = {
            userEmail: email,
            userPassword: password,
            userName: name,
            userRights: 'User'
        }

        UserDataService.find(userData.userEmail)
            .then(res => {
                if (res.data['total_results'] > 0) {
                    console.log(res)
                    throw 'Пользователь уже существует'
                }
                else {
                    setUserExists(false)
                    UserDataService.createUser(userData)
                        .then(response => {
                            window.location.href = "http://localhost:3000/"
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            })
            .catch(err => {
                console.log(err)
                setUserExists(true)
            })
    }

    return (
        <form className="Login__Form" >
            <input onChange={handleEmailChange} className="Login__Form__Input" type="email" placeholder="Электронная почта" required />
            <input onChange={handlePasswordChange} className="Login__Form__Input" type="password" placeholder="Пароль" required />
            <input onChange={handleNameChange} className="Login__Form__Input" type="text" placeholder="Ваше имя" required />
            <button type="button" onClick={saveUser} className="Login__Form__Submit">Регистрация</button>
            <p style={errStyle}>Пользователь с таким email уже существует</p>
        </form>
    )
}

export default Register;
