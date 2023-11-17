import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotificationDropdown = ({ id }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <button className="text-blueGray-500 py-1 px-3 lg-border-20 bg-blue-500 text-white">

        <Link
          to={`/customers/cusorderdetail/${id}`}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Detail
        </Link>

      </button>
    </>
  );
};

export default NotificationDropdown;
