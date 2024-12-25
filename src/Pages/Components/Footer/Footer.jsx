import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../Logo.png";
import { ImFacebook } from "react-icons/im";
import { SlSocialTwitter } from "react-icons/sl";
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



const Footer = () => {
      const { data: pages = [], refetch } = useQuery({
            queryKey: ["faqs"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/pages");
                  const data = await res.json();
                  return data;
            },
      });

      const page1 = pages?.length && pages?.filter((itm) => itm?.page == "footer1");
      const page2 = pages?.length && pages?.filter((itm) => itm?.page == "footer2");
      const page3 = pages?.length && pages?.filter((itm) => itm?.page == "footer3");
      const page4 = pages?.length && pages?.filter((itm) => itm?.page == "footer4");

      const {
            data: contacts = [],
            isLoading,
      } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/contact"
                  );
                  const data = await res.json();
                  return data;
            },
      });



      return (
            <>

                  <div className="bg-gray-900">
                        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                              <div  >
                                    <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-5 md:grid-cols-5">
                                          <div>
                                                <p className="font-medium tracking-wide text-gray-300">
                                                      Customer Support
                                                </p>
                                                <ul className="mt-2 space-y-2">
                                                      <li>
                                                            <Link
                                                                  to={`/seller/support-tickets`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Help Center
                                                            </Link>
                                                      </li>
                                                      <li>
                                                            <Link
                                                                  to={`/faq`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  FAQs
                                                            </Link>
                                                      </li>
                                                      {page1?.length
                                                            ? page1.map((page, i) => (
                                                                  <li key={i}>
                                                                        <Link
                                                                              to={`/pages/${page?._id}`}
                                                                              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                                        >
                                                                              {page?.title}
                                                                        </Link>
                                                                  </li>
                                                            ))
                                                            : ""}
                                                      <li>
                                                            <Link
                                                                  to={`/contact`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Contact Us
                                                            </Link>
                                                      </li>

                                                </ul>
                                          </div>
                                          <div>
                                                <p className="font-medium tracking-wide text-gray-300">
                                                      Company Information
                                                </p>
                                                <ul className="mt-2 space-y-2">
                                                      {page2?.length
                                                            ? page2
                                                                  ?.filter((item) => !item?.trash)
                                                                  .map((page, i) => (
                                                                        <li key={i}>
                                                                              <Link
                                                                                    to={`/pages/${page?._id}`}
                                                                                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                                              >
                                                                                    {page?.title}
                                                                              </Link>
                                                                        </li>
                                                                  ))
                                                            : ""}
                                                      <li>
                                                            <Link
                                                                  to={`/services`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Service
                                                            </Link>
                                                      </li>
                                                      <li>
                                                            <Link
                                                                  to={`/blogs`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Blogs
                                                            </Link>
                                                      </li>{" "}
                                                </ul>
                                          </div>

                                          <div>
                                                <p className="font-medium tracking-wide text-gray-300">
                                                      {" "}
                                                      Legal Information
                                                </p>
                                                <ul className="mt-2 space-y-2">
                                                      {page3?.length
                                                            ? page3.map((page, i) => (
                                                                  <li key={i}>
                                                                        <Link
                                                                              to={`/pages/${page?._id}`}
                                                                              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                                        >
                                                                              {page?.title}
                                                                        </Link>
                                                                  </li>
                                                            ))
                                                            : ""}

                                                </ul>
                                          </div>

                                          <div>
                                                <p className="font-medium tracking-wide text-gray-300">
                                                      Account and Services
                                                </p>
                                                <ul className="mt-2 space-y-2">
                                                      <li>
                                                            <Link
                                                                  to={`/sign-in`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  My Account
                                                            </Link>
                                                      </li>
                                                      <li>
                                                            <Link
                                                                  to={`/sign-up`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Create an Account
                                                            </Link>
                                                      </li>
                                                      <li>
                                                            <Link
                                                                  to={`/products`}
                                                                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                            >
                                                                  Wholesale Products
                                                            </Link>
                                                      </li>

                                                      {page4?.length
                                                            ? page4.map((page, i) => (
                                                                  <li key={i}>
                                                                        <Link
                                                                              to={`/pages/${page?._id}`}
                                                                              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                                        >
                                                                              {page?.title}
                                                                        </Link>
                                                                  </li>
                                                            ))
                                                            : ""}

                                                </ul>
                                          </div>
                                          <div>
                                                <div className="flex flex-col items-start ">
                                                      <p className="font-medium tracking-wide mb-3 text-gray-300">
                                                            Contact
                                                      </p>
                                                      <ul className="flex flex-wrap gap-2">
                                                            {contacts.length &&
                                                                  contacts?.map((cont) => (
                                                                        <div key={cont._id}>
                                                                              {(cont.media === "Facebook" && cont.footer === "true" && (
                                                                                    <a
                                                                                          className=""
                                                                                          href={`https://facebook.com/${cont.URL}`}
                                                                                          target="_blank"
                                                                                    >
                                                                                          <ImFacebook className="cursor-pointer  text-black-900  text-3xl bg-white p-1 " />
                                                                                    </a>
                                                                              ))
                                                                                    ||
                                                                                    (cont.media === "Twitter" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://twitter.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <SlSocialTwitter className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Messenger" && cont.footer === "true" && (
                                                                                          <a href={`https://M.me/${cont.URL}`} target="_blank">
                                                                                                <FaFacebookMessenger className="cursor-pointer text-black-900  text-3xl bg-white  p-1  text-3xl" />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Instagram" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://instagram.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaInstagram className="cursor-pointer  text-black-900  text-3xl bg-white p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Whatsapp" && cont.footer === "true" && (
                                                                                          <a href={`https://wa.me/${cont.URL}`} target="_blank">
                                                                                                <FaWhatsapp className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Viber" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`viber://add?number=${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaViber className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Telegram" && cont.footer === "true" && (
                                                                                          <a href={`https://t.me/${cont.URL}`} target="_blank">
                                                                                                <FaTelegram className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Skype" && cont.footer === "true" && (
                                                                                          <a href={`skype:${cont.URL}?chat`} target="_blank">
                                                                                                <FaSkype className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "YouTube" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://youtube.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaYoutube className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "LINE" && cont.footer === "true" && (
                                                                                          <a href={`https://line.me/${cont.URL}`} target="_blank">
                                                                                                <FaLine className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Reddit" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://reddit.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaReddit className="bg-transparent p-1  text-gray-500border  text-3xl" />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Snapchat" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://snapchat.com/add/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaSnapchat className=" p-1  text-gray-500 text-3xl" />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Pinterest" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://pinterest.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaPinterest className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Tumblr" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://tumblr.com/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaTumblr className="cursor-pointer  text-black-900  text-3xl bg-white  p-1 " />
                                                                                          </a>
                                                                                    )) ||
                                                                                    (cont.media === "Linkedin" && cont.footer === "true" && (
                                                                                          <a
                                                                                                href={`https://linkedin.com/in/${cont.URL}`}
                                                                                                target="_blank"
                                                                                          >
                                                                                                <FaLinkedin className="cursor-pointer  text-gray-500 text-3xl bg-transparent p-1 " />
                                                                                          </a>
                                                                                    ))}
                                                                        </div>
                                                                  ))}
                                                      </ul>


                                                      
                                                      <div className="flex items-center mb-3 sm:justify-center mt-4">
                                                            <a
                                                                  href="/"
                                                                  className="mr-3 transition duration-300 hover:shadow-lg"
                                                            >
                                                                  <img
                                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png"
                                                                        srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png"
                                                                        className="object-cover object-top w-32 mx-auto"
                                                                        alt=""
                                                                  />
                                                            </a>
                                                            <a
                                                                  href="/"
                                                                  className="transition duration-300 hover:shadow-lg"
                                                            >
                                                                  <img
                                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png"
                                                                        srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png"
                                                                        className="object-cover object-top w-32 mx-auto"
                                                                        alt=""
                                                                  />
                                                            </a>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                              </div>
                              <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-800 sm:flex-row">
                                    <p className="text-sm text-gray-500">
                                          © Copyright {new Date().getFullYear()} Doob. All rights reserved.
                                    </p>
                                    {/* <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div> */}
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Footer;
