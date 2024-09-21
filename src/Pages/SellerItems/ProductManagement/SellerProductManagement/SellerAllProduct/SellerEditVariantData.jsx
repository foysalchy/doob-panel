import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import Stock from "../../SellerAddProduct/Components/Stock"; 
import showAlert from "../../../../../Common/alert";

const style = {
  input:
    "flex-grow px-2 h-10 w-full mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline",
  label: "mt-3 text-sm",
  cart: "flex  gap-3 border p-2 border-gray-300 bg-orange-100",
  cartContain: "",
};
const SellerEditVariantData = ({
  product,
  multiVendor,
  setMultiVendor,
  inputFields,
  setInputFields,
  daraz,
  variantInput,
  setVariantInput,
}) => {
  const { shopInfo } = useContext(AuthContext);

 

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

  const [multipleImg, setMultipleImg] = useState([]);

  const ImageUpload = async (image) => {
    const imageBlob = new Blob([image], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", imageBlob);

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
      const imageUrl = imageData.url;
      if (!imageUrl) {
        showAlert(`${imageData.message}`, "", "warning");
      }
      return imageUrl;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const Upload = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://doob.dev/api/v1/image/upload-image`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Origin: "https://doob.dev/api/v1/image/upload-image",
      },
      body: formData,
    });
    const imageData = await res.json();
    const imageUrl = imageData.imageUrl;
    return imageUrl;
  };

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
        variantImag: [], // Initialize as an empty array
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

  const handleRemoveField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  // const handleMultipleImg = async (e, index) => {
  //   const imgs = e.target.files;
  //   let imgUrls = [];
  //   for (let i = 0; i < imgs.length; i++) {
  //     const img = imgs[i];
  //     const url = await Upload(img);
  //     imgUrls.push({ src: url });
  //   }

  //   const newInputFields = [...inputFields];
  //   newInputFields[index].variantImag = imgUrls;
  //   setInputFields(newInputFields);
  // };


  // const handleMultipleImg = async (e, index) => {
  //   const imgs = e.target.files;
  //   let imgUrls = [];
  //   for (let i = 0; i < imgs.length; i++) {
  //     const img = imgs[i];
  //     const url = await Upload(img);
  //     imgUrls.push({ src: url });
  //   }
  //   const newInputFields = [...inputFields];
  //   newInputFields[index].variantImag = [
  //     ...newInputFields[index].variantImag,
  //     ...imgUrls,
  //   ];
  //   setInputFields(newInputFields);
  // };



  const handleMultipleImg = async (e, index) => {
    const imgs = e.target.files;
    let imgUrls = [];

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const url = await Upload(img);
      imgUrls.push({ src: url });
    }

    const newInputFields = [...inputFields];
    newInputFields[index].variantImag = [
      ...(newInputFields[index].variantImag || []), // Ensure existing images are preserved
      ...imgUrls,
    ];

    setInputFields(newInputFields);
  };


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
  
  const handleDeleteImage = (index, imgIndex) => {
    const newInputFields = [...inputFields];
    newInputFields[index].variantImag.splice(imgIndex, 1);
    setInputFields(newInputFields);
  };
  console.log('datxxa:::', inputFields,);

  return (
    <div className=" border mt-4 border-gray-400 md:px-10 px-3 py-5 pb-16 w-full bg-gray-100 rounded">
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
            <div key={index + 1}>
              {console.log('BUG,,,', field)}
              <div
                key={index}
                className=" border border-green-300 rounded px-4 py-2  w-full"
              >
                {" "}
                <div className="flex gap-10 justify-between items-center">
                  <div className="w-full">
               
                <CreatableSelect
                      name={`name-${index}`}
                      value={
                        colourOptions.find(option => option.value === field?.name) ||
                        { value: field?.name, label: field?.name } // Inline default value
                      }
                       
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
                      options={[
                        ...colourOptions,
                        // Inline addition of default option if it’s not already in options
                        ...(colourOptions.find(option => option.value === (field?.name || "default")) ? [] : [{ value: field?.name || "default", label: field?.name || "Default Value" }])
                      ]}
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
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(event) => handleImageChange(index, event)}
                    />
                  </div>
                  {console.log('debuging data::::', field?.variantImag)}


                  {inputFields.length > 1 && (
                    <button
                      type="button"
                      className="text-2xl text-red-500"
                      onClick={() => handleRemoveField(index)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
                <div>
                  <input
                    ccept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/heic"
                    onChange={(e) => handleMultipleImg(e, index)}
                    type="file"
                    multiple
                  />
                </div>
                {/* variation image */}
                <ul className="mt-3 flex items-center gap-2 flex-wrap">
                  {field?.variantImag?.map((itm, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={itm?.src}
                        className="w-16 h-16 border border-black rounded"
                        alt={`Variant ${imgIndex}`}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => handleDeleteImage(index, imgIndex)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  ))}
                </ul>

                <Stock
                  field={field}
                  daraz={daraz}
                  index={index}
                  inputFields={inputFields}
                  setInputFields={setInputFields}
                />
              </div>
              {!product?.oldId && (
                <div>
              {multiVendor === true && (
          <div className="grid grid-cols-3 gap-2">
            <div className={` border p-2 border-gray-300 bg-orange-100`}>
              <h4 className="text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2">
                Slot. 1
              </h4>

              <div className={`flex gap-3 `}>
                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Quantity
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      console.log(newInputFields, ">>>>>>");
                      newInputFields[index].product1.quantity = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    type="number"
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product1?.quantity
                        ? product?.variantData?.[index]?.product1?.quantity
                        : 1
                    }
                    className={style.input}
                  />
                </div>

                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Price{index},,,,
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      newInputFields[index].product1.quantityPrice = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    type="text"
                    // defaultValue={1}
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product1?.quantityPrice
                        ? product?.variantData?.[index]?.product1?.quantityPrice
                        : 1
                    }
                    className={style.input}
                  />
                </div>
              </div>
            </div>

            <div className={`border p-2 border-gray-300 bg-orange-100`}>
              <h4 className="text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2">
                Slot 2
              </h4>
              <div className="flex gap-3">
                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Quantity
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      newInputFields[index].product2.quantity = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product2?.quantity
                        ? product?.variantData?.[index]?.product2?.quantity
                        : 50
                    }
                    type="text"
                    // defaultValue={50}
                    className={style.input}
                  />
                </div>

                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Price
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      newInputFields[index].product2.quantityPrice = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    type="text"
                    // defaultValue={1}
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product2?.quantityPrice
                        ? product?.variantData?.[index]?.product2?.quantityPrice
                        : 1
                    }
                    className={style.input}
                  />
                </div>
              </div>
            </div>

            <div className={`border p-2 border-gray-300 bg-orange-100`}>
              <h4 className="text-center pb-2 border-b font-semibold text-black border-gray-500 mb-2">
                Slot 3
              </h4>
              <div className="flex gap-3">
                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Quantity
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      newInputFields[index].product3.quantity = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product3?.quantity
                        ? product?.variantData?.[index]?.product3?.quantity
                        : 50
                    }
                    type="text"
                    // defaultValue={50}
                    className={style.input}
                  />
                </div>

                <div>
                  <label className={style.label} htmlFor="">
                    {" "}
                    Price
                  </label>
                  <input
                    onChange={(e) => {
                      const newInputFields = { ...variantInput };
                      newInputFields[index].product3.quantityPrice = e.target.value;
                      setVariantInput(newInputFields);
                    }}
                    type="text"
                    // defaultValue={1}
                    defaultValue={
                      product?.variantData &&   product?.variantData?.[index]?.product3?.quantityPrice
                        ? product?.variantData?.[index]?.product3?.quantityPrice
                        : 1
                    }
                    className={style.input}
                  />
                </div>
              </div>
            </div>

           
          </div>
        )} </div>)}
         <div className="grid grid-cols-2 gap-2">

          <div className={style.cart}>
              <div>
                <label className={style.label} htmlFor="">
                  Selling Recommended Price
                </label>
                <input
                  onChange={(e) => {
                    const newInputFields = { ...variantInput };
                    newInputFields[index].sellingPrice = e.target.value;
                    console.log(newInputFields);
                    setVariantInput(newInputFields);
                  }}
                  type="text"
                  // defaultValue={1}
                  defaultValue={
                    product?.variantData &&   product?.variantData?.[index]?.sellingPrice
                      ? product?.variantData?.[index]?.sellingPrice
                      : 1
                  }
                  className={style.input}
                />
              </div>
            </div>
            <div className={style.cart}>
          <div>
            <label className={style.label} htmlFor="">
              Product costs{" "}
            </label>
            <input
              onChange={(e) => {
                const newInputFields = { ...variantInput };
                newInputFields[index].ProductCost = e.target.value;
                setVariantInput(newInputFields);
              }}
              type="text"
              // defaultValue={1}
              defaultValue={
                product?.variantData &&  product?.variantData?.[index]?.ProductCost
                  ? product?.variantData?.[index]?.ProductCost
                  : 1
              }
              className={style.input}
            />
          </div>
        </div>

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
      



        

        
      </div>
    </div>
  );
};

export default SellerEditVariantData;
