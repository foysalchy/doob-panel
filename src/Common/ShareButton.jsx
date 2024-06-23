import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaRegClipboard,
  FaClipboardCheck,
} from "react-icons/fa";

const ShareButton = ({ text, url }) => {
  const [shareNow, setShareNow] = useState(false);
  const message = encodeURIComponent(text + " " + url);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${encodeURIComponent(
        url
      )}&app_id=YOUR_APP_ID`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <button
        className="px-4 py-2 text-white rounded-md bg-blue-400 font-semibold mx-auto"
        onClick={() => setShareNow(!shareNow)}
      >
        Share{" "}
      </button>
      {shareNow && (
        <section>
          <div className="flex flex-col items-center justify-center bg-gray-100 py-2">
            <h1 className="text-2xl font-bold mb-4">Share this content</h1>
            <div className="flex space-x-4 py-3">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                <FaWhatsapp size={24} />
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <FaFacebookMessenger size={24} />
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
              >
                <FaTwitter size={24} />
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-100 mb-2 py-2">
            <h1 className="text-2xl font-bold mb-4">Copy this URL</h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
                  copied ? "bg-green-500 hover:bg-green-600" : ""
                }`}
              >
                {copied ? (
                  <FaClipboardCheck size={24} />
                ) : (
                  <FaRegClipboard size={24} />
                )}
                <span className="ml-2">{copied ? "Copied!" : "Copy URL"}</span>
              </button>
              {/* <Tooltip content="URL copied to clipboard!" isVisible={copied} /> */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
