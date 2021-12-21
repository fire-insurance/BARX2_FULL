import React from "react";
import logo from "../Icons/main_logo.png"
import "../css/login.css"
import Register from "./register.js"
import Login from "./login.js"


function LoginPage(props) {

    const [component, setComponent] = React.useState([Login])
    const [isLogin, setIsLogin] = React.useState(true)

    let notRegStyle = {
        border: 'none',
        borderRight: 'solid rgb(168, 168, 168) 2px',
        color: isLogin ? 'rgb(119, 119, 119)' : 'black',
        borderBottom: isLogin ? 'solid rgb(168, 168, 168) 2px' : 'none',
        borderTop: isLogin ? 'none' : 'solid rgb(168, 168, 168) 2px'
    }

    let regStyle = {
        border: 'none',
        color: isLogin ? 'black' : 'rgb(119, 119, 119)',
        borderTop: isLogin ? 'solid rgb(168, 168, 168) 2px' : 'none',
        borderBottom: isLogin ? 'none' : 'solid rgb(168, 168, 168) 2px'
    }

    const renderLogin = () => {
        setIsLogin(true)
        setComponent([Login])
    }

    const renderRegister = () => {
        setIsLogin(false)
        setComponent([Register])
    }



    return (
        <section className="LoginWrapper">
            <div className="Login">
                <a href="/" className="Login__Logo">
                    <img src={logo} alt="Главная страница" />
                </a>

                <div className="Login__Nav">
                    <button className="Login__Nav__NotRegistered" onClick={renderRegister} style={notRegStyle}>
                        Первый раз?
                    </button>
                    <button className="Login__Nav__AlreadyRegistered" onClick={renderLogin} style={regStyle}>
                        Уже зарегистрированы?
                    </button>
                </div>
                {component.map((Element, i) => <Element key={i} login={props.login}/>)}
            </div>
        </section>
    );
}

export default LoginPage;
