import React, { useRef, useState } from "react";
import {
      BsFacebook,
      BsInstagram,
      BsLine,
      BsMessenger,
      BsSkype,
      BsTelegram,
      BsTelephone,
      BsWhatsapp,
      BsX,
} from "react-icons/bs";
import Swal from "sweetalert2";
import showAlert from "../../../Common/alert";

import emailjs from "@emailjs/browser";
import { useQuery } from "@tanstack/react-query";
import { MdEmail } from "react-icons/md";
import {
      FaFacebook,
      FaFacebookMessenger,
      FaInstagram,
      FaLine,
      FaLinkedin,
      FaPinterest,
      FaReddit,
      FaSkype,
      FaSnapchat,
      FaSquareXTwitter,
      FaTelegram,
      FaTumblr,
      FaViber,
      FaWhatsapp,
      FaYoutube,
} from "react-icons/fa6";
import Imo from "./Imo.png";

const Contract = () => {
      const [loading, setLoading] = useState(false);

      const { data: contact = [], refetch } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/contact"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const form = useRef();
      const ContractFrom = (e) => {
            setLoading(true);
            e.preventDefault();
            emailjs.sendForm("Doob", "Doob", form.current, "xE3XosZ4990JJ_5ZI").then(
                  (result) => {
                        showAlert("success", "Your Service Publish Successfully", "success");
                        setLoading(false);
                  },
                  (error) => {
                        showAlert("info", "Your Service Publish Successfully", "info");
                        setLoading(false);
                  }
            );

            e.target.reset();
      };

      return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                  <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-300 ">
                        <div className="flex flex-col ">
                              <div className="space-y-2">
                                    <h2 className="text-4xl font-bold  lg:text-5xl">Let's talk!</h2>
                                    <div className="text-gray-800">
                                          Vivamus in nisl metus? Phasellus.
                                    </div>
                              </div>
                              <div className="flex gap-4 items-center flex-wrap my-6 md:my-10 ">
                                    {contact.map((cont) => (
                                          <div>
                                                {(cont.media === "Phone Number" && (
                                                      <a href={`tel:${cont?.URL}`} target="_blank">
                                                            <BsTelephone className="cursor-pointer text-4xl bg-white p-1 rounded" />
                                                      </a>
                                                )) ||
                                                      (cont.media === "Email" && (
                                                            <a href={`mailto:${cont?.URL}`} target="_blank">
                                                                  <MdEmail className="cursor-pointer text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Facebook" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaFacebook className="cursor-pointer text-blue-700 hover:text-blue-900  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Messenger" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaFacebookMessenger className="cursor-pointer text-[#663399] hover:text-purple-700  bg-white p-1 rounded text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Instagram" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaInstagram className="cursor-pointer text-red-700 hover:text-red-900  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Twitter" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaSquareXTwitter className="cursor-pointer text-gray-700 hover:text-gray-900  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Whatsapp" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaWhatsapp className="cursor-pointer text-green-500 hover:text-green-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Viber" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaViber className="cursor-pointer text-purple-500 hover:text-purple-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Telegram" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaTelegram className="cursor-pointer text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Skype" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaSkype className="cursor-pointer text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "YouTube" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaYoutube className="cursor-pointer text-red-500 hover:text-red-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "LINE" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaLine className="cursor-pointer text-green-500 hover:text-green-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Reddit" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaReddit className="bg-white p-1 rounded text-red-500 border hover:text-red-700  text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Snapchat" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaSnapchat className="bg-yellow-500 p-1 rounded text-black border hover:bg-yellow-700  text-4xl" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Pinterest" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaPinterest className="cursor-pointer text-red-500 hover:text-red-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Tumblr" && (
                                                            <a href={`${cont.URL}`} target="_blank">
                                                                  <FaTumblr className="cursor-pointer text-violet-500 hover:text-violet-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      )) ||
                                                      (cont.media === "Linkedin" && (
                                                            <a
                                                                  href={`${cont.URL}`}
                                                                  target="_blank"
                                                            >
                                                                  <FaLinkedin className="cursor-pointer text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 rounded" />
                                                            </a>
                                                      ))}
                                          </div>
                                    ))}

                                    {/* <a href="http://" rel="noopener noreferrer"><BsMessenger className='cursor-pointer text-blue-500 hover:text-blue-700 text-4xl' /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><BsTelegram className='cursor-pointer text-teal-800 hover:text-teal-900 text-4xl' /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"> <BsLine className='cursor-pointer text-green-500 hover:text-green-700 text-4xl' /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"> <BsTelephone className=' text-4xl' /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"> <BsSkype className='cursor-pointer text-blue-500 hover:text-blue-700 text-4xl' /></a> */}
                              </div>
                        </div>
                        <form ref={form} onSubmit={ContractFrom} className="space-y-6">
                              <div>
                                    <label htmlFor="name" className="text-sm">
                                          Full name
                                    </label>
                                    <input
                                          id="name"
                                          required
                                          type="text"
                                          placeholder=""
                                          name="name"
                                          className="w-full p-3 py-2 rounded "
                                    />
                              </div>
                              <div>
                                    <label htmlFor="email" className="text-sm">
                                          Email
                                    </label>
                                    <input
                                          id="email"
                                          name="email"
                                          required
                                          type="email"
                                          className="w-full p-3 py-2 rounded "
                                    />
                              </div>
                              <div>
                                    <label htmlFor="email" className="text-sm">
                                          Phone Number
                                    </label>
                                    <input
                                          id="email"
                                          name="phone"
                                          required
                                          type="number"
                                          className="w-full p-3 py-2 rounded "
                                    />
                              </div>
                              <div>
                                    <label htmlFor="subject" className="text-sm">
                                          Subject
                                    </label>
                                    <input
                                          id="subject"
                                          required
                                          name="subject"
                                          type="text"
                                          className="w-full p-3 py-2 rounded "
                                    />
                              </div>
                              <div>
                                    <label htmlFor="Description" className="text-sm">
                                          Description
                                    </label>
                                    <textarea
                                          name="message"
                                          required
                                          id="message"
                                          rows="3"
                                          className="w-full p-3 py-2 rounded "
                                    ></textarea>
                              </div>
                              {!loading ? (
                                    <button
                                          type="submit"
                                          required
                                          className="w-full p-3 py-2 text-sm font-bold tracki uppercase rounded bg-black hover:bg-gray-900  text-white"
                                    >
                                          Send Message
                                    </button>
                              ) : (
                                    <button
                                          disabled
                                          required
                                          className="w-full p-3 py-2 text-sm font-bold tracki uppercase rounded bg-black hover:bg-gray-900  text-white"
                                    >
                                          Loading ...{" "}
                                    </button>
                              )}
                        </form>
                  </div>
            </div>
      );
};

export default Contract;
