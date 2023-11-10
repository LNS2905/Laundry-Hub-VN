
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import React, { useState, useEffect } from "react";
import api from "config/axios";




const UserDropdown = () => {
  // dropdown props
  const navigate = useHistory();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("information-customer");
        setCustomers(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  console.log(customers);
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {customers.avatar ? (
              <img
                src={customers.avatar}
                className="h-12 w-12 bg-white rounded-full border"
                alt="Avatar"
              ></img>
            ) : (
              <img
                src='https://cdn1.iconfinder.com/data/icons/customer-and-service-3/512/7-512.png'
                className="h-12 w-12 bg-white rounded-full border"
                alt="Default Avatar"
              ></img>
            )}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to="/customers/cusprofile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 text-center"
          }
        >
          Profile
        </Link>

        <Link
          to="/customers/orders"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 text-center"
          }
        >
          My Orders
        </Link>

        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            localStorage.removeItem('account');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
