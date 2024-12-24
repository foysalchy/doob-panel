import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Upload.json";

const Step1 = ({ nextStep, handleChange, values }) => {
      const Name = values.shopId;
      const Logo = values.logo;
      const Address = values.address;
      const Email = values.shopEmail;
      const Number = values.shopNumber;
      const primary_color = values.primary_color || '#111827';
      const text_color = values.text_color || '#FFFFFF';
      const text_color_s = values.text_color_s || '#FFFFFF';
      const secounder_color = values.secounder_color || '#ffa531';
      const footer_color = values.footer_color || '#111827';



            const [primaryColor, setPrimaryColor] = useState(primary_color);
            const [footerColor, setFooterColor] = useState(footer_color);
            const [secondaryColor, setSecondaryColor] = useState(secounder_color);
            const [textColor, setTextColor] = useState(text_color);
            const [textColorS, setTextColorS] = useState(text_color_s);
      
            // Predefined color palettes
            const colorPalettes = [
                  { name: 'Palette 1', primary: '#1e90ff', text_primary: '#ffffff', secondary: '#32cd32', text_secondary: '#000000', footer: '#ff6347' },
                  { name: 'Palette 2', primary: '#ff1493', text_primary: '#ffffff', secondary: '#dda0dd', text_secondary: '#000000', footer: '#20b2aa' },
                  { name: 'Palette 3', primary: '#ff8c00', text_primary: '#ffffff', secondary: '#6a5acd', text_secondary: '#ffffff', footer: '#4682b4' },
                  { name: 'Palette 4', primary: '#4caf50', text_primary: '#ffffff', secondary: '#ffeb3b', text_secondary: '#000000', footer: '#9c27b0' },
                  { name: 'Palette 5', primary: '#3f51b5', text_primary: '#ffffff', secondary: '#e91e63', text_secondary: '#ffffff', footer: '#607d8b' },
                  { name: 'Palette 6', primary: '#009688', text_primary: '#ffffff', secondary: '#cddc39', text_secondary: '#000000', footer: '#795548' },
                  { name: 'Palette 7', primary: '#673ab7', text_primary: '#ffffff', secondary: '#03a9f4', text_secondary: '#000000', footer: '#ff5722' },
                  { name: 'Palette 8', primary: '#00bcd4', text_primary: '#000000', secondary: '#ffc107', text_secondary: '#000000', footer: '#8bc34a' },
                  { name: 'Palette 9', primary: '#ff5722', text_primary: '#ffffff', secondary: '#9e9e9e', text_secondary: '#000000', footer: '#2196f3' },
                  { name: 'Palette 10', primary: '#9c27b0', text_primary: '#ffffff', secondary: '#4caf50', text_secondary: '#ffffff', footer: '#3f51b5' }
            ];
      
            // Function to handle palette selection
            const handlePaletteChange = (palette) => {
                  setPrimaryColor(palette.primary);
                  setFooterColor(palette.footer);
                  setSecondaryColor(palette.secondary);
                  setTextColor(palette.text_primary);
                  setTextColorS(palette.text_secondary);
            };
      
      console.log(Logo);

      const [error, setError] = useState();

      const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
      };

      const [upload, setUpload] = useState();

      const imageUploading = (e) => {
            e.preventDefault();
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append("image", selectedFile);
            const url = `https://doob.dev/api/v1/image/upload-image`;
            fetch(url, {
                  method: "POST",
                  body: formData,
            })
                  .then((res) => res.json())
                  .then((imageData) => {
                        console.log(imageData);
                        if (imageData.imageUrl) {
                              const image = imageData.imageUrl;
                              setUpload(true);
                              values.logo = image;
                        } else {
                              setUpload(false);
                        }
                  });
      };

      const [shopName, setShopName] = useState("");
      const [errorName, setErrorName] = useState("");
      const [uniq, setUniq] = useState();

      const shopNameCheck = async (e) => {
            e.preventDefault();
            setErrorName();

            let name = e.target.value;
            name = name?.toLowerCase().replace(/\s+/g, "-");
            setShopName(name);

            if (name.length > 3) {
                  try {
                        const response = await fetch(
                              `https://doob.dev/api/v1/shop/info/${name}`
                        );
                        const data = await response.json();

                        if (data) {
                              setUniq(true);
                              setErrorName("");

                              values.shopId = name;
                        } else {
                              setErrorName("This is not uniq name");
                              setUniq(false); // Set the shop name in the state
                        }
                  } catch (error) {
                        console.error("Error checking shop name:", error);
                  }
            } else {
                  setUniq(false);
                  setErrorName("It's Not a valid Name");
            }
      };

      const [numberError, setNumberError] = useState();
      const [emailError, setEmailError] = useState();
      const [AddressError, setAddressError] = useState();
      const [FileError, setFileError] = useState();

      useEffect(() => {
            setNumberError("");
            setError("");
            setErrorName("");
            setEmailError("");
            setAddressError("");
            setFileError("");

            if (Number === "") {
                  setNumberError("Input a Shop Phone Number");
            }
            else if (Number.length > 15) {
                  setNumberError("Provide a valid Number");
            }
            if (!validateEmail(Email)) {
                  setEmailError("Provide a Valid Email");
            }
            if (Address === "") {
                  setAddressError("Provide a Shop Address");
            }
            if (Logo === null) {
                  setUpload("Select a Logo");
            }
            if (Name === "") {
                  setErrorName("Provide a Uniq Name For Your Shop");
            }
      }, [
            Name,
            Logo,
            Address,
            Email,
            Number,
            FileError,
            numberError,
            emailError,
            AddressError,
      ]);

      return (
            <div>
                  <div>
                        <div className="bar overflow-hidden rounded-full bg-gray-200">
                              <div className="h-2 w-[1%] rounded-full bg-blue-500"></div>
                        </div>

                        <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                              <li className="flex items-center justify-start text-blue-600 sm:gap-1.5">
                                    <span className="hidden sm:inline"> Details </span>

                                    <svg
                                          className="h-6 w-6 sm:h-5 sm:w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                          />
                                    </svg>
                              </li>

                              <li className="flex items-center justify-center  sm:gap-1.5">
                                    <span className="hidden sm:inline"> Connect Store </span>

                                    <svg
                                          className="h-6 w-6 sm:h-5 sm:w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                          />
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                    </svg>
                              </li>

                              <li className="flex items-center justify-end sm:gap-1.5">
                                    <span className="hidden sm:inline"> Payment </span>

                                    <svg
                                          className="h-6 w-6 sm:h-5 sm:w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                          />
                                    </svg>
                              </li>
                        </ol>
                  </div>

                  <div>
                        <form>
                              <div>
                                    <p className="mt-10 mb-2 text-black">
                                          Shop Domain <span className="text-red-500">*</span>
                                    </p>

                                    <div className="relative">
                                          <input
                                                required
                                                onBlur={shopNameCheck}
                                                type="text"
                                                placeholder="Input Your Uniq Shop domain name"
                                                value={shopName}
                                                onChange={(e) => setShopName(e.target.value)}
                                                className={
                                                      uniq
                                                            ? "border-green-700 flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border  rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                            : " flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-red-500 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                }
                                          />
                                          {uniq && (
                                                <span className="pointer-events-none absolute inset-y-0 text-green-500 font-bold end-0 grid w-10 place-content-center">
                                                      <Lottie animationData={groovyWalkAnimation} loop={false} />
                                                      {/* <GrStatusGood className=' bg-green-500 rounded-full font-bold' /> */}
                                                </span>
                                          )}
                                    </div>
                                    {errorName && <p className="text-red-500 text-sm">{errorName}</p>}
                              </div>

                              <div>
                                    <p className="mt-2 mb-2 text-black">
                                          Shop Logo (170*50 pixel)<span className="text-red-500">*</span>
                                    </p>

                                    <div className="relative">
                                          <input
                                                type="file"
                                                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                                                required
                                                onChange={imageUploading}
                                                className="block py-2 mt-2 text-sm text-gray-600  file:bg-gray-500 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded  placeholder-gray-900  focus:border-blue-400  focus:ring focus:ring-blue-300 focus:ring-opacity-40   flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                          />

                                          {upload && (
                                                <span className="pointer-events-none absolute inset-y-0 text-green-500 font-bold end-0 grid w-10 place-content-center">
                                                      <Lottie animationData={groovyWalkAnimation} loop={false} />
                                                </span>
                                          )}
                                    </div>
                                    {FileError && <p className="text-red-500 text-sm">{FileError}</p>}
                                    {upload === false && (
                                          <p className="text-red-500 text-sm">upload failed</p>
                                    )}
                              </div>

                              <div>
                                    <p className=" mt-4 mb-1 text-black">
                                          Shop Address <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                          required
                                          type="text"
                                          placeholder="Provide Shop Address"
                                          onChange={handleChange("address")}
                                          value={values.address}
                                          className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline "
                                    />
                                    {AddressError && (
                                          <p className="text-red-500 text-sm">{AddressError}</p>
                                    )}
                              </div>

                              <div>
                                    <p className="mt-4 mb-1 text-black">
                                          Shop Email <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                          required
                                          type="email"
                                          placeholder="Provide Your Shop Email"
                                          onChange={handleChange("shopEmail")}
                                          value={values.shopEmail}
                                          className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                    />
                                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                              </div>

                              <div>
                                    <p className="mt-4 mb-2 text-black">
                                          Shop Phone Number <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                          required
                                          type="number"

                                          placeholder="Input Your Shop Phone Number"
                                          onChange={handleChange("shopNumber")}
                                          value={values.shopNumber}
                                          className="flex-grow  w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-900 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                    />

                                    {numberError && (
                                          <p className="text-red-500 text-sm">{numberError}</p>
                                    )}
                              </div>
                              <div className="mb-4 col-span-12">
                                                                  <label htmlFor="palette">Select a Color Palette</label>
                                                                  <div className="grid grid-cols-5 gap-6 mt-4">
                                                                        {colorPalettes.map((palette, index) => (
                                                                              <div
                                                                                    key={index}
                                                                                    className="cursor-pointer border rounded-md p-4 hover:shadow-lg transition-shadow"
                                                                                    onClick={() => handlePaletteChange(palette)}
                                                                              >
                                                                                   <div className="flex space-x-2">
                                                                                          <div
                                                                                                className="border h-12 w-12 rounded"
                                                                                                style={{ backgroundColor: palette.primary }}
                                                                                                title={`Primary: ${palette.primary}`}
                                                                                          ></div>
                                                                                           <div
                                                                                                className="h-12 border w-12 rounded"
                                                                                                style={{ backgroundColor: palette.text_primary }}
                                                                                                title={`Primary: ${palette.text_primary}`}
                                                                                          ></div>
                                                                                          <div
                                                                                                className="h-12 border w-12 rounded"
                                                                                                style={{ backgroundColor: palette.secondary }}
                                                                                                title={`Secondary: ${palette.secondary}`}
                                                                                          ></div>
                                                                                          <div
                                                                                                className="h-12 border w-12 rounded"
                                                                                                style={{ backgroundColor: palette.text_secondary }}
                                                                                                title={`Primary: ${palette.text_secondary}`}
                                                                                          ></div>
                                                                                          <div
                                                                                                className="h-12 border w-12 rounded"
                                                                                                style={{ backgroundColor: palette.footer }}
                                                                                                title={`Footer: ${palette.footer}`}
                                                                                          ></div>
                                                                                    </div>
                                                                                    <div className="mt-2 text-center text-sm font-medium">{palette.name}</div>
                                                                              </div>
                                                                        ))}
                                                                  </div>
                                                            </div>


                                                            {/* Individual color inputs */}
                                                            <div className="mb-4 col-span-4">
                                                                  <div>Primary colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="primary_color"
                                                                        value={primaryColor}
                                                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-4">
                                                                  <div>Text colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="text_color"
                                                                        value={textColor}
                                                                        onChange={(e) => setTextColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-4">
                                                                  <div>Footer colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="footer_color"
                                                                        value={footerColor}
                                                                        onChange={(e) => setFooterColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-6">
                                                                  <div>Secondary colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="secounder_color"
                                                                        value={secondaryColor}
                                                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-6">
                                                                  <div>Text colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="text_color_s"
                                                                        value={textColorS}
                                                                        onChange={(e) => setTextColorS(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>

                              <br />
                              <div className="flex justify-center items-center">
                                    {
                                          <button
                                                disabled={
                                                      error ||
                                                      AddressError ||
                                                      numberError ||
                                                      !upload ||
                                                      !uniq ||
                                                      AddressError ||
                                                      emailError
                                                }
                                                onClick={nextStep}
                                                className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 disabled:bg-gray-500 "
                                          >
                                                <span className="absolute -end-full transition-all group-hover:end-4">
                                                      <BsArrowRight />
                                                </span>

                                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                                      Next Step
                                                </span>
                                          </button>
                                    }
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Step1;
