import React from "react";

// components


import StoreOrderDetail from "components/Cards/StoreDetailCard.js";

export default function OrdersDetailTable() {
  return (
    <>
      <div className="flex flex-wrap mt-4">F
        <div className="w-full mb-12 px-4">
          <StoreOrderDetail color="dark" />
        </div>
      </div>
    </>
  );
}
