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
    const [filterOrder, setFilterOrder] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("api/v1/order/admin-using");
                setAllOrder(response.data.data);
                setFilterOrder(response.data.data);
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
            const otherOrders = allorder.filter((order) => order.orderStatus !== "DONE");
            setFilterOrder(sortOrders(otherOrders));
        } else if (value === "done") {
            const doneOrders = allorder.filter((order) => order.orderStatus === "DONE");
            // const otherOrders = allorder.filter((order) => order.orderStatus !== "DONE");
            setFilterOrder([...doneOrders]);
        } else {
            setFilterOrder([...allorder]);
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
                            <div className="flex flex-row font-semibold text-lg text-black" style={{ justifyContent: 'space-between' } }>
                                <h3
                                    className={
                                        "font-semibold text-lg text-black"
                                    }
                                >
                                    All Orders
                                </h3>
                                <Select defaultValue={'all'} onChange={handleSelectChange}>
                                    <Select.Option value="all">ALL</Select.Option>
                                    <Select.Option value="other">Other</Select.Option>
                                    <Select.Option value="done">Done</Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Orders table */}
                    <table className="items-center w-full bg-white border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                >
                                    Customer
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                >
                                    Store
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                >
                                    Expected Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                >
                                    Actual Price
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                >
                                    Order Status
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
                                    Order Date
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap bg-lightBlue-600 font-semibold text-left text-white"
                                    }
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterOrder.map((allorder) => (
                                <tr key={allorder.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >
                                            {allorder.customerName}
                                        </span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >{allorder.storeName}
                                        </span>

                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >
                                            {formatVND(allorder.totalPriceOfCus)}  ({allorder.numberOfHeightCus} Kg)
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >
                                            {formatVND(allorder.totalPrice)} ({allorder.numberOfHeightSto == 0 ? allorder.numberOfHeightCus : allorder.numberOfHeightSto} Kg)
                                        </span>
                                    </td>

                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >
                                            {allorder.orderStatus}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >{allorder.rate}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            className={
                                                "ml-3 font-bold text-black"
                                            }
                                        >
                                            {new Date(allorder.dayCreateOrder).toLocaleDateString()}
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

AllOrderCard.defaultProps = {
    color: "light",
};

AllOrderCard.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};



