/* eslint-disable react/no-unescaped-entities */
import React from "react";

function FAQ() {
  return (
    <div className="max-w-screen-sm h-screen mt-8">
      <div className="p-4 w-full flex flex-col items-start">
        <div className="rounded-full text-dm-blue p-4 text-center w-4/5 mx-auto mb-8 mt-6">
          <h4 className="text-5xl font-outfit">FAQs</h4>
        </div>

        <div className="collapse collapse-arrow bg-dm-blue rounded-box mb-2 w-full">
          <input type="checkbox" />
          <div className="bg-dm-blue rounded-full collapse-title text-xl font-medium text-white">
            who we are
          </div>
          <div className="collapse-content text-white">
            <p>
              dibs! is a project led by four students at Boston University. As busy
              college students, we know how challenging it can be to find furniture
              that both meets your financial needs, and is easy to aquire. Through
              dibs!, we hope to make affordable furniture more accessible to more
              students.{" "}
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-dm-blue rounded-box mb-2 mr-4 w-full">
          <input type="checkbox" />
          <div className="bg-dm-blue rounded-full collapse-title text-xl font-medium text-white">
            why use dibs!
          </div>
          <div className="collapse-content text-white">
            <p>
              dibs! is a project focused on simplifying the process of connecting
              students trying to get rid of furniture, with students looking for
              furniture -- all while helping reduce over-consumption and promoting
              more-sustainable habits.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-dm-blue rounded-box w-full">
          <input type="checkbox" />
          <div className="bg-dm-blue rounded-full collapse-title text-xl font-medium text-white">
            how to use dibs! safely
          </div>
          <div className="collapse-content text-white">
            <p>
              make sure your photos don't include any personal information that you
              may not want to share!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
