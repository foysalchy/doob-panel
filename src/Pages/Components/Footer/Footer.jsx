import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../Logo.png";

const Footer = () => {
  const { data: pages = [], refetch } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch("https://salenow-v2-backend.vercel.app/api/v1/admin/pages");
      const data = await res.json();
      return data;
    },
  });


  const page1 = pages.filter(itm => itm?.page == 'footer1');
  const page2 = pages.filter(itm => itm?.page == 'footer2');
  console.log(page1, 'pages///////');

  return (

    <>

      {/* <div className="bg-gray-900">
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Link to={'/'}
                aria-label="Go home"
                title="Company"
                className="inline-flex items-center"
              >
                <img className="w-32 text-black" src={Logo} srcSet={Logo} alt="" />
              </Link>
              <div className="mt-6 lg:max-w-sm text-sm text-white">
                BigSeller is a SaaS platform that automates & simplifies
                multichannel e-commerce selling processes. <br /> With BigSeller,
                it is more efficient to create listings and process orders from a
                single system
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-base font-bold tracking-wide text-white">
                Contacts
              </p>
              <div className="flex">
                <p className="mr-1 text-white">Phone:</p>
                <a
                  href="tel:850-123-5021"
                  aria-label="Our phone"
                  title="Our phone"
                  className="transition-colors duration-300 text-gray-200"
                >
                  850-123-5021
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-white">Email:</p>
                <a
                  href="mailto:info@lorem.mail"
                  aria-label="Our email"
                  title="Our email"
                  className="transition-colors duration-300 text-gray-200"
                >
                  info@lorem.mail
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-white">Address:</p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Our address"
                  title="Our address"
                  className="transition-colors duration-300 text-gray-200"
                >
                  312 Lovely Street, NY
                </a>
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-white">
                Social
              </span>
              <div className="flex items-center mt-1 space-x-3">
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx="15" cy="15" r="4" />
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </a>
              </div>
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
                <a href="/" className="transition duration-300 hover:shadow-lg">
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


          <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
            <p className="text-sm text-gray-600">
              © Copyright 2020 Lorem Inc. All rights reserved.
            </p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              {pages.length ? page1?.map((page, i) => (
                <li>
                  {page?.status && (
                    <Link
                      to={`/pages/${page?._id}`}
                      className="text-sm text-gray-100 transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                      mm  {page?.title}
                    </Link>
                  )}
                </li>
              )) : ''}
            </ul>
          </div>
        </div>
      </div> */}


      <div className="bg-gray-900">
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
              <div>
                <p className="font-medium tracking-wide text-gray-300">
                  Page 1
                </p>
                <ul className="mt-2 space-y-2">
                  {
                    page1.length ? page1.map((page, i) => (
                      <li key={i}>
                        <Link
                          to={`/pages/${page?._id}`}
                          className="text-sm text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                          {page?.title}
                        </Link>
                      </li>
                    )) : ''
                  }
                </ul>

              </div>
              <div>
                <p className="font-medium tracking-wide text-gray-300">page 2</p>
                <ul className="mt-2 space-y-2">
                  {
                    page2.length ? page2.map((page, i) => (
                      <li key={i}>
                        <Link
                          to={`/pages/${page?._id}`}
                          className="text-sm text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                          {page?.title}
                        </Link>
                      </li>
                    )) : ''
                  }
                </ul>
              </div>


              <div>
                <p className="font-medium tracking-wide text-gray-300"> Quick Links</p>
                <ul className="mt-2 space-y-2">

                  <li>
                    <Link
                      to={`/products`}
                      className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      Products
                    </Link>
                  </li>
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
                  </li>  <li>
                    <Link
                      to={`/price`}
                      className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/faq`}
                      className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      Learn
                    </Link>
                  </li>


                </ul>
              </div>

              <div>
                <p className="font-medium tracking-wide text-gray-300">
                  Contact
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      +8801712345678
                    </Link>
                  </li>
                  <li>
                    <Link to="/"
                      className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      nahid@example.com
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
            <div className="md:max-w-md lg:col-span-2">
              <div className="flex flex-col items-start ">
                <span className="text-base font-bold tracking-wide text-white">
                  Social
                </span>
                <div className="flex items-center mt-1 space-x-3">
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                      <circle cx="15" cy="15" r="4" />
                      <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
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
                  <a href="/" className="transition duration-300 hover:shadow-lg">
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
          <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-800 sm:flex-row">
            <p className="text-sm text-gray-500">
              © Copyright 2020 Lorem Inc. All rights reserved.
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
