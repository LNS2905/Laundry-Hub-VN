import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import StoreNavbar from "components/Navbars/StoreNavbar.js";
import StoreSidebar from "components/Sidebar/StoreSidebar.js";
import CusHeader from "components/Headers/CusHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import StoreProfile from "views/store/StoreProfile.js";
import StoreOrderDetail from "components/Cards/StoreOrderDetail.js";


// views






import OrderRequested from "views/store/OrderRequested.js";
import ServicesPage from "components/Cards/Services";

export default function Store() {
  return (
    <>
      <StoreSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <StoreNavbar />
        {/* Header */}
        <CusHeader />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>                                
          <Route path="/store/orderrequested" exact component={OrderRequested} />
          <Route path="/store/services" exact component={ServicesPage} />
          <Route path="/store/storeprofile" exact component={StoreProfile} />
          <Route path="/store/storeorderdetail/:id" exact component={StoreOrderDetail} />
            <Redirect from="/store" to="/store/orderrequested" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
