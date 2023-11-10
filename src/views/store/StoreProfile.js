import React from "react";

// components

import StoreSetting from "components/Cards/StoreSetting.js";
import StoreProfile from "components/Cards/StoreProfile";

export default function StoreInfor() {
  return (
    <>
      <div className="flex flex-wrap justify-center">

        <div className="w-full lg:w-8/12 px-4">
          <StoreProfile />
        </div>
      </div>
    </>
  );
}
