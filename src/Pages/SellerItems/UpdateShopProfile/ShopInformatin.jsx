import React from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
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

const ShopInformation = () => {
  const { shopInfo } = useContext(AuthContext);

  function convertTimestampToFormattedDate(timestamp) {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);

    const timeDiff = currentDate.getTime() - givenDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = givenDate.toLocaleDateString("en-US", options);

    return `${formattedDate} (${daysAgo} days ago)`;
  }

  const { data: contacts = [], refetch } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/shop/contact/${shopInfo?.shopId}`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="flex-1 bg-white -lg shadow-xl p-8 mt-5">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Full name:</span>
          <span className="text-gray-700">{shopInfo.shopName}</span>
        </li>
        {shopInfo?.domain && (
          <li li className="flex border-y py-2">
            <span className="font-bold w-24">Domain:</span>
            <span className="text-gray-700">{shopInfo?.domain}</span>
          </li>
        )}

        <li className="flex border-b py-2">
          <span className="font-bold w-24">Joined:</span>
          <span className="text-gray-700">
            {convertTimestampToFormattedDate(shopInfo.date)}
          </span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Mobile:</span>
          <span className="text-gray-700">{shopInfo.shopNumber}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Email:</span>
          <span className="text-gray-700">{shopInfo.shopEmail}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Location:</span>
          <span className="text-gray-700">{shopInfo.address}</span>
        </li>

        <li className="flex items-center border-b py-2 space-x-2">
          <span className="font-bold w-24">Elsewhere:</span>
          {contacts.length &&
            contacts?.map((cont) => (
              <div key={cont._id}>
                {(cont.media === "Facebook" && (
                  <a href={`${cont.URL}`} target="_blank">
                    <FaFacebook className="cursor-pointer rounded-full text-blue-700 hover:text-blue-900  text-4xl bg-white p-1 " />
                  </a>
                )) ||
                  (cont.media === "Messenger" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaFacebookMessenger className="cursor-pointer rounded-full text-[#663399] hover:text-purple-700  bg-white p-1  text-4xl" />
                    </a>
                  )) ||
                  (cont.media === "Instagram" && (
                    <a
                      href={`${cont.URL}`}
                      target="_blank"
                    >
                      <FaInstagram className="cursor-pointer rounded-full text-red-700 hover:text-red-900  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Twitter" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaSquareXTwitter className="cursor-pointer rounded-full text-gray-700 hover:text-gray-900  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Whatsapp" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaWhatsapp className="cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Viber" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaViber className="cursor-pointer rounded-full text-purple-500 hover:text-purple-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Telegram" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaTelegram className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Skype" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaSkype className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "YouTube" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaYoutube className="cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "LINE" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaLine className="cursor-pointer rounded-full text-green-500 hover:text-green-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Reddit" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaReddit className="bg-white p-1  text-red-500 border hover:text-red-700  text-4xl" />
                    </a>
                  )) ||
                  (cont.media === "Snapchat" && (
                    <a
                      href={`${cont.URL}`}
                      target="_blank"
                    >
                      <FaSnapchat className="bg-yellow-500 p-1  text-black border hover:bg-yellow-700  text-4xl" />
                    </a>
                  )) ||
                  (cont.media === "Pinterest" && (
                    <a
                      href={`${cont.URL}`}
                      target="_blank"
                    >
                      <FaPinterest className="cursor-pointer rounded-full text-red-500 hover:text-red-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Tumblr" && (
                    <a href={`${cont.URL}`} target="_blank">
                      <FaTumblr className="cursor-pointer rounded-full text-violet-500 hover:text-violet-700  text-4xl bg-white p-1 " />
                    </a>
                  )) ||
                  (cont.media === "Linkedin" && (
                    <a
                      href={`${cont.URL}`}
                      target="_blank"
                    >
                      <FaLinkedin className="cursor-pointer rounded-full text-blue-500 hover:text-blue-700  text-4xl bg-white p-1 " />
                    </a>
                  ))}
              </div>
            ))}
        </li>
      </ul>
    </div>
  );
};

export default ShopInformation;
