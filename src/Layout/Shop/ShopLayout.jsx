import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ShopAuth, { ShopAuthProvider } from "../../AuthProvider/ShopAuthProvide";
import groovyWalkAnimation from "./Loading.json";
import ShopNav from "./ShopComponents/ShopNav";
import ShopSmallNav from "./ShopComponents/ShopSmallNav";
import { Footer } from "./ShopComponents/shopFotterComponent";
import { Helmet } from "react-helmet";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const ShopLayout = () => {

      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);


      const shopId = idMatch ? idMatch[1] : null;
      const {
            data: shop = {},
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      useEffect(() => {
            document.getElementsByTagName("head").remove;
      });
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




      const { data: seller_facebook_pixel = {} } = useQuery({
            queryKey: ["seller-facebook-pixel-for-shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-facebook-id?shopId=${shopId}`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      return (


            <div>

                  {isLoading ? (
                        <div className="grid h-screen px-4 bg-black place-content-center">
                              <Lottie animationData={groovyWalkAnimation} loop={true} />
                        </div>
                  ) : (
                        <div>
                              {/* Helmet for adding Facebook Pixel dynamically */}
                              {seller_facebook_pixel && (
                                    <Helmet>
                                          <script>
                                                {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${seller_facebook_pixel.pixel}');
        fbq('track', 'PageView'); // Track PageView event
        fbq('track', 'ViewContent'); // Track ViewContent event
        fbq('track', 'AddToCart'); // Track AddToCart event
        fbq('track', 'Purchase', {
          value: '0.00',
          currency: 'USD'
        }); // Track Purchase event
      `}
                                          </script>
                                          <noscript>
                                                {`
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${seller_facebook_pixel.pixel}&ev=PageView&noscript=1"
        />
      `}
                                          </noscript>
                                    </Helmet>
                              )}


                              {Object.keys(shop).length !== 0 ? (
                                    <ShopAuth>
                                          <Layout />
                                    </ShopAuth>
                              ) : (
                                    <div className="grid h-screen px-4 bg-white place-content-center">
                                          <div className="tracking-widest text-xl text-gray-500 uppercase">
                                                <span className="text-red-500">404 </span>| Sorry We can't find
                                                this shop
                                          </div>
                                    </div>
                              )}
                        </div>
                  )}
            </div>
      );
};

export default ShopLayout;



const Layout = () => {

      const pathname = window.location.pathname;
      const idMatch = pathname.match(/\/shop\/([^/]+)/);
      const shopId = idMatch ? idMatch[1] : null;

      const { color, setColor } = useContext(ShopAuthProvider);
      const [modalShop, setModalShop] = useState(false);


      const {
            data: shop = {},
            isLoading,
            refetch,
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/shop/${shopId}`
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const modalToggol = () => {
            setModalShop(!modalShop);
      };

      useEffect(() => {
            setColor({ 'primary_color': shop.primary_color, 'secounder_color': shop.secounder_color, 'text_color': shop.text_color });

      }, [shop]);

      return (
            <div>
                  <div>
                        <ShopSmallNav />
                        <ShopNav />
                        <div className="relative w-[100%] overflow-hidden">
                              {<Outlet></Outlet>}

                              <button className="fixed bottom-11 right-3">
                                    <BiSupport
                                          onClick={modalToggol}
                                          className="text-5xl bg-gray-100 shadow shadow-slate-500 p-2 text-blue-500 rounded-full"
                                    ></BiSupport>
                              </button>
                              {modalShop && (
                                    <div className="fixed bottom-48 right-20 z-50">
                                          <div
                                                className="absolute end-0 z-10 mt-2 w-44 rounded-md border border-gray-100 bg-white shadow-lg"
                                                role="menu"
                                          >
                                                <div className="p-2">
                                                      {contacts.map((con) => (
                                                            <>
                                                                  {con.media === "Whatsapp" && (
                                                                        <a
                                                                              href={`https://wa.me/${con.URL}`}
                                                                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-teal-700 hover:bg-teal-50"
                                                                              role="menuitem"
                                                                              target="_blank"
                                                                        >
                                                                              <AiOutlineWhatsApp /> Whatsapp
                                                                        </a>
                                                                  )}

                                                                  {con.media === "Messenger" && (
                                                                        <a
                                                                              href="https://www.facebook.com/brightfuturesoft"
                                                                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                                                                              role="menuitem"
                                                                              target="_blank"
                                                                        >
                                                                              <BsMessenger /> Messenger
                                                                        </a>
                                                                  )}
                                                            </>
                                                      ))}
                                                      <a
                                                            href={`mailto:${shop?.shopEmail}`}
                                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                            role="menuitem"
                                                            target="_blank"
                                                      >
                                                            <MdEmail /> Email
                                                      </a>
                                                </div>
                                          </div>
                                    </div>
                              )}
                        </div>
                        <Footer />
                  </div>
            </div>
      );
};
