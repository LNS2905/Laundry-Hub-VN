import api from "config/axios";
import React, { useState, useEffect } from "react";
import { Switch } from "antd";

// components

export default function CardProfile() {

  const [customer, setCustomer] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("information-customer");
      setCustomer(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {


    fetchData();
  }, []);


  return (
    <>
      <div>
        <div className="relative flex flex-col justify-center min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-50">

          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative" style={{ zIndex: 1 }}>
                  {customer.avatar ? (
                    <img
                      src={customer.avatar}
                      className="shadow-xl rounded-full h-auto justify-center align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      alt="Avatar"
                    ></img>
                  ) : (
                    <img
                      src='https://images.unsplash.com/photo-1665912014038-8c78434db1ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      className="shadow-xl rounded-full h-auto justify-center align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      alt="Default Avatar"
                    ></img>
                  )}
                </div>
              </div>

            </div>
            <div className="text-center mt-12" style={{ marginTop: '200px' }}>
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {customer.name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {customer.address}
              </div>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                {customer.phoneNumber}
              </div>
              <div>
                {customer.status === "ACTIVE" ? (
                  <div className="mb-2 text-lime-400 mt-10">
                    <div className="flex flex-row justify-center">Status: <div style={{ color: 'green' }}> {customer.status}</div>

                      <i className={`fas fa-circle text-${customer.status === 'ACTIVE' ? 'green' : 'red'}-500 mr-2`}></i>
                      <span
                        className={
                          "ml-3 font-bold text-black"
                        }
                      >
                        {/*<Switch defaultChecked={customer.status === 'ACTIVE'} onChange={async (value) => {
                          console.log(value);
                          if (!value) {
                            try {
                              const response = await api.put(`/${customer.id}/deactive-store`);
                              console.log(response);
                              fetchData();
                            } catch (error) {
                              console.error(error);
                            }
                          }
                          else {
                            try {
                              const response = await api.put(`api/v1/store/active-store`);
                              console.log(response);
                              fetchData();
                            } catch (error) {
                              console.error(error);
                            }

                          }
                        }} /> */}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2 text-blueGray-600 mt-10">
                    Status: {customer.status}
                  </div>
                )}
              </div>

            </div>

          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">


              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
