import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import AdminDropdown from "./AdminDropdown";
import CustomerDropdown from "./CustomerDropdown";
import StoreDropdown from "./StoreDropdown";
import NonUserDropdown from "./NonUserDropdown";

const IndexDropdown = () => {
  const role = localStorage.getItem("role");
  switch (role) {
    case "ADMIN":
      return <AdminDropdown />;
    case "CUSTOMER":
      return <CustomerDropdown />;
    case "STORE":
      return <StoreDropdown />;
    default:
      return <NonUserDropdown /> ;
  }
};

export default IndexDropdown;

