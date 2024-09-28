import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ShopAuthProvider } from "../../../AuthProvider/ShopAuthProvide";
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

import { ImFacebook } from "react-icons/im";
import { SlSocialTwitter } from "react-icons/sl";
import QRCode from "react-qr-code";
import BrightAlert from "bright-alert";


export const Footer = () => {
      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);

      const shopId = idMatch ? idMatch[1] : null;

      const {
            data: pages = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["sellerPages"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/pages/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const { data: shop = {} } = useQuery({
            queryKey: ["buyer"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      const { shop_id } = useContext(ShopAuthProvider);
      const { data: contacts = [] } = useQuery({
            queryKey: ["contact"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/contact/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });


      const [email, setEmail] = useState("");
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);


      const submitEmail = (e) => {
            e.preventDefault();
            setLoading(true);
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (email && email.match(emailRegex)) {
                  setError(false);
                  fetch("https://doob.dev/api/v1/seller/subscriber-report", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              email: email,
                              date: new Date(),
                              shopId: shopId,
                        }),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              setLoading(false);
                              BrightAlert(`${data.message}`);
                              e.target.reset();
                        });
            } else {
                  setLoading(false);
                  setError("Invalid email");
            }
      };

      const year = new Date().getFullYear();

      return (


            <div className="bg-gray-900 text-gray-100">
                  <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <div className="grid md:grid-cols-5 gap-6">

                              {/*----------------*/}
                              {/*      col 2     */}
                              {/*----------------*/}
                              <div className="space-y-3">
                                    <h2 className="text-lg ">Support</h2>
                                    <ul className=" space-y-2 ">
                                          <li>
                                                <a
                                                      href="/"
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      {shop?.address}
                                                </a>
                                          </li>
                                          <li>
                                                <a
                                                      href="/"
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      {shop?.shopEmail}
                                                </a>
                                          </li>
                                          <li>
                                                <a
                                                      href="/"
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      {shop?.shopNumber}
                                                </a>
                                          </li>
                                    </ul>
                              </div>
                              {/*----------------*/}
                              {/*      col 3     */}
                              {/*----------------*/}
                              <div className="space-y-3">
                                    <h2 className="text-lg ">Account</h2>
                                    <ul className="space-y-2">
                                          <li>
                                                <a
                                                      href="/"
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      My Account
                                                </a>
                                          </li>
                                          <li>
                                                <Link
                                                      to={`/shop/${shopId}/sign-in`}
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      Login / Register
                                                </Link>
                                          </li>

                                          <li>
                                                <Link
                                                      to={`/shop/${shopId}/user/cart`}
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      Cart
                                                </Link>
                                          </li>
                                          <li>
                                                <a
                                                      href="/"
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      Wishlist
                                                </a>
                                          </li>
                                    </ul>
                              </div>
                              {/*----------------*/}
                              {/*      col 4     */}
                              {/*----------------*/}
                              <div className="space-y-3">
                                    <h2 className="text-lg ">Quic Links</h2>
                                    <ul className=" space-y-2">
                                          <li>
                                                <Link
                                                      to={`/shop/${shopId}/blog`}
                                                      className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                >
                                                      {"Blogs"}
                                                </Link>

                                          </li>
                                          <li>
                                                <Link className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200" to={`/shop/${shopId}/track-order`}   > Track Order </Link>
                                          </li>
                                          {pages.length
                                                ? pages
                                                      ?.filter((item) => !item?.trash)
                                                      ?.map((page, i) => (
                                                            <div key={page._id}>
                                                                  {page?.status && (
                                                                        <li>
                                                                              <Link
                                                                                    to={`/shop/${shopId}/pages/${page._id}`}
                                                                                    className="text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-200"
                                                                              >
                                                                                    {page?.title}
                                                                              </Link>
                                                                        </li>
                                                                  )}
                                                            </div>
                                                      ))
                                                : ""}
                                    </ul>
                              </div>
                              {/*----------------*/}
                              {/*      col 1     */}
                              {/*----------------*/}
                              <div className="space-y-3">
                                    <h2 className="text-3xl font-semibold">Exclusive</h2>
                                    <h2 className="text-lg ">Subscribe</h2>
                                    <p className="mt-4 text-sm text-gray-100">
                                          Get Update Our Exclusive Offer
                                    </p>
                                    <form
                                          onSubmit={submitEmail}
                                          className="flex flex-col mt-4 md:flex-row"
                                    >
                                          <div className="border border-white rounded-md flex items-center">
                                                <input
                                                      placeholder="Email"
                                                      required
                                                      type="text"
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      className="flex-grow bg-[transparent] w-full h-12 px-4 mb-3 transition duration-200 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                />
                                                <button className="h-full w-[30px]" type="submit">
                                                      <AiOutlineSend />
                                                </button>
                                          </div>

                                    </form>

                              </div>
                              {/*----------------*/}
                              {/*      col 5     */}
                              {/*----------------*/}
                              <div className="space-y-3">
                                    <h2 className="text-lg ">Download App</h2>
                                    <div>
                                          <div className="flex items-center gap-2">
                                                <div className="border-2 border-white w-[80px]">
                                                      <QRCode
                                                            size={256}
                                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                            value={'https://doob.com.bd/'}
                                                            viewBox={`0 0 256 256`}
                                                      />
                                                </div>
                                                <div className="space-y-2">
                                                      <img className="w-[130px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png" alt="" />

                                                      <img className="w-[130px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png" alt="" />
                                                </div>
                                          </div>
                                    </div>


                                    <div className="flex flex-wrap gap-3">
                                          {contacts.length &&
                                                contacts?.map((cont) => (
                                                      <div key={cont._id}>
                                                            {(cont.media === "Facebook" && (
                                                                  <a
                                                                        href={`https://facebook.com/${cont.URL}`}
                                                                        target="_blank"
                                                                  >
                                                                        <ImFacebook className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                  </a>
                                                            ))
                                                                  ||
                                                                  (cont.media === "Twitter" && (
                                                                        <a
                                                                              href={`https://twitter.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <SlSocialTwitter className="cursor-pointer rounded-full text-gray-100  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Messenger" && (
                                                                        <a href={`https://M.me/${cont.URL}`} target="_blank">
                                                                              <FaFacebookMessenger className="cursor-pointer rounded-full text-[#ffffff]  bg-transparent p-1  text-3xl" />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Instagram" && (
                                                                        <a
                                                                              href={`https://instagram.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaInstagram className="cursor-pointer rounded-full text-red-100   text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Whatsapp" && (
                                                                        <a href={`https://wa.me/${cont.URL}`} target="_blank">
                                                                              <FaWhatsapp className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Viber" && (
                                                                        <a
                                                                              href={`viber://add?number=${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaViber className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Telegram" && (
                                                                        <a href={`https://t.me/${cont.URL}`} target="_blank">
                                                                              <FaTelegram className="cursor-pointer rounded-full text-white text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Skype" && (
                                                                        <a href={`skype:${cont.URL}?chat`} target="_blank">
                                                                              <FaSkype className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "YouTube" && (
                                                                        <a
                                                                              href={`https://youtube.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaYoutube className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "LINE" && (
                                                                        <a href={`https://line.me/${cont.URL}`} target="_blank">
                                                                              <FaLine className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Reddit" && (
                                                                        <a
                                                                              href={`https://reddit.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaReddit className="bg-transparent p-1  text-white border  text-3xl" />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Snapchat" && (
                                                                        <a
                                                                              href={`https://snapchat.com/add/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaSnapchat className=" p-1  text-white  text-3xl" />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Pinterest" && (
                                                                        <a
                                                                              href={`https://pinterest.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaPinterest className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Tumblr" && (
                                                                        <a
                                                                              href={`https://tumblr.com/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaTumblr className="cursor-pointer rounded-full text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  )) ||
                                                                  (cont.media === "Linkedin" && (
                                                                        <a
                                                                              href={`https://linkedin.com/in/${cont.URL}`}
                                                                              target="_blank"
                                                                        >
                                                                              <FaLinkedin className="cursor-pointer  text-white  text-3xl bg-transparent p-1 " />
                                                                        </a>
                                                                  ))}
                                                      </div>
                                                ))}
                                    </div>
                              </div>

                        </div>
                  </div>
                  <p className="text-sm text-center border-t border-gray-800 py-6 mt-14 text-gray-500">
                        © Copyright Doob {year}. All right reserved.
                  </p>
            </div>
      );
};
