import React from "react";
import Banner from "./Banner";
import CustomersFeedbacks from "./CustomersFeedbacks";
import SelectPlan from "./SelectPlan";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <SelectPlan></SelectPlan>
      <CustomersFeedbacks></CustomersFeedbacks>
    </div>
  );
}
