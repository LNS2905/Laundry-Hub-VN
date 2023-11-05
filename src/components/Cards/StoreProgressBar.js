import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import api from "config/axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const Step = () => {
  const params = useParams();
  const [items, setItems] = useState([
    {
      title: "CREATE_ORDER",
    },
    {
      title: "STORE_REJECT",
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
              icon: <LoadingOutlined />,
            },
          ])
        } else {
          let isProcess = false;
          const steps = items.map((item, index) => {
            if (item.title === status) {
              isProcess = true;
              item.status = "process";
              item.icon = <LoadingOutlined />
            } else {
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
  }, []);

  return (
    <Steps
      size="small"
      current={0}
      items={items}
    />
  );
};

export default Step;
