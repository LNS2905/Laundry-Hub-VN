import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
// components

import CustomersNavbar from "components/Navbars/CustomersNavbar.js";
import CusSidebar from "components/Sidebar/CusSidebar.js";
import CusHeader from "components/Headers/CusHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


// views






import Orders from "views/customers/Orders.js";

export default function Admin() {
  return (
    <>
      <CusSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <CustomersNavbar />
        {/* Header */}
        <CusHeader />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>                                
            <Route path="/customers/orders" exact component={Orders} />           
            <Redirect from="/customers" to="/customers/orders" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
