import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { BiCopy } from "react-icons/bi";
import { isError, useQuery } from "@tanstack/react-query";

const AddDomain = () => {
  let { shopInfo } = useContext(AuthContext);
  const txtValue = shopInfo.shopId;
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const {
    data: domainDoc,
    refetch: reload,
    isLoading: loadingDomain,
  } = useQuery({
    queryKey: ["domainDoc"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/domain-document");
      const data = await res.json();
      return data.result;
    },
  });

  const { data: buyDomain, isLoading: loadingBuyDomain } = useQuery({
    queryKey: ["buyDomain"],

    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/buy-domain");
      const data = await res.json();
      return data;
    },
  });

  const dataSubmit = (event) => {
    event.preventDefault();
    const domain = event.target.domain.value;
    shopInfo.domain = domain;

    fetch(
      `https://doob.dev/api/v1/api/dns?domain=${domain}&txtValue=doob.com.bd/shop/${txtValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.isValuePresent === true) {
          fetch("https://doob.dev/api/v1/seller/addDomain", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shopInfo }),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire("Domain Add Success!", ``, "success");
              const jsonData = JSON.stringify(data);

              document.cookie = `SellerShop=${encodeURIComponent(
                jsonData
              )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
            });
        } else {
          setEdit(true);
        }
      });

    // const response = await axios.get(`/ `);
    // setDNSRecords(response.data);
    // Check if the entered domain matches the pattern
  };

  const [copy, setCopy] = useState(false);

  const handleCopyLink = (link) => {
    const linkToCopy = link; // Replace with your actual link
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Unable to copy link", err);
      });
  };

  const isItDomain = (e) => {
    const domain = e.target.value;

    const domainNameRegex = new RegExp(
      /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
    );
    const isValid = domainNameRegex.test(domain);
    if (isValid) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const videoContainerRef = useRef(null);

  const {
    data: domainVideo,
    refetch,
    isLoading: loadingDomainVideo,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("https://doob.dev/api/v1/admin/domain-video");
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (domainVideo && domainVideo.DomainUrl && videoContainerRef.current) {
      videoContainerRef.current.innerHTML = domainVideo.DomainUrl;
    }
  }, [domainVideo]);

  return (
    <div className=" font-poppins">
      <div className="md:my-10">
        {domainDoc?.data && (
          <div
            className="text_editor"
            dangerouslySetInnerHTML={{
              __html: domainDoc?.data,
            }}
          />
        )}
        <div>
          {!loadingDomainVideo && (
            <div
              className="flex text_editor  items-center justify-center"
              ref={videoContainerRef}
            />
          )}
        </div>
        <h1 className="text-2xl font-bold mt-10 text-center">
          Upload Your Domain
        </h1>
        <div className="text-center md:my-4">
          Your Local Domain:{" "}
          <a
            href={`http://doob.com.bd/shop/${shopInfo.shopId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <code> doob.com.bd/shop/{shopInfo.shopId}</code>{" "}
          </a>
          {shopInfo.domain && (
            <p>
              {" "}
              Your Custom domain:{" "}
              <a
                href={`http://${shopInfo.domain}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <code>{shopInfo.domain}</code>
              </a>
            </p>
          )}
          <a
            class="group mt-4 relative inline-flex items-center ml-8 overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
            href={buyDomain?.url}
          >
            <span class="absolute -start-full text-white g transition-all group-hover:start-4">
              <svg
                class="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span class="text-sm font-medium transition-all group-hover:ms-4 ">
              {" "}
              Buy Domain{" "}
            </span>
          </a>
        </div>

        <div className="md:p-10 p-3 border-2  rounded md:m-10 m-0 mt-3">
          <form onSubmit={dataSubmit} className="w-full ">
            <div>
              <div className="">
                <label className="sr-only text-black" htmlFor="title">
                  Provide Your Domain Name
                </label>
                <input
                  onChange={(e) => isItDomain(e)}
                  required
                  className={
                    !error
                      ? "flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border  rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline border-red-500"
                      : "flex-grow w-full re h-12 px-4 mb-2 transition duration-200 bg-white border border-green-300 rounded shadow-sm appearance-none focus:border-deep-purple-400 focus:outline-none focus:shadow-outline"
                  }
                  placeholder="Provide Your Domain Name"
                  id="title"
                  name="domain"
                  title="Enter a valid domain name"
                />
                {!error && (
                  <small className="text-red-500">
                    Please enter your domain name correctly to proceed further.
                  </small>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={!error}
                className="group disabled:bg-gray-500 disabled:cursor-wait relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Submit
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className={edit ? "flex" : "hidden"}>
          <div className=" mx-auto py-20">
            <div
              className={`fixed  z-50 top-0 left-0 flex  min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5  ${
                edit ? "block" : "hidden"
              }`}
            >
              <div className="w-full max-w-[800px] h-[90%]  rounded-[20px]  bg-white  pb-10 px-8 text-center md:px-[30px]">
                <div className="flex justify-between  pt-4 items-start w-full sticky top-0 bg-white border-b">
                  <div className="pb-2 text-xl font-bold text-dark text-red-500 text-center sm:text-2xl">
                    Domain Setup Error
                  </div>
                  <div
                    onClick={() => setEdit(!edit)}
                    className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
                  >
                    <button>
                      {" "}
                      <RxCross2 className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className=" overflow-y-scroll">
                  <h1 className="text-xl my-4 font-poppins">
                    We are do not find a txt file on your domain
                  </h1>
                  <p>
                    Set Your DNS:{" "}
                    <code>doob.com.bd/shop/{shopInfo.shopId}</code>
                  </p>
                  <button
                    className="flex items-center mx-auto my-4 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                    onClick={() =>
                      handleCopyLink(`doob.com.bd/shop/${shopInfo.shopId}`)
                    }
                  >
                    <BiCopy />
                    {copy ? (
                      <p className="text-green-500">Link copied!</p>
                    ) : (
                      <span>Share Your Site</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDomain;
