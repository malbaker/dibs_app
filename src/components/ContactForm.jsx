import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { SlLocationPin } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleMessageSubmit(e) {
    e.preventDefault();
    try {
      const docRef = addDoc(collection(db, "messages"), {
        to: ["malbaker@bu.edu"],
        from: email,
        replyTo: email,
        message: {
          subject: "Message from dibs user" + name,
          text: message,
        },
      });
      console.log("Document written with ID: ", docRef.id);
      alert(
        "Thank you for leaving a message with us! We will try to get back to you as soon as possible!",
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setName("");
    setEmail("");
    setMessage("");
  }
  return (
    <div className="min-w-xs ">
      <div className="w-full flex justify-center mx-auto">
        <div className="btn-group justify-center">
          <button className="btn bg-buttons rounded border-0 hover:bg-buttons hover:opacity-25">
            <a
              className="text-black px-4 py-2 text-md"
              href="https://goo.gl/maps/NVpRW557Ci95qp999"
              target="_blank"
              rel="noreferrer"
            >
              <SlLocationPin />
            </a>
          </button>
          <button className="btn bg-buttons border-0 hover:bg-buttons hover:opacity-25">
            <a className="text-black px-4 py-2 text-md" href="tel:6173532154">
              <SlPhone />
            </a>
          </button>
          <button className="btn bg-buttons border-0 hover:bg-buttons hover:opacity-25">
            <a
              className=" text-black px-4 py-2 text-md"
              href="mailto:business@dibs.boston"
            >
              <AiOutlineMail />
            </a>
          </button>
        </div>
      </div>
      <section className="text-dm-blue body-font flex flex-col items-center justify-center">
        <div className="container px-5 py-6 mx-auto flex flex-col items-center justify-center">
          <div className="max-w-xs md:max-w-md">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-lm-blue rounded border border-dm-blue focus:border-indigo-500 h-32 text-base outline-none text-dm-blue py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={(e) => {
                    handleMessageSubmit(e);
                  }}
                  className="flex mx-auto text-white bg-buttons border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
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
