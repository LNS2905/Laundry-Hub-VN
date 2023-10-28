import React from "react";

// components

import CusSetting from "components/Cards/CusSetting.js";
import CusProfile from "components/Cards/CusProfile.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CusSetting />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CusProfile />
        </div>
      </div>
    </>
  );
}
