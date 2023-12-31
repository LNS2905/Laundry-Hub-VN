import React, { useEffect } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import api from "config/axios";

export default function HeaderStats() {
  const [totalcus, setTotalCus] = React.useState(false);
  const [totalstore, setTotalStore] = React.useState(false);
  const [totalorder, setTotalOrder] = React.useState(false);
  const [totalrevenue, setTotalRevenue] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerTotal = await api.get("api/v1/customer/count-customer");
        setTotalCus(customerTotal.data);
        const storeTotal = await api.get("api/v1/store/count-store");
        setTotalStore(storeTotal.data);
        const orderTotal = await api.get("api/v1/order/count-order");
        setTotalOrder(orderTotal.data);
        const revenueTotal = await api.get("/revenue");
        setTotalRevenue(revenueTotal.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Customers"
                  statTitle={totalcus.data}



                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />

              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Stores"
                  statTitle={totalstore.data}


                  statIconName="fas fa-store"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Orders Processing"
                  statTitle={totalorder.data}

                  statIconName="fas fa-shopping-cart"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Revenue"
                  statTitle={totalrevenue.data}

                  statIconName="fas fa-chart-line"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
