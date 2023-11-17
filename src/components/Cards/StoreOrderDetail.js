import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Descriptions, Form, Input, Modal, Row, Steps } from "antd";
import api from "config/axios.js";
import { useParams } from "react-router-dom";
import { formatVND } from "utils/currencyUtils.js";
import { toast } from "react-toastify";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form.js";
import uploadVideo from "utils/uploadImage";
import formatDate from "utils/daytimeutils";


const App = ({ color = "light" }) => {
    const [Orders, setOrder] = useState({});
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const [file, setFile] = useState('https://free-icon-rainbow.com/i/icon_01993/icon_019930_256.jpg');
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        form.submit();

    };
    const onFinish = async (values) => {
        console.log(values);
        const response = await api.put(`api/v1/order/${Orders.id}/update-number-of-height?numberOfHeight=${values.numberOfHeight}`);
        const response2 = await api.put(`/api/v1/order/${Orders.id}/update-status?status=RECEIVE`)

        toast.success("Receive successfully!");
        fetchData();
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                        let isWait = false
                        const steps = items.map((item, index) => {
                            if (item.title === status && status === "DONE") {
                                isProcess = true;
                                item.status = "finish";

                            }
                            else if (item.title === status) {
                                isProcess = true;
                                item.status = "finish";
                            }
                            else {
                                if (isProcess) {
                                    item.status = "wait";
                                    if (!isWait) {
                                        item.icon = <LoadingOutlined />
                                        isWait = true;
                                    }
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
                    children: formatDate(response.data.data.dayCreateOrder, 'dd/MM/yyyy'),
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
                    label: "Description",
                    children: (

                        response.data.data.description

                    ),
                },
                {
                    key: "9",
                    label: "Feedback",
                    children: response.data.data.feedback
                },
                {
                    key: "10",
                    label: "Rating",
                    children: response.data.data.rate
                }

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
                        const response = await api.put(`/api/v1/order/${Orders.id}/update-status?status=STORE_APPROVE`)
                        toast.success("Approve successfully!");
                        fetchData()
                    }}>Approve</Button></Col>
                <Button style={{
                    width: 100,
                    backgroundColor: "red",
                }} type="primary" onClick={async () => {
                    const response = await api.put(`/api/v1/order/${Orders.id}/update-status?status=STORE_REJECT`)

                    toast.success("Reject successfully!");
                    fetchData()
                }}>Reject</Button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name={`feedback`} label={`Feedback`}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
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
                        showModal();

                        // const setNumberOfHeightSto = await api.put(`api/v1/order/${Orders.id}/update-number-of-height?numberOfHeightSto=${numberOfHeight}`);
                        // toast.success("Receive successfully!");
                        // fetchData()
                    }}>Receive</Button></Col>

                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item rule={
                            [
                                {
                                    required: true,
                                    message: "Please input number of height store!"
                                }
                            ]
                        } label="Number of Height Store" name="numberOfHeight" >
                            <Input />
                        </Form.Item>
                        {/*<Form.Item
                            name="avatar"
                            label="Avatar"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                           <input type="file" onChange={async (e) => {
                                const file = e.target.files[0];
                                const url = await uploadVideo(file);
                                setFile(url)
                                console.log(url);
                            }} />
                        </Form.Item>*/}
                    </Form>
                </Modal>
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
                        const response = await api.put(`/api/v1/order/${Orders.id}/update-status?status=PROCESSING`)
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
                        const response = await api.put(`/api/v1/order/${Orders.id}/update-status?status=DELIVERED`)
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
                        const response = await api.put(`/api/v1/order/${Orders.id}/update-status?status=DONE`)
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
