import React from "react";

// components

import StoresCardTable from "components/Cards/StoresCardTable.js";

export default function StoresTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">F
        <div className="w-full mb-12 px-4">
          <StoresCardTable color="dark" />
        </div>
      </div>
    </>
  );
}
