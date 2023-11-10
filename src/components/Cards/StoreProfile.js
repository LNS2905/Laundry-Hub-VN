import api from "config/axios";
import React, { useState, useEffect } from "react";
import { Switch } from "antd";

// components

export default function StoreProfile() {
  const [stores, setStores] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("api/v1/store/information-store");
      setStores(response.data.data);
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
                <div className="relative">
                  {stores.coverPhoto ? (
                    <img
                      src={stores.coverPhoto}
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
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {stores.name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {stores.address}
              </div>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                {stores.phoneNumber}
              </div>
              <div>
                {stores.status === "ACTIVE" ? (
                  <div className="mb-2 text-lime-400 mt-10">
                    <div className="flex flex-row justify-center">Status: <div style={{ color: 'green' }}> {stores.status}</div>

                      <i className={`fas fa-circle text-${stores.status === 'ACTIVE' ? 'green' : 'red'}-500 mr-2`}></i>
                      <span
                        className={
                          "ml-3 font-bold text-black"
                        }
                      >
                        <Switch defaultChecked={stores.status === 'ACTIVE'} onChange={async (value) => {
                          console.log(value);
                          if (!value) {
                            try {
                              const response = await api.put(`/${stores.id}/deactive-store`);
                              console.log(response);
                              fetchData();
                            } catch (error) {
                              console.error(error);
                            }
                          }
                          else {
                            try {
                              const response = await api.put(`/${stores.id}/active-store`);
                              console.log(response);
                              fetchData();
                            } catch (error) {
                              console.error(error);
                            }

                          }
                        }} />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2 text-blueGray-600 mt-10">
                    Status: {stores.status}
                  </div>
                )}
              </div>
              <div className="mb-2 text-blueGray-600">
                Rate: {stores.rate} <i className="fas fa-star text-yellow-500"></i>
              </div>
            </div>

          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {stores.description}
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
