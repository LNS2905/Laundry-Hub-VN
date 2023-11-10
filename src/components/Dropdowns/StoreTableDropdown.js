import React from "react";
import { createPopper } from "@popperjs/core";
import api from "config/axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

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

  const handleUpdate = async () => {
    try {
      await api.put(`/${id}/deactive-account`);
      alert('Update successfully');
    } catch (error) {
      alert('Error when updating');
    }
  };

  return (
    <>
      <button
        className="text-blueGray-500 py-1 px-3 lg-border-20 bg-blue-500 text-white">

        <Link
          to={`/store/storeorderdetail/${id}`}
          className={
            "text-sm font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-500 py-1 px-3 lg-border-20 bg-blue-500 text-white"
          }
        >
          Detail
        </Link>
      </button>

    </>
  );
};

export default NotificationDropdown;
