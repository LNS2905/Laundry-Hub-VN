import { Button, Checkbox, Form, Input, Select } from "antd";
import Upload from "antd/es/upload/Upload";
import OPTChecker from "components/otp";
import api from "config/axios";
import { GGProvider } from "config/firebase";
import { auth } from "config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadVideo from "utils/uploadImage";

const { Option } = Select;

export default function Register() {
  const [form] = Form.useForm();
  const [role, setRole] = useState("CUSTOMER");
  const [file, setFile] = useState('https://free-icon-rainbow.com/i/icon_01993/icon_019930_256.jpg');
  const navigate = useHistory();
  const onFinish = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
      role: values.role,
      customer: {
        name: values.name,
        phone_number: values.phone_number,
        avatar: file,
        address: values.address,
      },
      store: {
        name: values.name,
        address: values.address,
        phoneNumber: values.phoneNumber,
        status: values.status,
        coverPhoto: values.coverPhoto,
      }
    }
    console.log(data);
    try {
      await api.post('/signup', data)
      toast.success("Sign up successfully!");
      navigate.push("/auth/login");
    } catch (e) {

      toast.error(e.response.data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Sign up failed!");

  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center" onClick={() => {
                  signInWithPopup(auth, GGProvider)
                    .then((result) => {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      const credential = GoogleAuthProvider.credentialFromResult(result);
                      const token = credential.accessToken;
                      // The signed-in user info.
                      const user = result.user;
                      console.log(user);
                      form.setFieldValue('username', user.email)
                      form.setFieldValue('name', user.displayName)
                      form.setFieldValue('name', user.displayName)
                      setFile(user.photoURL)
                      // IdP data available using getAdditionalUserInfo(result)
                      // ...
                    }).catch((error) => {
                      console.log(error);
                      // Handle Errors here.
                      // const errorCode = error.code;
                      // const errorMessage = error.message;
                      // // The email of the user's account used.
                      // const email = error.customData.email;
                      // // The AuthCredential type that was used.
                      // const credential = GGProvider.credentialFromError(error);
                      // ...
                    });
                }}>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Form
                  form={form}
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="role"
                    label="Role"
                    initialValue="CUSTOMER"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      value={role}
                      onChange={(e) => {
                        setRole(e);
                      }}
                    >
                      <Option value="CUSTOMER">Customer</Option>
                      <Option value="STORE">Store</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                      {
                        min: 8,
                        message: "Please input between 8 to 50 characters!",
                      }

                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        min: 8,
                        message: "Please input greather than 8 characters!",
                      }
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>

                  {role === "CUSTOMER" && (
                    <>
                      <Form.Item
                        name="name"
                        label="Customer name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                          {
                            min: 8,
                            message: "Please input between 8 to 50 characters!",
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <OPTChecker name={'phone_number'} />

                      <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
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
                        }} />
                      </Form.Item>

                    </>
                  )}

                  {role === "STORE" && (
                    <>
                      <Form.Item
                        name="name"
                        label="Store name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name="address"
                        label="Store address"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <OPTChecker name={'phoneNumber'} />
                      <Form.Item
                        name="coverPhoto"
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
                        }} />
                      </Form.Item>
                    </>
                  )}



                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>

                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
