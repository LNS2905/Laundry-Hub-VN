import React from "react";

// components

import OrderRequestedCardTable from "components/Cards/OrderRequestedCardTable.js";

export default function OrderRequested() {
  return (
    <>
      <div className="flex flex-wrap mt-4">        
        <div className="w-full mb-12 px-4">
          <OrderRequestedCardTable color="dark" />
        </div>
      </div>
    </>
  );
}
