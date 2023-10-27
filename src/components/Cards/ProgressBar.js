import React from "react";
import { Steps } from "antd";
const Step = () => (
  <Steps
    size="small"
    current={1}
    items={[
      {
        title: "Finished",
      },
      {
        title: "In Progress",
      },
      {
        title: "Waiting",
      },
    ]}
  />
);
export default Step;
