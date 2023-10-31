/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Modal, Radio, Space, Steps, Card, Row, Col, Rate } from 'antd';
const { Meta } = Card;
import ProductNavbar from "components/Navbars/ProductNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import api from "config/axios";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { formatVND } from "utils/currencyUtils";
import { toast } from "react-toastify";


export default function Index() {

  const [store, setStore] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(0);
  const [services, setServices] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [form] = Form.useForm();
  const [key, setKey] = useState('');



  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(values.address);
    // try {
    //   const res = await api.post("/api/v1/order", values);
    //   localStorage.setItem("order", JSON.stringify(res.data.data));
    //   console.log(res.data.data.token);   
    // } catch (e) {
    //   // console.log(e.response);
    //   toast.error(e.response.data);
    // }
  };


  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const account = JSON.parse(localStorage.getItem('account'));
  console.log(account);

  const fetch = async () => {
    const stores = await api.get(`/api/v1/store`);
    console.log(stores.data.data);
    setStore(stores.data.data);
  }

  const handleOk = () => {
    // setShow(false);
    form.submit();
  };

  const handleCancel = () => {
    setCurrentStoreId(null);
    setCurrentStore(null);

  };

  useEffect(fetch, [])

  const fetchService = async () => {
    const services = await api.get(`/api/v1/service/${currentStoreId}`);
    setServices(services.data.data);
  }

  useEffect(() => {
    if (currentStoreId) {
      fetchService();
    }
  }, [currentStoreId])

  const data = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const mapToHtml = (store) => {
    console.log(store);
    return <Col span={6}>
      <Card
        hoverable

        actions={[
          account.role === 'CUSTOMER' ? (
            <Button type="primary" onClick={() => {
              setCurrentStoreId(store.id)
              setCurrentStore(store)
            }}>Create Order</Button>
          ) : null
        ]}

        cover={<img onError={(e) => {
          e.target.src = 'https://i.ytimg.com/vi/fR73eqKHmu4/maxresdefault.jpg'
        }} alt="example" src={store.coverPhoto ? store.coverPhoto : 'https://i.ytimg.com/vi/fR73eqKHmu4/maxresdefault.jpg'} />}
      >
        <Meta title={store.name} description={store.address} />
        <Meta description={store.description + ' - ' + store.phoneNumber} />
        <Rate style={{ marginTop: 20 }} disabled defaultValue={store.rate} character={({ index }) => customIcons[index + 1]} />



      </Card>
    </Col>

  }
  const onInput = (i) => { setKey(i.target.value); }
  return (
    <>
      <ProductNavbar transparent color="blue" />
      <main >
        <Input onInput={onInput}
          placeholder="Type to search"
          style={{ width: '50%', margin: '20px auto', display: 'block' }} />
        <Row gutter={12} style={{ padding: 30 }}>
          {store.filter(item => item.name.toLowerCase().includes(key.toLowerCase())).map(mapToHtml)}
        </Row>
      </main>
      <FooterAdmin />


      <Modal title={currentStore?.name + ' - ' + currentStore?.address} open={currentStoreId} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>

          <Form.Item initialValue={account?.customer?.address} name='address' label="Address" labelCol={{
            span: 24,
          }}
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={account?.customer?.phoneNumber} name='phone' label="Phone" labelCol={{
            span: 24,
          }}
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={''}>
            <Radio.Group>
              {
                services.map(item => {
                  if (item.title === 'WASH') {
                    return <Form.Item initialValue={item.filter(item => item.defaultValue)[0]
                      ? item.filter(item => item.defaultValue)[0]?.id
                      : item[0]?.id}
                      name={item.id} label={item.name} labelCol={{ span: 24 }}>
                      {item.name}
                      </Form.Item>
                  }
                })
              }
            </Radio.Group>
          </Form.Item>

          {
            services.map(item => {
              if (item.title === 'OPTION') {
                return <Form.Item initialValue={item.options.filter(item => item.defaultValue == true)[0]
                  ? item.options.filter(item => item.defaultValue)[0]?.id
                  : item.options[0]?.id}
                  name={item.id} label={item.name} labelCol={{ span: 24 }}>
                  <Radio.Group>
                    {item.options.map((option) => {
                      console.log(option);
                      return <Radio value={option.id} checked={true}>{option.name} ({option.price})</Radio>
                    })}
                  </Radio.Group>
                </Form.Item>
              }
            })
          }


        </Form>

      </Modal>
    </>
  );
}
