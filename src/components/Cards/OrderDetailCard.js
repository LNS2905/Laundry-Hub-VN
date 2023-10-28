import React from "react";
import { Badge, Button, Descriptions } from "antd";
import ProgressBar from "./ProgressBar.js";

const items = [
  {
    key: "1",
    label: "Service Name",
    children: "Clean Dryer",
  },
  {
    key: "2",
    label: "Payment Method",
    children: "COD",
  },
  // {
  //   key: "3",
  //   label: "Automatic Renewal",
  //   children: "YES",
  // },
  {
    key: "3",
    label: "Order time",
    children: "2018-04-24 18:00:00",
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
    label: "Services Amount",
    children: "$80.00",
  },
  {
    key: "6",
    label: "Optional Services",
    children: "$20.00",
  },
  {
    key: "7",
    label: "Official Receipts",
    children: "$100.00",
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
];
const App = ({ color = "light" }) => {
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
