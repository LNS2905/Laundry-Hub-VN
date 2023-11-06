import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Descriptions, Form, Input, Modal, Row, Steps } from "antd";
import ProgressBar from "./ProgressBar.js";
import api from "config/axios.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import { formatVND } from "utils/currencyUtils.js";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form.js";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import formatDate from "utils/daytimeutils.js";






const App = ({ color = "light" }) => {
  const [Orders, setOrder] = useState({});
  const [status, setStatus] = useState([]);
  const [items, setItems] = useState([]);
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    form.submit();

  };
  const onFinish = async (values) => {
    console.log(values);
    // const response = await api.put(`api/v1/order/${Orders.id}/rate-order?rate=${values.rate}`);
    toast.success("Rate successfully!");
    fetchData();
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/v1/order/view-by-customer/${params.id}`);
      setOrder(response.data.data);
      setStatus(response.data.data.orderStatus);
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
          children: formatDate(response.data.data.dayCreateOrder, 'dd/MM/yyyy'),
          
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
          children: formatVND(response.data.data.totalPrice - response.data.data.orderDetail[0].price)
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



  console.log(status);
  const generateButton = () => {
    console.log(Orders.rate);
    if (status === "DONE" && Orders.rate === 0) {
      return <Row gutter={12} justify={"end"} style={{
        marginRight: 30,
        paddingBottom: 20
      }}>
        <Col>
          <Button style={{
            width: 100
          }} type="primary" onClick={async () => {
            showModal();
            fetchData()
          }}>Rate</Button></Col>
        <Modal title="Rate order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} onFinish={onFinish}>
              <Form.Item name={`rate`} label={`Rate`}>
                <Rate defaultValue={5} character={({ index }) => customIcons[index + 1]} />
              </Form.Item>
          </Form>
        </Modal>
      </Row >
    }
  }

  useEffect(() => {
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
      {generateButton()}
    </div>
  );
};
export default App;
