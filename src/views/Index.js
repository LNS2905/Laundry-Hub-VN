/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Carousel, Col, Flex, Rate, Row } from 'antd';
import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import api from "config/axios";
import Meta from "antd/es/card/Meta";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '10px', overflow: 'hidden',
  backgroundSize: 'cover',
  textAlign: 'center',

};






export default function Index() {
  const [store, setStore] = useState([]);
  const fetch = async () => {
    const stores = await api.get(`/api/v1/store`);
    console.log(stores.data.data);
    setStore(stores.data.data);
    console.log(store.rate);
  };

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  useEffect(fetch, []);
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1604335398980-ededcadcc37d?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Spend less time washing, more time chilling!
                  </h1>

                  <p className="mt-4 text-lg text-blueGray-200">
                    Our laundry services offer expert care for your clothes, saving you time and reducing laundry-related stress. We provide regular and occasional cleaning and folding services, giving you extra free time to enjoy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-stopwatch"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Fast & Convenient</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Assisting you in resolving the issue promptly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Diversification of Services</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Select the service that best suits your needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-check"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Verified Store</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      The stores have been checked for quality through customer feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-shopping-basket text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  We provide the best laundry service for you!
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Our partner offers a reliable and efficient laundry service that saves time and hassle. With state-of-the-art equipment and experienced staff, your clothes will be cleaned to perfection and returned to you promptly. Say goodbye to laundry and hello to more free time with our partner's laundry service.
                </p>
                <Link
                  to="/productpage"
                  className="text-black font-bold py-2 px-4 rounded-full mt-8 border-2 border-black border-solid"
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    padding: '2px 4px',
                    borderRadius: '9999px',
                    marginTop: '2rem',
                    borderWidth: '2px',
                    borderColor: 'black',
                    borderStyle: 'solid'
                  }}
                >
                  Order Now!
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1596902852634-9dc8f029bb1a?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887"
                    className="max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1469504512102-900f29606341?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1825"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-shapes text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Pick and Choose: Services and Prices Tailored to You!</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Our coven of services spans wide and varied, beckoning you with a plethora of enchantments. With the assistance of a network of laundry sanctuaries, we offer spellbinding options to suit your needs and desires.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-store"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            There is a wide range of shops available
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-hand-holding-heart"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Diverse Range of Services
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-hand-holding-usd"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            A great deal at an affordable price
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>



      </main >
      <Footer />
    </>
  );
}
