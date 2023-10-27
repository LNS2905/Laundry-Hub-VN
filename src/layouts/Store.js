import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
// components

import CustomersNavbar from "components/Navbars/CustomersNavbar.js";
import StoreSidebar from "components/Sidebar/StoreSidebar.js";
import CusHeader from "components/Headers/CusHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


// views






import OrderRequested from "views/store/OrderRequested.js";

export default function Store() {
  return (
    <>
      <StoreSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <CustomersNavbar />
        {/* Header */}
        <CusHeader />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>                                
            <Route path="/store/orderrequested" exact component={OrderRequested} />
   
            <Redirect from="/store" to="/store/orderrequested" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
