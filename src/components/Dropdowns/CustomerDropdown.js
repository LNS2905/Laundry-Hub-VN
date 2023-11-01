import React from "react";
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const UserDropdown = () => {
  // dropdown props
  const navigate = useHistory();
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
              alt="cus"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/395586256_2307430336313376_6201350605673112004_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=ofxIltdFby8AX9fJRS7&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTcHfsAwRAkeS7lkmwBaxO2ezjuZ4NtKoznNoAiL8tZ5A&oe=6566E69E'}
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
