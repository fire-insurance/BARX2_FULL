import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import React from "react"

import MainPage from "./components/MainPage";
import GoodsList from "./components/goods-list";

const App = () =>{
  let routes = useRoutes([
    {path: "/", element: <MainPage />},
    {path: `/catalog/:type`, element:<GoodsList />}
  ])
  return routes
}

const AppWrapper = () => {
  return(
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper


