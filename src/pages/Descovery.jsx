import React from "react";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";

const Descovery = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mx-4 sm:mx-6 py-16 sm:py-24 gap-3 md:gap-0">

      {/* RIGHT CONTENT FIRST ON MOBILE */}
      <div className="flex-3 order-1 md:order-2 w-full md:w-auto">

        <h1 className="text-[3rem] md:text-[4rem] text-[#111212] font-medium leading-tight tracking-tight md:leading-14">
          Driving Demand &
        </h1>

        <h1 className="flex gap-2 items-center text-[3rem] md:text-[4rem] text-[#111212] font-medium tracking-tight leading-tight md:leading-14">
          Discovery
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-xl"
            src="/images/1.webp"
            alt=""
          />
        </h1>

        <div className="mt-5 w-full hidden md:flex items-center gap-5">
          <Button title="Our Story" />
          <TextButton title="Our Services" />
        </div>
      </div>

      {/* DESCRIPTION SECOND ON MOBILE */}
      <div className="flex-4 flex flex-col gap-7 items-start order-2 md:order-1 w-full md:w-auto">
        <h4 className="text-lg md:text-2xl text-[#111212] leading-6 w-[95%] md:w-[45%]">
          A global team of search-first content marketers engineering semantic
          relevancy & category signals for both the internet and people
        </h4>
        <div className="mt-5 w-full flex flex-col md:hidden gap-3">
  <div className="w-full">
    <Button title="Our Story" />
  </div>

  <div className="w-full">
    <TextButton title="Our Services" />
  </div>
</div>
      </div>

    </div>
  );
};

export default Descovery;