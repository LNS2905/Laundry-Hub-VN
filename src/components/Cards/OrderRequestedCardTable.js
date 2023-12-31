import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


// components

import TableDropdown from "components/Dropdowns/StoreTableDropdown.js";
import api from "config/axios";
import { formatVND } from "utils/currencyUtils";
import { Select } from "antd";

export default function OrderRequestedCardTable({ color }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const account = JSON.parse(localStorage.getItem("account"));

      try {
        const response = await api.get(`api/v1/order/all-order-in-store`);
        setOrders(response.data.data);
        console.log(orders.customerNumber);
        console.log(orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const sortOrders = (orders) => {
    const sortedOrders = [...orders];
    sortedOrders.sort((a, b) => {
      if (a.orderStatus === "DONE" && b.orderStatus !== "DONE") {
        return 1;
      } else if (a.orderStatus !== "DONE" && b.orderStatus === "DONE") {
        return -1;
      } else {
        return 0;
      }
    });
    return sortedOrders;
  };

  const handleSelectChange = (value) => {
    if (value === "other") {
      setOrders(sortOrders(orders));
    } else if (value === "done") {
      const doneOrders = orders.filter((order) => order.orderStatus === "DONE");
      const otherOrders = orders.filter((order) => order.orderStatus !== "DONE");
      setOrders([...doneOrders, ...otherOrders]);
    }
  };

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
              <div className="flex flex-row font-semibold text-lg text-black" style={{ justifyContent: 'space-between' }}>
                <h3
                  className={
                    "font-semibold text-lg text-black"
                  }
                >
                  Orders Requested
                </h3>
                <Select defaultValue={'done'} onChange={handleSelectChange}>
                  <Select.Option value="done">Done</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Orders table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Order ID
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Customer Name
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Customer Number
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Customer Address
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Order Status
                </th>

                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Actual Weight
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Actual Price
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Order Date
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                >
                  Rating
                </th>
                <th className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                }
                ></th>


              </tr>
            </thead>

            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold text-black"
                        }
                      >
                        {order.id}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.customerName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.customerNumber}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.address}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.orderStatus}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.numberOfHeightSto} Kg
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {formatVND(order.totalPrice)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {new Date(order.dayCreateOrder).toLocaleDateString()}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.rate}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-right">
                      <TableDropdown id={order.id} />
                    </td>
                  </tr>

                ))

              ) : (
                <tr>
                  <td colSpan="5">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
}

OrderRequestedCardTable.defaultProps = {
  color: "light",
};

OrderRequestedCardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

