
import React from "react";
import logo from "../Icons/main_logo.png"
import looking_glass from "../Icons/looking_glass.png"
import cart_img from "../Icons/cart.png"
import heart_img from "../Icons/heart.png"
import user_img from "../Icons/user.png"
import { Link } from 'react-router-dom'

function Header() {

    const [user, setUser] = React.useState(null)

    async function login(user = null) {
        setUser(user)
    }

    async function logout() {
        setUser(null)
    }

    return (
        <header className="header">
            <div></div>
            <Link to={'/'} className="header__MainLogo">
                <img src={logo} alt="Логотип компании" />
            </Link>

            <div className="header__SearchBar">
                <button className="header__SearchBar__SearchButton">
                    <img className="headerImg" src={looking_glass} alt="looking glass picture" />
                </button>
                <input className="header__SearchBar__SearchInput" type="text" placeholder="Поиск..." />
            </div>

            <div className="header__UserStuffWrapper">

                <Link to={"/favorites"}>
                    <div className="header__UserStuffWrapper__Content">
                        <p className="header__UserStuffWrapper__Text">Избранное</p>
                        <img className="headerImg" src={heart_img}></img>
                    </div>
                </Link>

                <Link to={"/cart"}>
                    <div className="header__UserStuffWrapper__Content">
                        <p className="header__UserStuffWrapper__Text">Корзина</p>
                        <img className="headerImg" src={cart_img}></img>
                    </div>
                </Link>
                <div>
                    {user ? (
                        <a onClick={logout} className="header__UserStuffWrapper__Content">
                            <p className="header__UserStuffWrapper__Text">Выйти {user.name}</p>
                            <img className="headerImg" src={user_img}></img>
                        </a>
                    ) : (
                        <Link to={"/login"}>
                            <div className="header__UserStuffWrapper__Content">
                                <p className="header__UserStuffWrapper__Text">Войти</p>
                                <img className="headerImg" src={user_img}></img>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;


