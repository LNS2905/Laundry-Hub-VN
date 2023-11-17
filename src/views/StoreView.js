/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  Modal,
  Radio,
  Space,
  Steps,
  Card,
  Row,
  Col,
  Rate,
  InputNumber,
} from "antd";
const { Meta } = Card;
import ProductNavbar from "components/Navbars/ProductNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import api from "config/axios";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { formatVND } from "utils/currencyUtils";
import { toast } from "react-toastify";
import { Link } from "@material-ui/core";

export default function Index() {
  const [store, setStore] = useState([]);
  const [currentStoreId, setCurrentStoreId] = useState(0);
  const [services, setServices] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [form] = Form.useForm();
  const [key, setKey] = useState("");
  const [total, setTotal] = useState(0);

  const onFinish = async (values) => {
    try {
      console.log(values);
      const option = [];

      option.push(services.filter((item) => item.id === values.washType)[0].options[0].id);
      for (const key in values) {
        if (key.startsWith("option-")) {
          option.push(values[key]);
        }
      }
      const data = {
        address: values.address,
        numberOfCustomer: values.numberOfCustomer,
        numberOfHeightCus: Number(values.numberOfHeightCus),
        optionIds: option,
      };

      const response = await api.post(`/api/v1/order`, data);
      form.resetFields();
      setCurrentStoreId(null);
      toast.success(response.data.message);

    } catch (error) {
      console.error(error);
      toast.error(error.response.data);
    }
  };


  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const account = JSON.parse(localStorage.getItem("account"));
  console.log(account);
  console.log(store.rate);
  const fetch = async () => {
    const stores = await api.get(`/api/v1/store`);
    console.log(stores.data.data);
    setStore(stores.data.data);
    console.log(store.rate);
  };

  const handleOk = () => {
    // setShow(false);
    form.submit();

  };

  const handleCancel = () => {
    setCurrentStoreId(null);
    setCurrentStore(null);
  };

  useEffect(fetch, []);

  const calcTotalPrice = (servicesI) => {
    const servicesV = servicesI ? servicesI : services;
    let totalPrice = 0;
    servicesV.map((item) => {
      if (item.title === "OPTION") {
        const option = item.options.filter(
          (option) => option.id === form.getFieldValue(`option-${item.id}`)
        )[0];
        totalPrice += option.price;
      }
    });
    const weight = form.getFieldValue("numberOfHeightCus");

    if (weight) {
      const currentServiceId = form.getFieldValue("washType");
      const currentService = servicesV.filter(
        (item) => item.id === currentServiceId
      )[0];
      const option = currentService.options;
      if (weight < 5) {
        totalPrice += option[0].price * weight;
      } else if (weight < 7) {
        totalPrice += option[0].price * 5 + option[1].price * (weight - 5);
      } else {
        totalPrice +=
          option[0].price * 5 +
          option[1].price * 2 +
          option[2].price * (weight - 7);
      }
    }

    setTotal(totalPrice);
  };

  const fetchService = async () => {
    const services = await api.get(`/api/v1/service/${currentStoreId}`);
    setServices(services.data.data);
    const defaultService = services.data.data.filter(
      (item) => item.title === "WASH" && item.defaultValue
    )[0]
      ? Number(
        services.data.data.filter(
          (item) => item.title === "WASH" && item.defaultValue
        )[0]?.id
      )
      : Number(services.data.data[0]?.id);
    console.log(defaultService);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      washType: defaultService,
    });
    calcTotalPrice(services.data.data);
  };

  useEffect(() => {
    if (currentStoreId) {
      fetchService();
    }
  }, [currentStoreId]);

  const data = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const mapToHtml = (store) => {
    console.log(store);
    return (
      <Col span={6}>
        <Card
          hoverable
          actions={[
            account != null && account.role === "CUSTOMER" ? (
              <Button
                type="primary"
                onClick={() => {
                  setCurrentStoreId(store.id);
                  setCurrentStore(store);
                }}
              >
                Order Now!
              </Button>
            ) : account != null &&
              (account.role === "STORE" || account.role === "ADMIN") ? (
              <Button
                type="primary"
                onClick={() => {
                  alert("Please login as customer to order!");
                }}
              >
                Order Now!
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  alert("Please login to order!");
                  window.location.href = "/auth/login";
                }}
              >
                Order Now!
              </Button>
            ),
          ]}
          cover={
            <img
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1665912014038-8c78434db1ff?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
              }}
              alt="example"
              src={
                store.coverPhoto
                  ? store.coverPhoto
                  : "https://images.unsplash.com/photo-1665912014038-8c78434db1ff?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          }
        >
          <Meta title={store.name} description={store.address} />
          <Meta description={store.description + " - " + store.phoneNumber} />
          <Rate
            style={{ marginTop: 20 }}
            disabled
            defaultValue={store.rate}
            character={({ index }) => customIcons[index + 1]}
          />
        </Card>
      </Col>
    );
  };
  const onInput = (i) => {
    setKey(i.target.value);
  };

  const options = services
    .filter((item) => item.title === "OPTION")
    .map((item) => ({
      id: item.id,
      label: item.name,
      options: item.options.map((option) => ({
        id: option.id,
        name: option.name,
        price: option.price,
      })),
    }));

  useEffect(() => {
    form.setFieldsValue({
      options: options.map((option) => ({
        id: option.id,
        optionId: option.options.find((option) => option.defaultValue)?.id,
      })),
    });
  }, [form, options]);

  return (
    <>
      <ProductNavbar transparent color="blue" />
      <main>
        <Input
          onInput={onInput}
          placeholder="Type to search"
          style={{ width: "50%", margin: "20px auto", display: "block" }}
        />
        <Row gutter={[12, 12]} style={{ padding: 30 }}>
          {store.filter((item) =>
            item.name.toLowerCase().includes(key.toLowerCase()) && item.status === "ACTIVE"
          )
            .map(mapToHtml)}
        </Row>
      </main>
      <FooterAdmin />

      <Modal
        title={currentStore?.name + " - " + currentStore?.address}
        open={currentStoreId}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}

          onChange={(e) => {
            calcTotalPrice();
          }}
        >
          <Form.Item
            initialValue={account?.customer?.address}
            name="address"
            label="Address"
            labelCol={{
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={account?.customer?.phoneNumber}
            name="numberOfCustomer"
            label="Phone"
            labelCol={{
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={
              services.filter(
                (item) => item.title === "WASH" && item.defaultValue
              )[0]
                ? Number(
                  services.filter(
                    (item) => item.title === "WASH" && item.defaultValue
                  )[0]?.id
                )
                : Number(services[0]?.id)
            }
            name="washType"
            label="Wash type"
            labelCol={{ span: 24 }}
          >
            <Radio.Group>
              {services.map((item) => {
                if (item.title === "WASH") {
                  return <Radio value={item.id}>{item.name}</Radio>;
                }
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="numberOfHeightCus"
            label="Weight of clothes"
            labelCol={{
              span: 24,
            }}
            rules={[
              {
                min: 1,
                message: "Please input weight greather than 1kg!",
              },
              {
                required: true,
                message: "Please input weight!",
              },
            ]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          {services.map((item) => {
            if (item.title === "OPTION") {
              return (
                <Form.Item
                  initialValue={
                    item.options.filter((item) => item.defaultValue == true)[0]
                      ? item.options.filter((item) => item.defaultValue)[0]?.id
                      : item.options[0]?.id
                  }
                  name={`option-${item.id}`}
                  label={item.name}
                  labelCol={{ span: 24 }}
                >
                  <Radio.Group>
                    {item.options.map((option) => {
                      console.log(option);
                      return (
                        <Radio value={option.id} checked={true}>
                          {option.name} ({formatVND(option.price)})
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              );
            }
          })}

          {/*
        <Form.List name="options">
            {(fields) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Form.Item
                    {...restField}
                    name={[name, 'id']}
                    fieldKey={[fieldKey, 'id']}
                    label={options[name]?.label}
                    labelCol={{ span: 24 }}
                  >
                    <Radio.Group>
                      {options[name]?.options.map(option => (
                        <Radio value={option.id}>{option.name} ({formatVND(option.price)})</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>*/}

          <Row justify={"end"}>
            <h1
              style={{
                fontSize: 20,
              }}
            >
              Total:{" "}
              <strong
                style={{
                  fontSize: 30,
                }}
              >
                {formatVND(total)}
              </strong>
            </h1>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
