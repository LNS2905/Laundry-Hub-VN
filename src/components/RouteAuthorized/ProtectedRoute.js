import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (role === "CUSTOMER") {
          if (rest.path.startsWith("/customers")) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/unauthorized" />;
          }
        } else if (role === "ADMIN") {
          if (rest.path.startsWith("/admin")) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/unauthorized" />;
          }
        } else if (role === "STORE") {
          if (rest.path.startsWith("/store")) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/unauthorized" />;
          }
        } else {
          // Chuyển hướng người dùng đến trang không được phép nếu không thuộc role nào
          return <Redirect to="/unauthorized" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
