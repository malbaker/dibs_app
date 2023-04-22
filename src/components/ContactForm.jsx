import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

function ContactForm() {
  return (
    <div className="max-w-screen-sm">
      <div className="p-2 w-full flex flex-col items-center justify-center">
        <div className="flex items-start bg-buttons rounded">
          <div className="btn-group bg-buttons rounded ">
            <button className="btn bg-buttons border-0 hover:bg-buttons hover:opacity-25">
              {" "}
              <a className="text-black px-6 py-2 ml-4 text-xs" href="/">
                <SlLocationPin />
              </a>
            </button>
            <button className="btn bg-buttons border-0 hover:bg-buttons hover:opacity-25">
              {" "}
              <a className="text-black px-6 py-2 ml-4 text-xs" href="/">
                <SlPhone />
              </a>
            </button>
            <button className="btn bg-buttons border-0 hover:bg-buttons hover:opacity-25">
              <a className=" text-black px-6 py-2 ml-4 text-xs" href="/">
                <AiOutlineMail />
              </a>
            </button>
          </div>
        </div>
      </div>
      <section className="text-dm-blue body-font flex flex-col items-center justify-center">
        <div className="container px-5 py-24 mx-auto flex flex-col items-center justify-center">
          <div className="lg:w-1/2 md:w-2/3">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-dm-blue">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-lm-blue rounded border border-dm-blue focus:border-indigo-500 text-base outline-none text-dm-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-dm-blue">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-lm-blue rounded border border-dm-blue focus:border-indigo-500 text-dm-blue outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-dm-blue"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-lm-blue rounded border border-dm-blue focus:border-indigo-500 h-32 text-base outline-none text-dm-blue py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-buttons border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ContactForm;
