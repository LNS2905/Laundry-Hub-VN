import { Col, Form, Input, Radio, Row } from "antd";
import React from "react";

// components

export default function CardSettings() {

    const [title, setTitle] = React.useState('WASH');

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Create Service</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Form>
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
                                    <Radio.Group size="large" onChange={(e)=>{
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
                                    <Input placeholder={title==='WASH'?'Normal Wash, Quick Wash,...':'Wash with Thai fabric softener, Wash with Omo,...'}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                labelCol={{ span: 24 }}
                                    label="Description"
                                    name="aboutService"
                                    rules={[{ required: true, message: 'Please input about service!' }]}
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    );
}
