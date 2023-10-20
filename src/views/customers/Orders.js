import React from "react";

// components

import CusOrdersCard from "components/Cards/CusOrdersCard.js";

export default function CusOrdersCardd() {
    return (
        <>
            <div className="flex flex-wrap mt-4">

                <div className="w-full mb-12 px-4">
                    <CusOrdersCard color="dark" />
                </div>
            </div>
        </>
    );
}
