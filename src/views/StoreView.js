/*eslint-disable*/
import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Steps } from 'antd';
import ProductNavbar from "components/Navbars/ProductNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


export default function Index() {

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
            dataSource={data}
            
            renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText text="/5" icon={StarOutlined} key="list-vertical-star-o" />
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
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />

            </main>
            <FooterAdmin   />
        </>
    );
}
