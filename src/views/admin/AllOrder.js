import React from "react";

// components

import AllOrdersCard from "components/Cards/AllOrderCard.js";

export default function CustomersTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">        
        <div className="w-full mb-12 px-4">
          <AllOrdersCard color="dark" />
        </div>
      </div>
    </>
  );
}
