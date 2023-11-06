  import React, { useEffect, useState } from "react";
  import PropTypes from "prop-types";

  // components
  import api from "config/axios";
  import TableDropdown from "components/Dropdowns/StoreTableDropdown.js";
  import { Switch } from "antd";


  export default function StoresCardTable({ color }) {
    const [stores, setStores] = useState([]);

    const fetchData = async () => {
      try {
        const response = await api.get("api/v1/store");
        setStores(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
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
                          src='https://images.unsplash.com/photo-1604335398941-8d7108a9e8e9?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                      <Switch defaultChecked={store.status === 'ACTIVE'} onChange={async (value) => {
                        console.log(value);
                        if (!value) {
                          try {
                            const response = await api.put(`/${store.id}/deactive-store`);
                            console.log(response);
                            fetchData();
                          } catch (error) {
                            console.error(error);
                          }
                        }
                        else {
                          try {
                            const response = await api.put(`/${store.id}/active-store`);
                            console.log(response);
                            fetchData();
                          } catch (error) {
                            console.error(error);
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
      </>
    );
  }

  StoresCardTable.defaultProps = {
    color: "light",
  };

  StoresCardTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
  };

