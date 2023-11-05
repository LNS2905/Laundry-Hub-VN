import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Descriptions, Row, Steps } from "antd";
import ProgressBar from "./ProgressBar.js";
import api from "config/axios.js";
import { useParams } from "react-router-dom";
import { formatVND } from "utils/currencyUtils.js";
import StoreProgressBar from "./StoreProgressBar.js";
import { toast } from "react-toastify";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const App = ({ color = "light" }) => {
    const [Orders, setOrder] = useState({});
    const [items, setItems] = useState([]);
    const params = useParams();
    const Step = () => {
        const params = useParams();
        const [items, setItems] = useState([
            {
                title: "CREATE_ORDER",
            },
            {
                title: "STORE_APPROVE",
            },
            {
                title: "RECEIVE",
            },
            {
                title: "PROCESSING",
            },
            {
                title: "DELIVERED",
            },
            {
                title: "DONE",
            }
        ]);
        

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`api/v1/order/all-order-in-store/${params.id}`);
                    const status = response.data.data.orderStatus;
                    console.log(status);
                    if (status === 'STORE_REJECT') {
                        setItems([
                            {
                                title: "CREATE_ORDER",
                                status: "finish",
                            },
                            {
                                title: "STORE_REJECT",
                                status: "error",
                                
                            },
                        ])
                    }
                     else {
                        let isProcess = false;
                        const steps = items.map((item, index) => {
                            if (item.title === status && status === "DONE") {
                                isProcess = true;
                                item.status = "finish";

                            }
                           else if (item.title === status) {
                                isProcess = true;
                                item.status = "process";
                                item.icon = <LoadingOutlined />
                            } 
                             else {
                                if (isProcess) {
                                    item.status = "wait";
                                } else {
                                    item.status = "finish";
                                }
                            }
                            return {
                                ...item,
                            }
                        })

                        console.log(steps);

                        setItems(steps)
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }, [Orders]);

        return (
            <Steps
                size="small"
                current={0}
                items={items}
            />
        );
    };


    const fetchData = async () => {
        try {
            const response = await api.get(`/api/v1/order/all-order-in-store/${params.id}`);
            setOrder(response.data.data);
            console.log(response.data.totalPrice);
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
                {
                    key: "4",
                    label: "Status",
                    children: <Step />,
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

    const generateButton = () => {
        if (Orders.orderStatus === "CREATE_ORDER") {
            return <Row gutter={12} justify={"end"} style={{
                marginRight: 30,
                paddingBottom: 20
            }}>
                <Col>
                    <Button style={{
                        width: 100
                    }} type="primary" onClick={async () => {
                        const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=STORE_APPROVE`)
                        toast.success("Approve successfully!");
                        fetchData()
                    }}>Approve</Button></Col>
                <Button style={{
                    width: 100,
                    backgroundColor: "red",
                }} type="primary" onClick={async () => {
                    const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=STORE_REJECT`)
                    toast.success("Reject successfully!");
                    fetchData()
                }}>Reject</Button>
            </Row >
        }

        else if (Orders.orderStatus === "STORE_APPROVE") {
            return <Row gutter={12} justify={"end"} style={{
                marginRight: 30,
                paddingBottom: 20
            }}>
                <Col>
                    <Button style={{
                        width: 100
                    }} type="primary" onClick={async () => {
                        const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=RECEIVE`)
                        toast.success("Receive successfully!");
                        fetchData()
                    }}>Receive</Button></Col>

            </Row>
        } else if (Orders.orderStatus === "RECEIVE") {
            return <Row gutter={12} justify={"end"} style={{
                marginRight: 30,
                paddingBottom: 20
            }}>
                <Col>
                    <Button style={{
                        width: 100
                    }} type="primary" onClick={async () => {
                        const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=PROCESSING`)
                        toast.success("Processing!");
                        fetchData()
                    }}>Processing</Button></Col>

            </Row>
        } else if (Orders.orderStatus === "PROCESSING") {
            return <Row gutter={12} justify={"end"} style={{
                marginRight: 30,
                paddingBottom: 20
            }}>
                <Col>
                    <Button style={{
                        width: 100
                    }} type="primary" onClick={async () => {
                        const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=DELIVERED`)
                        toast.success("Delivered!");
                        fetchData()
                    }}>Delivered</Button></Col>

            </Row>
        } else if (Orders.orderStatus === "DELIVERED") {
            return <Row gutter={12} justify={"end"} style={{
                marginRight: 30,
                paddingBottom: 20
            }}>
                <Col>
                    <Button style={{
                        width: 100
                    }} type="primary" onClick={async () => {
                        const response = await api.patch(`/api/v1/order/${Orders.id}/update-status?status=DONE`)
                        toast.success("Done!");
                        fetchData()
                    }}>Done</Button></Col>

            </Row>
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
