import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components
import api from "config/axios";
import TableDropdown from "components/Dropdowns/StoreTableDropdown.js";
import { Alert, Button, Space, Switch, Result, Modal } from "antd";
import { toast } from "react-toastify";


export default function StoresCardTable({ color }) {
  const [stores, setStores] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeStore, setActiveStore] = useState('');
  const fetchData = async () => {
    try {
      const response = await api.get("api/v1/store");
      setStores(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = async () => {
    try {
      let response;
      if (activeStore.status === 'ACTIVE') {
        response = await api.put(`/${activeStore.id}/blocked-store`);
        toast.success('Block store successfully !');
      } else {
        response = await api.put(`/${activeStore.id}/active-store`);
        toast.success('Active store successfully !');
      }
      console.log(response);
      fetchData();
    } catch (error) {
      if (activeStore.status === 'ACTIVE') {
        toast.error('Blocke store failed !');
        console.error(error);
      } else {
        toast.error('Store does not meet the requirement to active !');
        console.error(error);
      }
    } setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {


    fetchData();
  }, []);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-black"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg text-black"
                }
              >
                Stores
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Stores table */}
          <table className="items-center w-full bg-white border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"

                  }
                >
                  Store ID
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                  }
                >
                  Address
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                  }
                >
                  Phone Number
                </th>


                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                  }
                >
                  Rate
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                  }
                >
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {store.coverPhoto ? (
                      <img
                        src={store.coverPhoto}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="Avatar"
                      ></img>
                    ) : (
                      <img
                        src='https://images.unsplash.com/photo-1665912014038-8c78434db1ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="Default Avatar"
                      ></img>
                    )}

                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                      {store.id}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                      {store.name}
                    </span>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >{store.address}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                      {store.phoneNumber}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >{store.rate.toFixed(1)} <i className="fas fa-star text-yellow-500"></i>
                    </span>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className={`fas fa-circle text-${store.status === 'ACTIVE' ? 'green' : 'red'}-500 mr-2`}></i>
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                      <Switch checked={store.status === 'ACTIVE'} onChange={async (value) => {

                        console.log(value);
                        if (!value) {

                          try {
                            setActiveStore(store);
                            setVisible(true);
                            fetchData();
                            console.log(activeStore);
                          } catch (error) {
                            console.error(error);
                            toast.error('Deactive store failed !');
                          }
                        }
                        else {
                          try {
                            setActiveStore(store);
                            setVisible(true);
                            fetchData();
                            console.log(activeStore);
                          } catch (error) {
                            console.error(error);
                            toast.error('This store not meet the requirement to be activated !');
                          }
                        }
                      }} />
                    </span>

                  </td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
      {console.log('state:' + activeStore.status)}
      {(() => {
        console.log(activeStore.status);
        if (activeStore.status === 'ACTIVE') {
          return <Modal
            title={`Are you sure to deactive this store ?`}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          />

        } else {
          return <Modal
            title={`Are you sure to active this store ?`}
            subTitle="Store must have at least 2 service to be activated"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >Store must have at least 2 service to be activated !</Modal>

        }
      })()
      }
    </>
  );
}

StoresCardTable.defaultProps = {
  color: "light",
};

StoresCardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

