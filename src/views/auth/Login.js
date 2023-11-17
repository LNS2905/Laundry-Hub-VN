import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "config/axios";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { GGProvider } from "config/firebase";
import { auth } from "config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function Login() {
  const navigate = useHistory();

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(values.username);
    try {
      const res = await api.post("/login", values);
      const role = res.data.data.role;
      localStorage.setItem("role", role);
      localStorage.setItem("account", JSON.stringify(res.data.data));
      localStorage.setItem("username", res.data.data.username);
      localStorage.setItem("password", values.password);
      console.log(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);
      if (role === "CUSTOMER") {
        navigate.push("/customers/orders");
      } else if (role === "STORE") {
        navigate.push("/store/orderrequested");
      } else if (role === "ADMIN") {
        navigate.push("/admin/dashboard");
      }
    } catch (e) {
      // console.log(e.response);
      toast.error(e.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    localStorage.getItem("username");
    localStorage.getItem("password");
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      signInWithPopup(auth, GGProvider)
                        .then(async (result) => {
                          // This gives you a Google Access Token. You can use it to access the Google API.
                          const credential = GoogleAuthProvider.credentialFromResult(result);
                          const token = credential.accessToken;
                          // The signed-in user info.
                          const user = result.user;
                          const res = await api.post(`/login/by-email?email=${user.email}`)
                          const role = res.data.data.role;
                          localStorage.setItem("role", role);
                          localStorage.setItem("account", JSON.stringify(res.data.data));
                          console.log(res.data.data.token);
                          localStorage.setItem("token", res.data.data.token);
                          if (role === "CUSTOMER") {
                            navigate.push("/customers/orders");
                          } else if (role === "STORE") {
                            navigate.push("/store/orderrequested");
                          } else if (role === "ADMIN") {
                            navigate.push("/admin/dashboard");
                          }
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
                          toast.error(error.response.data);
                        });
                    }}
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
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <Form
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
                    label="Username"
                    name="username"
                    initialValue={`${localStorage.getItem("username")}`}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    initialValue={`${localStorage.getItem("password")}`}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

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
            <div className="flex flex-wrap mt-6 relative">

              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
