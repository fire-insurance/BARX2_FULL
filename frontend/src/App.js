import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import React from "react"

import MainPage from "./components/MainPage";
import GoodsList from "./components/goods-list";
import LoginPage from "./components/LoginPage";
import Admin from "./components/admin";
import Cart from "./components/cart";
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null)

  function login(user = null) {
    setCurrentUser(user)

    navigate('/')
  }

  let routes = useRoutes([
    { path: "/", element: <MainPage user={currentUser} /> },
    { path: `/catalog/:type`, element: <GoodsList user={currentUser} renderForUser={true} /> },
    { path: `/catalog/search=:search_value`, element: <GoodsList user={currentUser} renderForUser={true} /> },
    { path: '/login', element: <LoginPage login={login} /> },
    { path: '/admin', element: <Admin login={login} renderForUser={false} /> },
    { path: '/cart', element: <Cart login={login} user={currentUser} /> }
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper


