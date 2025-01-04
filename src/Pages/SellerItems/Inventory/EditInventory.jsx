import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Select from "react-select";
import BrightAlert from "bright-alert";
import showAlert from "../../../Common/alert";

const EditInventory = ({ refetch, open, setOpen, data }) => {
      console.log("data", data);
      const [count, setCount] = useState(0);
      const { shopInfo } = useContext(AuthContext);

      const [selectedValue, setSelectedValue] = useState([]);
      const [variationQuantity, setVariationQuantity] = useState(null);
      const handleChange = (selectedOption) => {
            setSelectedValue(selectedOption);
            setVariationQuantity(selectedOption?.quantity);
      };

      const [selectStatusValue, setSelectStatusValue] = useState([]);

      const [note, setNote] = useState("");

      console.log(shopInfo, "....>>>");

      const handleIncrease = () => {
            setCount(parseInt(count) + 1);
      };

      const handleDecrease = () => {
            setCount(parseInt(count) - 1);
      };

      // console.log(count);
      // console.log(count);
      const handleSubmit = async (event) => {
            event.preventDefault();
            data.variations.map((variation, index) => {
                  const qty = event.target[`qty-${index}`].value; 

                  
            
            
                  const stock = {
                        productId: data._id,
                        shopInfo: {
                              logo: shopInfo?.logo,
                              phone: shopInfo?.shopNumber,
                              address: shopInfo?.address,
                              shopEmail: shopInfo?.shopEmail,
                              shopName: shopInfo?.shopName,
                              shopPhone: shopInfo?.shopPhone,
                        },
                        productInfo: {
                              name: data?.name,
                              price: data?.price,
                              image: data?.featuredImage?.src ?? data?.images[0]?.src,
                              quantity:variation.quantity ,
                              // image:,
                        },
                        warehouse: data?.warehouse,
                        date: new Date().getTime(),
                        quantity: qty,
                        shopId: data.shopId,
                        shopName: shopInfo.shopName,
                        adminWare: data?.adminWare,
                        SKU: variation?.SKU,
                        delivery_status: selectStatusValue?.value,
                        note,
                  };


                  fetch(`https://doob.dev/api/v1/admin/stock-request-create`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(stock),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              refetch();
                              setOpen(!open);
                              showAlert("stock request created", "", "success");
                        });
            });
      };

      const options = data?.variations?.map((item) => {

            return {
                  label: item?.SKU,
                  value: item?.SKU,
                  quantity: item?.quantity,
                  image: item?.image[0] ?? data?.images[0]?.src,
            };
      });

      const statusOptionsData = ["pending", "purchasing", "shipped", "received"];
      // console.log("options", options);

      const statusOptions = statusOptionsData?.map((item) => {
            return {
                  label: item,
                  value: item,
            };
      });


      const formatOptionLabel = ({ label, image }) => (
            <div className="flex items-center">
                  <img
                        src={image}
                        alt={label}
                        style={{ width: 30, height: 30, marginRight: 10, borderRadius: '50%' }}
                  />
                  {label}
            </div>
      );

      // console.log(note);

      return (
            <div className="fixed bg-[#000000a2] top-0 left-0 flex items-center justify-center w-screen h-screen z-[1000] text-start">
                  <div className="p-3 shadow-lg relative bg-white w-[500px] rounded-lg">
                        <form onSubmit={handleSubmit}>
                              <h2 className="text-lg pb-2 border-b font-semibold">Edit Quantity</h2>

                              <button
                                    onClick={() => setOpen(!open)}
                                    className="bg-gray-200 h-[30px] w-[30px] text-lg font-regular rounded-full flex items-center justify-center absolute right-2 top-2"
                              >
                                    x
                              </button>

                              <div className="my-3 h-[200px] overflow-scroll">
                                   
                                    {data?.variations?.map((variation, index) => (
                                          <div key={variation.SKU} className="mb-4 flex items-center border-b pb-2">

                                                <p className="flex gap-2 itmes-center"> 
                                                      <img className="w-[30px] h-[30px]" src={variation?.singleImg || variation?.image[0]?.src || variation?.image[0] } alt="" /> 
                                                    <div>
                                                   <p> {variation.SKU}</p>
                                                   <p> Current:{variation.quantity}</p>
                                                    </div>
                                                </p>
                                                {/* Input for price */}
                                                
                                                <div style={{flex:'1',textAlign:'right'}}>
                                                      
                                                      {/* <button
                                                            className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                                            onClick={handleDecrease}
                                                      >
                                                            -
                                                      </button> */}
                                                    
                                                      <input
                                                            name={`qty-${index}`}
                                                            type="number" // Set input type to number for better validation
                                                            placeholder={`+ or - your product quantity`}
                                                            className="w-[130px] py-2 border px-2 rounded text-center"
                                                      />
                                                      {/* <button
                                                      className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                                            onClick={handleIncrease}
                                                      >
                                                            +
                                                      </button> */}
                                                    
                                                </div>
                                               
                                                 
                                            
                                          </div>
                                    ))}
                                    
                              </div>

                              {
                                    <div className="">
                                          
                                          <textarea
                                                onChange={(e) => setNote(e.target.value)}
                                                name="note"
                                                type="text"
                                                className="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200"
                                                placeholder="Write your Note"
                                          />
                                    </div>
                              }

                              {
                                    <div className="my-3 flex gap-2">
                                          <label className="mb-1 text-lg" htmlFor="status">
                                                Select Status:
                                          </label>
                                          <div style={{flex:1}}>

                                          
                                          <Select 
                                                 
                                                required
                                                options={statusOptions}
                                                defaultValue={{'label':'pending','value':'pending'}}
                                                onChange={(value) => setSelectStatusValue(value)}
                                          />
                                          </div>
                                    </div>
                              }
                              <div>
                                    <br />
                                    {/* <div className="flex items-center ring-1 ring-gray-400 rounded-md">
                                          <button
                                                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                                onClick={handleDecrease}
                                          >
                                                -
                                          </button>
                                          <input
                                                onChange={(e) => setCount(e.target.value)}
                                                type="text"
                                                className="w-[400px] text-center"
                                                value={count}
                                          />
                                          <button
                                                className="cursor-pointer w-full bg-green-500 text-white p-2 rounded m-1 hover:bg-green-600"
                                                onClick={handleIncrease}
                                          >
                                                +
                                          </button>
                                    </div> */}

                                    <br />
                                    {/* Add similar structure for other fields */}
                                    <button
                                           
                                          type="submit"
                                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                          Save Changes
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default EditInventory;
