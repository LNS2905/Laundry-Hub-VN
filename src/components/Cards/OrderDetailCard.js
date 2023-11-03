import React, { useEffect, useState } from "react";
import { Badge, Button, Descriptions, Steps  } from "antd";
import ProgressBar from "./ProgressBar.js";
import api from "config/axios.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import { formatVND } from "utils/currencyUtils.js";








const App = ({ color = "light" }) => {
  const [Orders, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  const params = useParams();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/v1/order/${params.id}`);
        setOrder(response.data.data);
        console.log(response.data.data.orderDetail[0].price);
        setItems([
          {
            key: "1",
            label: "Service Name",
            children: response.data.data.orderDetail[0].service.name,
          },
          {
            key: "2",
            label: "Order Status",
            children: response.data.data.orderStatus,
          },          
          {
            key: "3",
            label: "Order time",
            children: response.data.data.dayCreateOrder,
          },
          // {
          //   key: "5",
          //   label: "Usage Time",
          //   children: "2019-04-24 18:00:00",
          //   span: 2,
          // },
          {
            key: "4",
            label: "Status",
            children: <ProgressBar />,
            span: 3,
          },
          {
            key: "5",
            label: "Default Services",
            children: formatVND(response.data.data.orderDetail[0].price)
          },
          {
            key: "6",
            label: "Optional Services",
            children:  formatVND(response.data.data.totalPrice - response.data.data.orderDetail[0].price)
          },
          {
            key: "7",
            label: "Official Receipts",
            children: formatVND(response.data.data.totalPrice)
          },
          {
            key: "8",
            label: "Config Info",
            children: (
              <>
                Services: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
                <br />
              </>
            ),
          },
        ])
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      <Descriptions className="px-6 py-6" title="Order Detail" bordered items={items} />

    </div>
  );
};
export default App;
