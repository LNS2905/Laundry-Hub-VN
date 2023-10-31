import React from "react";
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const AdminDropdown = () => {
  const navigate = useHistory();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
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
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={'https://images.unsplash.com/profile-fb-1687415375-5592bc38a9e7.jpg?auto=format&fit=crop&q=60&bg=fff&crop=faces&dpr=1&h=32&w=32'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default_image.jpg";
              }}
            />
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
        <Link to="/admin/adminprofile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 text-center"
          }>
          Profile
        </Link>

        <button
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminDropdown;
