import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Customers from "layouts/Customers.js";
import Store from "layouts/Store.js";

// views without layouts

// import ListOfStores from "views/customers/ListOfStores.js";

import Index from "views/Index.js";
import StoreView from "views/StoreView.js";
import test from "views/test.js";
import { ToastContainer } from "react-toastify";



ReactDOM.render(
  <BrowserRouter>
  <ToastContainer />
    <Switch>
      {/* add routes with Users */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/customers" component={Customers} />
      <Route path="/store" component={Store} />
      

      {/* add routes without layouts */}
      <Route path="/productpage" component={StoreView} />
      <Route path="/test" exact component={test} />
      <Route path="/" exact component={Index} />

      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
