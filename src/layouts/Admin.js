import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


// views

import Dashboard from "views/admin/Dashboard.js";
import CustomersTable from "views/admin/CustomersTable.js";
import StoresTable from "views/admin/StoresTable.js";
import AllOrderCard from "views/admin/AllOrder.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />                    
            <Route path="/admin/storestable" exact component={StoresTable} />
            <Route path="/admin/allorder" exact component={AllOrderCard} />
           <Route path="/admin/customerstable" exact component={CustomersTable} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
