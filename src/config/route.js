import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFoundComp from "../pages/404";
import Cek from "../pages/Cek";
import FormComp from "../pages/Form";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminRoute from "./admin";

const RouteComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("localdata")) {
      const data = JSON.parse(localStorage.getItem("localdata"));
      if (data.user === dataUser.user && data.password === dataUser.password) {
        dispatch({ type: "UPDATE_ISLOGIN", payload: true });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ dispatch]);

  const { dataUser, isLogin } = useSelector((state) => state.userReducer);

  return (
    <Router>
      <div className="background-ori">
        <Switch>
          <Route exact path="/">
            <Home copy="Copyright &copy; 2021 Aku" />
          </Route>
          <Route path="/daftar">
            <FormComp copy="Copyright &copy; 2021 Aku" />
          </Route>
          <Route path="/cek">
            <Cek copy="Copyright &copy; 2021 Aku" />
          </Route>
          <Route path="/login">
            {isLogin ? <Redirect to="/administrator" /> : <Login />}
          </Route>
          <Route path="/administrator">
            {isLogin ? <AdminRoute /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFoundComp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default RouteComp;
