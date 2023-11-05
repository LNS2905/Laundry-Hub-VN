import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components
import api from "config/axios";
import TableDropdown from "components/Dropdowns/StoreTableDropdown.js";
import { Switch } from "antd";


export default function StoresCardTable({ color }) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/v1/store");
        setStores(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Store ID
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Address
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Phone Number
                </th>


                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                  }
                >
                  Rate
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-black border-blueGray-100"
                }>
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={store.coverPhoto}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
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
                    <i className={`fas fa-circle text-${store.status === 'ACTIVE' ? 'green' : 'red'}-500 mr-2`}></i>
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                    <Switch defaultChecked={store.status === 'ACTIVE'} onChange={async (value)=>{
                        console.log(value);
                        if(!value){
                          try {
                            const response = await api.put(`/${store.id}/deactive-store`);
                            console.log(response);
                          } catch (error) {
                            console.error(error);
                          }
                        }
                    }} />
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
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-right">
                    <TableDropdown />
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

