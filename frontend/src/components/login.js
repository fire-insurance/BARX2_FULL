import React from "react";
import bcrypt from "bcryptjs";
import "../css/login.css"

import { Redirect } from 'react-router'

import UserDataService from "../services/users";

const Login = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errText, setErrText] = React.useState('')


  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const throwErr = (err) => {
    throw err;
  }

  async function checkUser() {
    let userData = {
      userEmail: email,
      userPassword: password,
    }
    UserDataService.find(userData.userEmail)
      .then(res => {
        if (res.data['total_results'] === 0) {
          console.log(res)
          throwErr('Пользователь не существует')
        }
        else {

          const dbUserPassword = res.data.users[0].password;
          bcrypt.compareSync(userData.userPassword, dbUserPassword) ? setErrText('')
            : throwErr('Неверный логин или пароль')

          props.login({ name: res.data.users[0].name, id: res.data.users[0]._id })

        }
      })
      .catch(err => {
        setErrText(err)
      })

  }

  const errStyle = {
    color: '#ff3d3d',
    display: errText ? 'block' : 'none'
  }

  return (
    <form className="Login__Form">
      <input onChange={handleEmailChange} className="Login__Form__Input" type="email" name="email" placeholder="Электронная почта" required />
      <input onChange={handlePasswordChange} className="Login__Form__Input" type="password" name="password" placeholder="Пароль" required />
      <button type="button" onClick={checkUser} className="Login__Form__Submit">Вход</button>
      <p style={errStyle}>{errText}</p>
    </form>)
}

export default Login;
