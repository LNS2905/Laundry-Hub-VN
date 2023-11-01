import { Button, Checkbox, Col, Form, Input, Radio, Row, Space } from "antd";
import api from "config/axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// components

export default function CardSettings({ submit, setSubmit, handleCancel, render, setRender }) {

    const [title, setTitle] = React.useState('WASH');
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const data = title === 'WASH' ? {
            name: values.name,
            description: values.description,
            title: values.title,
            figure: 'https://media.cnn.com/api/v1/images/stellar/prod/210915133905-how-to-do-laundry-lead.jpg?q=w_1601,h_901,x_0,y_0,c_fill',
            options: [
                {
                    name: 'Dưới 5 kg',
                    price: values.option1
                },
                {
                    name: '5 - 7 kg',
                    price: values.option2
                },
                {
                    name: 'Trên 7 kg',
                    price: values.option3
                }
            ]
        } : {
            ...values,
            figure: 'https://media.cnn.com/api/v1/images/stellar/prod/210915133905-how-to-do-laundry-lead.jpg?q=w_1601,h_901,x_0,y_0,c_fill',
            options: values.options.map(option => {
                return {
                    ...option,
                    defaultValue: option.defaultValue?.length > 0
                }
            })
        }

        const response = await api.post('/api/v1/service', data);
        form.resetFields();
        setSubmit(false);
        handleCancel();
        toast.success(response.data.message);
        setRender(render + 1);
    }

    useEffect(() => {
        console.log(submit);
        if (submit) {
            form.submit();
        }
    }, [submit])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Create Service</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Form form={form} onFinish={onFinish} onFieldsChange={() => {
                        setSubmit(false);
                    }}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Service Information
                        </h6>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    initialValue={'WASH'}
                                    labelCol={{ span: 24 }}
                                    label="Type "
                                    name="title"
                                    rules={[{ required: true, message: 'Please select a title!' }]}
                                >
                                    <Radio.Group size="large" onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}>
                                        <Radio value="WASH">Default Service</Radio>
                                        <Radio value="OPTION">Optional Service</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Service Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input service name!' }]}
                                >
                                    <Input placeholder={title === 'WASH' ? 'Normal Wash, Quick Wash,...' : 'Wash with Thai fabric softener, Wash with Omo,...'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input about service!' }]}
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>

                        {
                            title === 'WASH' ?
                                <>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label="Dưới 5 kg"
                                                name="option1"
                                                rules={[{ required: true, message: 'Please input about service!' }]}
                                            >
                                                <Input type="number" min={0} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col span={24}>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label="5 - 7 kg"
                                                name="option2"
                                                rules={[{ required: true, message: 'Please input about service!' }]}
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col span={24}>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label="Trên 7 kg"
                                                name="option3"
                                                rules={[{ required: true, message: 'Please input about service!' }]}
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </> : <>
                                    <Form.List name="options">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Row style={{
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }} gutter={12}>
                                                        <Col span={18}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'name']}
                                                                label="Option name"
                                                                labelCol={{ span: 24 }}
                                                                rules={[{ required: true, message: 'Missing option name' }]}
                                                            >
                                                                <Input placeholder="Option" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'price']}
                                                                label="Option price"
                                                                labelCol={{ span: 24 }}
                                                                rules={[{ required: true, message: 'Missing option name' }]}
                                                            >
                                                                <Input type="number" placeholder="Price" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Row style={{
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-end'
                                                            }}>
                                                                <Col span={8}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'defaultValue']}
                                                                    >
                                                                        <Checkbox.Group>
                                                                            <Checkbox value="customer"></Checkbox>
                                                                        </Checkbox.Group>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={16}><Button type="primary" danger onClick={() => remove(name)}>Remove</Button></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add options
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </>
                        }
                    </Form>
                </div>
            </div>
        </>
    );
}
