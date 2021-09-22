import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import DataAll from "../pages/Admin/Permintaan";
import NotFoundComp from "../pages/404";
import HeaderComp from "../components/headerComp";
import SettingComp from "../pages/Admin/Setting";

const AdminRoute = () => {
  return (
    <Router>
      <HeaderComp />
      <Switch>
        <Route exact path="/administrator">
          <Admin copy="Copyright &copy; 2021 Aku" />
        </Route>
        <Route path="/administrator/all">
          <DataAll />
        </Route>
        <Route path="/administrator/setting">
          <SettingComp />
        </Route>
        <Route path="*">
          <NotFoundComp />
        </Route>
      </Switch>
    </Router>
  );
};

export default AdminRoute;
