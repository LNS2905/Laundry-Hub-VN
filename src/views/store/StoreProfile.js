import React from "react";

// components

import StoreSetting from "components/Cards/StoreSetting.js";
import StoreProfile from "components/Cards/StoreProfile";

export default function StoreInfor() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <StoreSetting />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <StoreProfile />
        </div>
      </div>
    </>
  );
}
