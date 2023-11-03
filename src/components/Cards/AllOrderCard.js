import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

// components

import TableDropdown from "components/Dropdowns/CustomerTableDropdown.js";
import api from "config/axios";
import { formatVND } from "utils/currencyUtils";
import { Select } from "antd";


export default function AllOrderCard({ color }) {
    const [allorder, setAllOrder] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("api/v1/order/admin-using");
                setAllOrder(response.data.data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const sortOrders = (allorder) => {
        const sortedOrders = [...allorder];
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
            setAllOrder(sortOrders(allorder));
        } else if (value === "done") {
            const doneOrders = allorder.filter((order) => order.orderStatus === "DONE");
            const otherOrders = allorder.filter((order) => order.orderStatus !== "DONE");
            setAllOrder([...doneOrders, ...otherOrders]);
        }
    };

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
                        <div className="relative w-full px-4 flex-grow flex-1">
                            <div className="flex flex-row ">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
                                    }
                                >
                                    All Orders
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
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Customer
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Store
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Expected Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Actual Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Order Status
                                </th>

                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Rate
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Order Date
                                </th>
                                <th className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                }></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allorder.map((allorder) => (
                                <tr key={allorder.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {allorder.customerName}
                                        </span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >{allorder.storeName}
                                        </span>

                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {formatVND(allorder.totalPriceOfCus)}  ({allorder.numberOfHeightCus} Kg)
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {formatVND(allorder.totalPrice)} ({allorder.numberOfHeightSto == 0 ? allorder.numberOfHeightCus : allorder.numberOfHeightSto} Kg)
                                        </span>
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {allorder.orderStatus}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >{allorder.rate}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold " +
                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                        >
                                            {new Date(allorder.dayCreateOrder).toLocaleDateString()}
                                        </span>
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-right">
                                        <TableDropdown id={allorder.id} />
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

AllOrderCard.defaultProps = {
    color: "light",
};

AllOrderCard.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};



