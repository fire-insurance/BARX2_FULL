import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import React from "react"

import MainPage from "./components/MainPage";
import GoodsList from "./components/goods-list";
import LoginPage from "./components/LoginPage";
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
    { path: `/catalog/:type`, element: <GoodsList user={currentUser}/> },
    { path: `/catalog/search=:search_value`, element: <GoodsList user={currentUser}/> },
    { path: '/login', element: <LoginPage login={login} /> }
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


