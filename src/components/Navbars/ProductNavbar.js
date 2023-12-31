/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import IndexDropdown from "components/Dropdowns/IndexDropdown";

export default function ProductNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav
        className="top-0 sticky z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
        style={{ backgroundColor: "#0284C7", position: "sticky" }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Laundry Hub VN
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              
              <li className="flex items-center">
                <Link
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to={localStorage.getItem('role') === 'ADMIN' ? '/admin/dashboard' : localStorage.getItem('role') === 'CUSTOMER' ? '/customers/orders' : '/store/orderrequested'}
                >
                  Dashboard
                </Link>
              </li>

              <li className="flex items-center">
                <IndexDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
