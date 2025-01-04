import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import uploadImage from "../SellerShopInfo/Upload.json";
import showAlert from "../../../Common/alert";
import MyCustomEditor from "../../../Hooks/MyCustomizeEditor";
import JoditEditor from "jodit-react";

const EditShopInfo = ({ Edit, setEdit }) => {
      const { setShopInfo, shopInfo } = useContext(AuthContext);

      const {def_courier, shopName, shopEmail,inventory, shopNumber,productNUmber, shopId, address, primary_color, footer_color, secounder_color,text_color_s, text_color,shopNote,dropAddress,orderEmail } = shopInfo;

      console.log(shopInfo,'inventoryc')
      const [primaryColor, setPrimaryColor] = useState(primary_color);
      const [footerColor, setFooterColor] = useState(footer_color);
      const [secondaryColor, setSecondaryColor] = useState(secounder_color);
      const [textColor, setTextColor] = useState(text_color);
      const [textColorS, setTextColorS] = useState(text_color_s);

      const [selectedCourier, setSelectedCourier] = useState(def_courier || "defult"); // Default value

      const handleCourierChange = (event) => {
        setSelectedCourier(event.target.value);
      };
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


      const [shopUnicName, setshopUnicName] = useState(shopId);
      const [errorName, setErrorName] = useState("");
      const [uniq, setUniq] = useState();
      const [drop, setDrop] = useState(dropAddress);
      const [orderEmailC, setorderEmailC] = useState(orderEmail);
      const [inventoryc, setInventoryC] = useState(inventory || false);
      const handleTogglex = (event) => {
            setDrop(event.target.checked); // Update the state with the current checked status
            console.log(drop,'sadfasdfsa')
          };
          const handleTogglexc = (event) => {
            setorderEmailC(event.target.checked); // Update the state with the current checked status
           
          };      console.log(inventoryc,'inventorycx')
          const handleToggleInventory = (event) => {
            setInventoryC(event.target.checked); // Update the state with the current checked status
            console.log(inventoryc,'inventorycx')
          
          };  
          
          
         
      const shopNameCheck = async (e) => {
            e.preventDefault();
            setErrorName();

            let name = e.target.value;
            name = name?.toLowerCase().replace(/\s+/g, "-");
            setshopUnicName(name);

            if (name.length > 2) {
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

      const [shopID, setShopID] = useState(false);

      const updateShopHandler = async (event) => {
            event.preventDefault();

            const updatedShopInfo = {
                  shopName: event.target.shopName.value,
                  shopNumber: event.target.shopNumber.value,
                  productNUmber: event.target.productNUmber.value,
                  shopNote: event.target.shopNote.value,
                  dropAddress: drop,
                  orderEmail:orderEmailC,
                  inventory:inventoryc,
                  def_courier:selectedCourier,
                  shopEmail: event.target.shopEmail.value,
                  address: event.target.address.value,
                  primary_color: event.target.primary_color.value,
                  footer_color: event.target.footer_color.value,
                  secounder_color: event.target.secounder_color.value,
                  text_color: event.target.text_color.value,
                  text_color_s: event.target.text_color_s.value,
            };
        

            shopInfo.shopName = updatedShopInfo.shopName;
            shopInfo.productNUmber = updatedShopInfo.productNUmber;
            shopInfo.shopNote = updatedShopInfo.shopNote;
            shopInfo.dropAddress = updatedShopInfo.dropAddress;
            shopInfo.inventory = updatedShopInfo.inventory;
            shopInfo.orderEmail = updatedShopInfo.orderEmail;
            shopInfo.shopEmail = updatedShopInfo.shopEmail;
            shopInfo.address = updatedShopInfo.address;
            shopInfo.primary_color = updatedShopInfo.primary_color;
            shopInfo.footer_color = updatedShopInfo.footer_color;
            shopInfo.secounder_color = updatedShopInfo.secounder_color;
            shopInfo.text_color = updatedShopInfo.text_color;
            shopInfo.text_color_s = updatedShopInfo.text_color_s;   
            shopInfo.def_courier = updatedShopInfo.def_courier;  
            console.log(shopInfo,updatedShopInfo,'updatedShopInfo')
            try {
                  if (shopID) {
                        shopInfo.shopId = shopUnicName;
                        fetch(`https://doob.dev/api/v1/shop/updateInfo`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(shopInfo),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    setShopInfo(data);
                                    const jsonData = JSON.stringify(data);

                                    document.cookie = `SellerShop=${encodeURIComponent(
                                          jsonData
                                    )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                                    showAlert("Updated!", "", "success");
                              });
                  } else {
                        fetch(`https://doob.dev/api/v1/shop/updateInfo`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(shopInfo),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    const jsonData = JSON.stringify(data);

                                    document.cookie = `SellerShop=${encodeURIComponent(
                                          jsonData
                                    )}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;

                                    showAlert("Updated!", "", "success");
                              });
                  }
            } catch (error) {
                  console.error("Error updating shopInfo:", error);
            }
      };

      // const fetchUpdatedShopInfo = async (updatedShopInfo) => {
      //     // Make a POST request to update shopInfo on the server
      //     try {
      //         // const response = await axios.post('/api/shops/update', updatedShopInfo);

      //     } catch (error) {
      //         console.error("Error updating shopInfo on the server:", error);
      //     }
      // };

      // const createNewShopInfo = async (updatedShopInfo) => {
      //     // Make a POST request to create new shopInfo on the server
      //     try {
      //         fetch(`https://doob.dev/api/v1/shop/updateInfo`, {
      //             method: 'PUT',
      //             headers: { 'Content-Type': 'application/json' },
      //             body: JSON.stringify(updatedShopInfo)
      //         })
      //             .then((res) => res.json())
      //             .then((data) => {
      //                Swal
      //             })
      //     } catch (error) {
      //         console.error("Error creating shopInfo on the server:", error);
      //     }
      // };

      return (
            <div>
                  <div className="flex">
                        <div className="w-full ">
                              <div
                                    
                              >
                                    <div className=" bg-white -lg shadow-xl p-8 mt-5">
                                          
                                          <div>
                                                <div className="my-4  bar overflow-y-scroll">
                                                      <form
                                                            onSubmit={updateShopHandler}
                                                            className=" grid grid-cols-12 gap-2"
                                                            action=" "
                                                      >
                                                            <div className="mb-4 col-span-6">
                                                                  <input
                                                                        type="text"
                                                                        name="shopName"
                                                                        defaultValue={shopName}
                                                                        placeholder="Name of Shop"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-6">
                                                                  <input
                                                                        type="email"
                                                                        name="shopEmail"
                                                                        defaultValue={shopEmail}
                                                                        placeholder="Email"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-6">
                                                                  <input
                                                                        type="number"
                                                                        name="shopNumber"
                                                                        defaultValue={shopNumber}
                                                                        placeholder="Phone Number"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-6">
                                                                  <input
                                                                        type="number"
                                                                        name="productNUmber"
                                                                        defaultValue={productNUmber}
                                                                        placeholder="Phone Number for product info"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                          
                                                            <div className="mb-4 text-left text-medium col-span-4" >
                                                                  {console.log(drop,'dropAddress')}
                                                                <label htmlFor="drodwon" className="flex items-center">
                                                                  <input
                                                                  className=" w-[20px] h-[20px] mr-2"
                                                                        type="checkbox"
                                                                        name="dropAddress"
                                                                        checked={drop}
                                                                        onClick={handleTogglex}
                                                                          id="drodwon"
                                                                  />
                                                                   
                                                                  City Shipping Info
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 text-left text-medium col-span-4" >
                                                                  {console.log(drop,'dropAddress')}
                                                                <label htmlFor="orderEmailC" className="flex items-center">
                                                                  <input
                                                                  className=" w-[20px] h-[20px] mr-2"
                                                                        type="checkbox"
                                                                        name="orderEmail"
                                                                        checked={orderEmailC}
                                                                        onClick={handleTogglexc}
                                                                          id="orderEmailC"
                                                                  />
                                                                   
                                                                 Email in Checkout
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 text-left text-medium col-span-4" >
                                                                  {console.log(drop,'dropAddress')}
                                                                <label htmlFor="inventoryc" className="flex items-center">
                                                                  <input
                                                                  className=" w-[20px] h-[20px] mr-2"
                                                                        type="checkbox"
                                                                        name="invetory"
                                                                        checked={inventoryc}
                                                                        onClick={handleToggleInventory}
                                                                          id="inventoryc"
                                                                  />
                                                                   
                                                                 I  don't want to manage inventory.
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 text-left text-medium col-span-4">
                                                                  <label htmlFor="Courier" className="flex items-center">
                                                                  Default Courier
                                                                  </label>
                                                                  <select
                                                                  name="courier"
                                                                  id="Courier"
                                                                  value={selectedCourier} // Bind value to state
                                                                  onChange={handleCourierChange}
                                                                  >
                                                                  <option value="Others">defult</option>
                                                                  <option value="Pathao">Pathao</option>
                                                                  <option value="Steadfast">Steadfast</option>
                                                                  </select>
                                                                  <p className="mt-2">Selected Courier: {selectedCourier}</p> {/* Display selected courier */}
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
                                                           
                                                            {shopID && (
                                                                  <div className="mb-4">
                                                                        <div className="relative">
                                                                              <input
                                                                                    required
                                                                                    onBlur={shopNameCheck}
                                                                                    type="text"
                                                                                    placeholder="Input Your Uniq Shop Name"
                                                                                    value={shopUnicName}
                                                                                    onChange={(e) => setshopUnicName(e.target.value)}
                                                                                    className={
                                                                                          uniq
                                                                                                ? "border-green-700 flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border  rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                                                                : " flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-red-500 rounded shadow-sm appearance-none md:mr-2 md:mb-0 placeholder:text-gray-700 focus:outline-none focus:shadow-outline"
                                                                                    }
                                                                              />
                                                                              {uniq && (
                                                                                    <span className="pointer-events-none absolute inset-y-0 text-green-500 font-bold end-0 grid w-10 place-content-center">
                                                                                          <Lottie
                                                                                                animationData={uploadImage}
                                                                                                loop={false}
                                                                                          />
                                                                                          {/* <GrStatusGood className=' bg-green-500 rounded-full font-bold' /> */}
                                                                                    </span>
                                                                              )}
                                                                        </div>
                                                                  </div>
                                                            )}
                                                            <div className="mb-4 col-span-12">
                                                                  <input
                                                                        type="text"
                                                                        name="address"
                                                                        defaultValue={address}
                                                                        placeholder="Shop Address"
                                                                        className="w-full border rounded-md py-2 px-3 "
                                                                  />
                                                            </div>
                                                            <div className="mb-4 col-span-12">
                                                                  <label htmlFor="">Product Note</label>
                                                            <JoditEditor  id="shopNote" name="shopNote" placeholder="Product Note" value={shopNote}   style={{
    resize: 'both', // Allow both horizontal and vertical resizing
    overflow: 'auto', // Allow scroll if content overflows
    minHeight: '50px', // Set minimum height
    maxHeight: '50px', // Set maximum height
  }}/>
                                                          
                                                                
                                                            </div>
                                                            <div className="flex justify-between">
                                                                  <button
                                                                        disabled={!uniq && shopID}
                                                                        type="submit"
                                                                        className="bg-blue-500  text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                                                                  >
                                                                        Submit
                                                                  </button>
                                                                  {/* {!shopID ? (
                                                                        <button
                                                                              type="button"
                                                                              onClick={() => setShopID(!shopID)}
                                                                        >
                                                                              I need to update my Store Id
                                                                        </button>
                                                                  ) : (
                                                                        <button
                                                                              type="button"
                                                                              onClick={() => {
                                                                                    setShopID(!shopID);
                                                                                    setshopUnicName(shopId);
                                                                              }}
                                                                        >
                                                                              I'm happy with my current Store Id
                                                                        </button>
                                                                  )} */}
                                                            </div>
                                                      </form>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default EditShopInfo;