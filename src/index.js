import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Customers from "layouts/Customers.js";
// views without layouts

import ListOfStores from "views/customers/ListOfStores.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with Users */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/customers" component={Customers} />
      {/* add routes without layouts */}
      <Route path="/customers/ListOfStores" component={Index} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
