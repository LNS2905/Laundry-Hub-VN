import React from "react";

// components

import Orders from "components/Cards/OrdersCard.js";

export default function OrdersTable() {
  return (
    <>
      <div className="flex flex-wrap mt-4">F
        <div className="w-full mb-12 px-4">
          <Orders color="dark" />
        </div>
      </div>
    </>
  );
}
