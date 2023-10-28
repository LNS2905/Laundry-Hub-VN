import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import CustomersNavbar from "components/Navbars/CustomersNavbar.js";
import CusSidebar from "components/Sidebar/CusSidebar.js";
import CusHeader from "components/Headers/CusHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


// views

import CusOrderDetail from "components/Cards/OrderDetailCard.js";
import CusOrders from "views/customers/Orders.js";
import CusProfile from "views/customers/CusProfile.js";



export default function Customers() {
  return (
    <>
      <CusSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <CustomersNavbar />
        {/* Header */}
        <CusHeader />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>                                
            <Route path="/customers/orders" exact component={CusOrders} />
            <Route path="/customers/cusorderdetail" exact component={CusOrderDetail} />
            <Route path="/customers/cusprofile" exact component={CusProfile} />
            <Redirect from="/customers" to="/customers/orders" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
