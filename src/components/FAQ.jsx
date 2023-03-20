import React from "react";

function FAQ() {
  return (
    <div className="max-w-screen-sm h-screen mt-8">
      <div className="p-4 w-full flex flex-col items-start">
        <div className="rounded-full bg-dm-blue text-lm-blue p-4 text-center w-4/5 mx-auto mb-8 mt-6">
          <h4 className="text-3xl font-outfit">FAQs</h4>
        </div>
        <div className="mb-8">
          <h3 className="text-center text-xl font-bold mb-2">1. who are we?</h3>
          <p className="text-gray-700">
            dibs! is a project led by four students at Boston University. As busy
            college students, we know how challenging it can be to find furniture
            that meets your financial needs and is easy to aquire. Our goal with this
            project is to help simplify the process of connecting students looking to
            get rid of furniture, with those looking to aquire some -- all for free!
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-center text-xl font-bold mb-2">2. why use dibs?</h3>
          <p className="text-gray-700">
            dibs! is a project focused on simplifying the process of connected
            students trying to get rid of furniture, with students looking for
            furniture -- all while helping reduce over-consumption and promote
            more-sustainable habits.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
