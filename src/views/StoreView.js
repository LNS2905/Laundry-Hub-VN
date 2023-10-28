/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Modal, Radio, Space, Steps } from 'antd';
import ProductNavbar from "components/Navbars/ProductNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import api from "config/axios";


export default function Index() {

  const [store, setStore] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(0);
  const [services, setServices] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);

  const fetch = async () => {
    const stores = await api.get(`/api/v1/store`);
    console.log(stores.data.data);
    setStore(stores.data.data);
  }

  const handleOk = () => {
    // setShow(false);
  };

  const handleCancel = () => {
    setCurrentStoreId(null);
    setCurrentStore(null);
    
  };

  useEffect(()=>{
    fetch();
  }, [])

  const fetchService = async () => {
    const services = await api.get(`/api/v1/service/${currentStoreId}`);
    setServices(services.data.data);
  }

  useEffect(()=>{
    if(currentStoreId){
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

    return (
        <>
            <ProductNavbar transparent color="blue" />
            <main >
            
            <List
            
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={store}
            
            renderItem={(item) => (
                <List.Item
                  key={item.name}
                  actions={[
                    <Button type="primary" onClick={()=>{
                      setCurrentStoreId(item.id)
                      setCurrentStore(item)
                    }}>Create Order</Button>
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={item.address}
                  />
                </List.Item>
              )}
            />

            </main>
            <FooterAdmin   />
            <Modal title={currentStore?.name+ ' - ' + currentStore?.address} open={currentStoreId} onOk={handleOk} onCancel={handleCancel}>
              {
                services.map((item) => {
                  return <div style={{margin: '10px 0'}}>
                    <h1>{item.name}</h1>
                    <Radio.Group>
                    {item.options.map((option)=>{
                      return <Radio value={option.id}>{option.name}</Radio>
                    })}
                    </Radio.Group>
                  </div>
                })
              }
            </Modal>
        </>
    );
}
