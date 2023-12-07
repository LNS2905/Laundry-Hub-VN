import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

// components

import ServicesDropdown from "components/Dropdowns/ServicesDropdown.js";
import api from "config/axios";
import { Button, Tag, Modal, Switch } from "antd";
import CreateService from "./CreateService";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify";
export default function ServicesPage({ color }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [render, setRender] = useState(0);
  const [options, setOptions] = useState();

  const fetchData = async () => {
    const res = await api.get("/api/v1/service")
    const optionsID = services.options;
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
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-black"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 justify-between">
              <h3
                className={
                  "font-semibold text-lg text-black"
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
                    <CreateService submit={submit} setSubmit={setSubmit} handleCancel={handleCancel} render={render} setRender={setRender} />
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
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Services ID
                </th>
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Services Name
                </th>
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Description
                </th>
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Image
                </th>
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >options</th>
                <th className={
                  "px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                ></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {service.id}
                    </span>
                  </th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.name}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.description}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img src={service.figure} width={100} style={{
                      borderRadius: 10
                    }} />
                  </td>
                  <td style={{
                    minWidth: 300, display: 'inline-flex'
                  }} className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {service.options.map((option) => {
                      console.log(option.id);
                      return <Tag style={{ display: "flex", gap: 10, alignItems: "center", width: 'fit-content' }} key={option.id} color="blue">{option.name}
                        <Switch checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          size="small" checked={option.status == 'ACTIVE'} onChange={async (value) => {
                            console.log(value);
                            if (!value) {
                              try {
                                const response = await api.put(`api/v1/option/deactivate-option/${option.id}`);
                                console.log(response);
                                fetchData();

                                toast.success("Deactive options successfully!");

                                window.location.reload();
                              } catch (error) {
                                console.error(error);
                              }
                            }
                            else {
                              try {
                                const response = await api.put(`api/v1/option/active-option/${option.id}`);
                                console.log(response);
                                fetchData();
                                toast.success("Active options successfully!");
                                window.location.reload();
                              } catch (error) {
                                console.error(error);
                              }

                            }
                          }
                          } />
                      </Tag>
                    })}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <Switch defaultChecked={service.status === 'ACTIVE'} onChange={async (value) => {
                      console.log(value);
                      if (!value) {
                        try {
                          const response = await api.put(`api/v1/service/deactive-service/${service.id}`);
                          console.log(response);
                          fetchData();
                          toast.success("Deactive successfully!");
                        } catch (error) {
                          console.error(error);
                          fetchData();
                          toast.error("Deactive fail!");
                        }
                      }
                      else {
                        try {
                          const response = await api.put(`api/v1/service/active-service/${service.id}`);
                          console.log(response);
                          fetchData();
                          toast.success("Active successfully!");
                        } catch (error) {
                          console.error(error);
                          fetchData();
                          toast.error("Active fail!");
                        }

                      }
                    }} />
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

