import React from "react";
import Button from "../components/buttons/Button";

const Descovery = () => {
  return (
    <div className="w-full flex items-center justify-between mx-6 py-24">
      <div className="flex-4">
        <h4 className="text-2xl text-[#111212] w-[45%]">
          A global team of search-first content marketers engineering semantic
          relevancy & category signals for both the internet and people
        </h4>
      </div>
      <div className="flex-3">
        <h1 className="text-[4rem] text-[#111212] font-semibold leading-14">
          Driving Demand &{" "}
        </h1>
        <h1 className="flex gap-2 items-center text-[4rem] text-[#111212] font-semibold leading-14">
          Discovery
          <img className="w-18 h-18 rounded-xl" src="/images/1.webp" alt="" />
        </h1>
        <div className="mt-5">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Descovery;
