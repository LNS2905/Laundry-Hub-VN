import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


// components
import TableDropdown from "components/Dropdowns/AdminTableDropdown.js";
import api from "config/axios";

export default function CustomersCardTable({ color }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/v1/customer/admin-function/all-customer");
        setCustomers(response.data.data);
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
                Customers
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Customers table */}

          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"                   
                }
                >
                  Customer ID
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"                   
                }
                >
                  Name
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"                   
                }
                >
                  Phone
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"                   
                }
                > 
                  Address
                </th>

                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"                   
                }
                ></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {customer.coverPhoto ? (
                      <img
                        src={customer.coverPhoto}
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
                    <span
                      className={
                        "ml-3 font-bold text-black"
                      }
                    >
                      {customer.id}
                    </span>
                  </th>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "><span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {customer.name}
                  </span></td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {customer.phoneNumber}
                  </span></td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {customer.address}
                  </span></td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      </div >
    </>
  );
}

CustomersCardTable.defaultProps = {
  color: "light",
};

CustomersCardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
