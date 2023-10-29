import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

// components

import ServicesDropdown from "components/Dropdowns/ServicesDropdown.js";
import api from "config/axios";
import { Button, Tag, Modal } from "antd";
import CreateService from "./CreateService";

export default function ServicesPage({ color }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [render, setRender] = useState(0);

  const fetchData = async () => {
    const res = await api.get("http://143.198.196.146:8080/api/v1/service")
    console.log(res.data.data);
    const data = res.data.data;
    setServices(data);
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setSubmit(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, [render])

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 justify-between">
              <h3
                className={
                  "font-semibold text-lg flex justify-between " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                <span>Services</span>  <>
                <Button type="primary" onClick={showModal}>
                  Create new service
                </Button>
                <Modal
                  open={open}                  
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                      Create
                    </Button>,
                    
                  ]}
                >
                  <CreateService submit={submit} setSubmit={setSubmit} handleCancel={handleCancel} render={render} setRender={setRender}/>
                </Modal>
              </>
              </h3>

            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Orders table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Services ID
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Services Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Image
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >options</th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {service.id}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.description}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img src={service.figure} width={100} style={{
                      borderRadius: 10
                    }}/>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.options.map((option, index) => {
                      return <Tag key={index} color="blue">{option.name}</Tag>
                    })}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <ServicesDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ServicesPage.defaultProps = {
  color: "dark",
};

ServicesPage.propTypes = {
  color: PropTypes.oneOf(["dark", "dark"]),
};

