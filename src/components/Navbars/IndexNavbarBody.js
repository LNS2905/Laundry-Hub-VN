/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components
import IndexBody from "components/Navbars/IndexBody.js";
import AdminBody from "components/Navbars/AdminBody.js";
import CusBody from "components/Navbars/CusBody.js";
import StoreBody from "components/Navbars/StoreBody.js";




const IndexBodyNav = () => {
    const role = localStorage.getItem("role");
    switch (role) {
        case "ADMIN":
            return <AdminBody />;
        case "CUSTOMER":
            return <CusBody />;
        case "STORE":
            return <StoreBody />;
        default:
            return <IndexBody />;
    }
};

export default IndexBodyNav;
