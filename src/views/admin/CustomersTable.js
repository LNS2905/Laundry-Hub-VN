import React from "react";

// components

import CustomersCardTable from "components/Cards/CustomersCardTable.js";

export default function CustomersTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">        
        <div className="w-full mb-12 px-4">
          <CustomersCardTable color="dark" />
        </div>
      </div>
    </>
  );
}
