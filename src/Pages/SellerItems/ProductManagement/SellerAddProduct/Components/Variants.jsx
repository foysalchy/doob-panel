import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import useImageUpload from "../../../../../Hooks/UploadImage";
import Stock from "./Stock";
import VariantData from "./VariantData";
import showAlert from "../../../../../Common/alert";
import AdminCategoryforSeller from './AdminCategoryforSeller';

const Variants = ({
  adminWare,
  multiVendor,
  setMultiVendor,
  inputFields,
  setInputFields,
  daraz,
  variantInput,
  setVariantInput,
}) => {
  const { shopInfo } = useContext(AuthContext);

  const [multipleImg, setMultipleImg] = useState([]);
  console.log(variantInput,'variantInput')
  const ImageUpload = async (image) => {
    const imageBlob = new Blob([image], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", imageBlob);
    console.log(formData);

    const url = `https://doob.dev/api/v1/daraz/daraz-image/${shopInfo._id}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response?.status}`);
      }

      const imageData = await response.json();
      console.log(imageData);
      const imageUrl = imageData?.url;
      if (!imageUrl) {
        showAlert(`${imageData.message}`, "", "warning");
      }
      return imageUrl;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const Upload = (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://doob.dev/api/v1/image/upload-image`;

    return fetch(url, {
      method: "POST",
      headers: {
        Origin: "https://doob.dev/api/v1/image/upload-image",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.imageUrl;
        return imageUrl;
      });
  };

  const [images, setImages] = useState([]);
  const { uploadImage } = useImageUpload();

  // Here you're uploading the image and logging it
  const handleImageChange = async (index, event) => {
    const file = event.target.files[0];

    if (file) {
      // need loading
      const newInputFields = [...inputFields];

      try {
        if (daraz) {
          const url = await ImageUpload(file);
          newInputFields[index].image = url;
          setInputFields(newInputFields);
        } else {
          const url = await Upload(file);
          newInputFields[index].image = url;
          setInputFields(newInputFields);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleAddField = () => {
  //   setInputFields([

  //     ...inputFields,
  //     {
  //       name: "",
  //       image: null,
  //       quantity: "",
  //       SKU: "hello js",
  //       price: "",
  //       offerPrice: "",
  //       ability: false,
  //       vendor: false,
  //       variantImag: [],
  //     },
  //   ]);
  // };


  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      {
        name: "",
        image: null,
        quantity: "",
        SKU: "hello js",
        price: "",
        offerPrice: 0,
        ability: false,
        vendor: false,
        variantImag: [], // Initialize variantImag as an empty array
      },
    ]);
    setVariantInput([
      ...variantInput,
      {
          product1: {
            quantity: 1,
            quantityPrice: 1,
          },
          product2: {
                quantity: 10,
                quantityPrice: 1,
          },
          product3: {
                quantity: 50,
                quantityPrice: 1,
          },
          sellingPrice: "",
          ProductCost: "",
      },
    ]);
  };
  
  console.log(variantInput,'variantInput')

  const handleMultipleImg = async (e, index) => {
    const fileList = Array.from(e.target.files);
    const newImages = await Promise.all(
      fileList.map(async (file) => ({
        src: await uploadImage(file),
      }))
    );

    setInputFields((prevInputFields) => {
      const updatedFields = [...prevInputFields];
      if (updatedFields[index]) {
        if (!Array.isArray(updatedFields[index].variantImag)) {
          updatedFields[index].variantImag = [];
        }
        updatedFields[index].variantImag = [
          ...updatedFields[index].variantImag,
          ...newImages,
        ];
      } else {
        console.error(`updatedFields[${index}] is undefined`);
      }

      return updatedFields;
    });

  };

  const handleRemoveField = (index, imageIndex) => {
    console.log(imageIndex, "imageIndex", index, "index....");
    setInputFields((prevInputFields) => {
      const updatedFields = [...prevInputFields];
      updatedFields[index]?.variantImag?.splice(imageIndex, 1);
      return updatedFields;
    });
  };


  const handleRemoveVariant = (index) => {
    setInputFields((prevInputFields) => {
      const updatedFields = [...prevInputFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  }

  const colourOptions = [
    { value: "black", label: "Black", color: "#0000", isFixed: true },
    { value: "matte black", label: "Matte Black", color: "#0000" },
    { value: "jet black", label: "Jet Black", color: "#000" },
    {
      value: "wither black",
      label: "Wither Black",
      color: "#FF5630",
      isFixed: true,
    },
    { value: "glitter black", label: "Glitter Black", color: "#FF8B00" },
    { value: "light black", label: "Light Black", color: "#FFC400" },
    { value: "Deep Black", label: "GDeep black", color: "#36B37E" },
    { value: "Red and Black", label: "Red and Black", color: "#00875A" },
    { value: "Anther Black", label: "Anther Black", color: "#253858" },
  ];


  const inputData = inputFields[0];
  const price = parseInt(inputData?.offerPrice);
  const discountPrice = (price, discount) => {
    const discountAmount = price * discount;
    const discountedPrice = price - discountAmount;

    return discountedPrice;
  }


  const discount_10_present = discountPrice(price, 0.22);
  const discount_15_present = discountPrice(price, 0.27);
  const discount_20_present = discountPrice(price, 0.32);




  return (
    <div className=" border mt-4 border-gray-400 md:px-10 px-3 py-5 pb-16 w-full bg-gray-100 rounded">
      <div className="min-w-fit mb-4">
          <label className="text-sm " htmlFor="Video url ">
            Sell On Doob
          </label>
          <select
            onChange={(e) => {
              setMultiVendor(
                (e.target.value === "true" && true) ||
                (e.target.value === "false" && false)
              );
            }}
            className="flex-grow w-full h-10 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
            name="ability"
            id=""
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      <div className="flex flex-col mb-4">
        <span className="font-bold">
          Variants, Price, Stock <span className="text-red-500"> *</span>
        </span>
        <small>
          Having accurate product information raises discoverability.
        </small>
      </div>

      <div className="flex gap-4 flex-col w-full">
        {inputFields &&
          inputFields.map((field, index) => (
            <div key={index + 11}>
              <div
                key={index}
                className=" border border-green-300 rounded px-4 py-2  w-full"
              >
                {" "}
                <div className="flex gap-10 justify-between items-center">
                  <div className="w-full">
                    <CreatableSelect
                      name={`name-${index}`}
                      onChange={(newValue) => {
                        // Clone the inputFields array
                        const newInputFields = [...inputFields];

                        // Get the new name from the selected option
                        const newName = newValue ? newValue.value : ""; // Assuming value property holds the name

                        // Check if a name is selected
                        if (newName) {
                          // Generate a unique SKU
                          const newSKU = `${shopInfo.shopId
                            }_${newName}_${Math.floor(
                              Math.random() * 100000000
                            )}`;

                          // Update the name and SKU in the inputFields array
                          newInputFields[index].name = newName;
                          newInputFields[index].SKU = newSKU;

                          // Update the state with the modified inputFields array
                          setInputFields(newInputFields);
                        } else {
                          // Handle case when no name is selected
                          console.error("No name selected");
                        }
                      }}
                      isClearable
                      options={colourOptions} // Assuming colourOptions is defined elsewhere
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`coverPhoto-${index}`}
                      className="bg-gray-300 w-20 h-20 flex justify-center items-center border border-black"
                    >
                      {field.image ? (
                        <img
                          src={field.image}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">+</span>
                      )}
                    </label>
                    <input
                      type="file"
                      id={`coverPhoto-${index}`}
                      name={`coverPhoto-${index}`}
                      multiple
                      // accept="image/*"
                      style={{ display: "none" }}
                      onChange={(event) => handleImageChange(index, event)}
                    />
                  </div>

                  {inputFields.length > 1 && (
                    <button
                      type="button"
                      className="text-2xl text-red-500"
                      onClick={() => handleRemoveVariant(index)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
                <div>
                  {/* <input
                    ccept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                    onChange={(e) => handleMultipleImg(e, index)}
                    type="file"
                    multiple
                  /> */}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none mt-3 relative">
                      <input
                        name="images"
                        className="w-full "
                        id="images"
                        // accept="image/*"
                        multiple
                        type="file"
                        onChange={(e) => handleMultipleImg(e, index)}
                      />
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      {field?.variantImag?.map((image, i) => (
                        <div className="relative" key={i}>
                          <img
                            alt={`Image ${i + 1}`}
                            className="h-20 w-full border rounded-md object-cover"
                            src={image?.src}
                          />
                          <button
                            className="absolute top-1 right-1 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="button"
                            onClick={() => handleRemoveField(index, i)}
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Stock
                  field={field}
                  daraz={daraz}
                  index={index}
                  inputFields={inputFields}
                  setInputFields={setInputFields}
                />
               
                  <VariantData
                    inputFields={inputFields}
                    variantInput={variantInput}
                    index={index}
                    multiVendor={multiVendor}
                    setVariantInput={setVariantInput}
                    discount_10_present={discount_10_present}
                    discount_15_present={discount_15_present}
                    discount_20_present={discount_20_present}
                  />
               
              </div>
            </div>
          ))}
        {inputFields && (
          <button
            type="button"
            className="bg-green-500 py-2"
            onClick={handleAddField}
          >
            Add Field
          </button>
        )}
        
        {multiVendor === true && (
                <AdminCategoryforSeller />
                )}
        
        
      </div>
    </div>
  );
};

export default Variants;
