import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import uploadImage from "../SellerShopInfo/Upload.json";
import showAlert from "../../../Common/alert";
import MyCustomEditor from "../../../Hooks/MyCustomizeEditor";
import JoditEditor from "jodit-react";
import { useQuery } from "@tanstack/react-query";
const EditShopInfo = ({ Edit, setEdit }) => {
      const { setShopInfo, shopInfo } = useContext(AuthContext);

      const {checkout_note,def_courier, shopName,slogan,bio, shopEmail,inventory, shopNumber,productNUmber, shopId, address, primary_color, footer_color, secounder_color,text_color_s, text_color,shopNote,dropAddress,orderEmail } = shopInfo;
      const {
            data: shop = {},
      } = useQuery({
            queryKey: ["shop"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/site-user/domain-info?domain=${shopInfo.subDomain}`
                  );
                  const data = await res.json();
                  setShopInfo(data)

                  
            },
      });
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
            { name: 'Theme 1', primary: '#1e90ff', text_primary: '#ffffff', secondary: '#32cd32', text_secondary: '#000000', footer: '#ff6347' },
            { name: 'Theme 2', primary: '#ff1493', text_primary: '#ffffff', secondary: '#dda0dd', text_secondary: '#000000', footer: '#20b2aa' },
            { name: 'Theme 3', primary: '#ff8c00', text_primary: '#ffffff', secondary: '#6a5acd', text_secondary: '#ffffff', footer: '#4682b4' },
            { name: 'Theme 4', primary: '#4caf50', text_primary: '#ffffff', secondary: '#ffeb3b', text_secondary: '#000000', footer: '#9c27b0' },
            { name: 'Theme 5', primary: '#3f51b5', text_primary: '#ffffff', secondary: '#e91e63', text_secondary: '#ffffff', footer: '#607d8b' },
            { name: 'Theme 6', primary: '#009688', text_primary: '#ffffff', secondary: '#cddc39', text_secondary: '#000000', footer: '#795548' },
            { name: 'Theme 7', primary: '#673ab7', text_primary: '#ffffff', secondary: '#03a9f4', text_secondary: '#000000', footer: '#ff5722' },
            { name: 'Theme 8', primary: '#00bcd4', text_primary: '#000000', secondary: '#ffc107', text_secondary: '#000000', footer: '#8bc34a' },
            { name: 'Theme 9', primary: '#ff5722', text_primary: '#ffffff', secondary: '#9e9e9e', text_secondary: '#000000', footer: '#2196f3' },
            { name: 'Theme 10', primary: '#9c27b0', text_primary: '#ffffff', secondary: '#4caf50', text_secondary: '#ffffff', footer: '#3f51b5' }
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
      const [noteCheckc, setnoteCheckc] = useState(checkout_note || false);
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
          const handleToggleNoteCheckout = (event) => {
            setnoteCheckc(event.target.checked); // Update the state with the current checked status
            
          
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
                  slogan: event.target.slogan.value,
                  bio: event.target.bio.value,
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
                  weight :event.target.weight.value,
                  item_charge :event.target.item_charge.value,
                  inside :event.target.dhaka.value,
                  outside: event.target.outdhaka.value, 
                  combo_price: event.target.combo_price.value, 
                  combo_qty: event.target.combo_qty.value, 

                  bank: event.target.bank.value, 
                  account_number: event.target.account_number.value, 
                  account_name: event.target.account_name.value, 
                  bkash: event.target.bkash.value, 
                  nagad: event.target.nagad.value, 
                  rocket: event.target.rocket.value, 
            };
            
          
        
            
            shopInfo.bank = updatedShopInfo.bank;
            shopInfo.account_number = updatedShopInfo.account_number;
            shopInfo.account_name = updatedShopInfo.account_name;
            shopInfo.bkash = updatedShopInfo.bkash;
            shopInfo.nagad = updatedShopInfo.nagad;
            shopInfo.rocket = updatedShopInfo.rocket;

            shopInfo.combo_qty = updatedShopInfo.combo_qty;
            shopInfo.combo_price = updatedShopInfo.combo_price;
            shopInfo.weight = updatedShopInfo.weight;
            shopInfo.item_charge = updatedShopInfo.item_charge;
            shopInfo.inside = updatedShopInfo.inside;
            shopInfo.outside = updatedShopInfo.outside;
            shopInfo.shopName = updatedShopInfo.shopName;
            shopInfo.slogan = updatedShopInfo.slogan;
            shopInfo.bio = updatedShopInfo.bio;
            shopInfo.productNUmber = updatedShopInfo.productNUmber;
            shopInfo.shopNumber = updatedShopInfo.shopNumber;
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
            shopInfo.checkout_note = noteCheckc;  
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
                                                             <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">ShopInfo</label></div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                                  <label className="mb-2 block text-gray-500" htmlFor="">Your Shop Name</label>
                                                                  <input
                                                                        type="text"
                                                                        name="shopName"
                                                                        defaultValue={shopName}
                                                                        placeholder="Name of Shop"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                                  <label className="mb-2 block text-gray-500" htmlFor="">Shop Slogan</label>
                                                                  <input
                                                                        type="text"
                                                                        name="slogan"
                                                                        defaultValue={slogan}
                                                                        placeholder="slogan"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                                  <label className="mb-2 block text-gray-500" htmlFor="">Shop Bio</label>
                                                                  <input
                                                                        type="text"
                                                                        name="bio"
                                                                        defaultValue={bio}
                                                                        placeholder="bio"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                           
                                                            
                                                           
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Contact & Top Nav</label></div>
                                                                
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                            <label className="mb-2 block text-gray-500" htmlFor="">Your Email Address  </label>

                                                                  <input
                                                                        type="email"
                                                                        name="shopEmail"
                                                                        defaultValue={shopEmail}
                                                                        placeholder="Email"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                            <label className="mb-2 block text-gray-500" htmlFor="">Your Shop Phone Number</label>

                                                                  <input
                                                                        type="number"
                                                                        name="shopNumber"
                                                                        defaultValue={shopNumber}
                                                                        placeholder="Phone Number"
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 text-left text-medium md:col-span-12 col-span-12">
                                                            <label htmlFor="Courier" className="flex items-center">
                                                                  Shop Address  
                                                                  </label>
                                                                  <input
                                                                        type="text"
                                                                        name="address"
                                                                        defaultValue={address}
                                                                        placeholder="Shop Address"
                                                                        className="w-full border rounded-md py-2 px-3 "
                                                                  />
                                                            </div>
               
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Product Page Info</label></div>
                                                                

               
                                                            <div className="mb-4 md:col-span-12 col-span-12">
                                                            <label className="mb-2 block text-gray-500" htmlFor="">Product Page Phone Number</label>

                                                                  <input
                                                                        type="number"
                                                                        name="productNUmber"
                                                                        defaultValue={productNUmber}
                                                                        placeholder="Phone Number for product info"
                                                                        className="w-full border rounded-md py-2 px-3"
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
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Checkout & Inventory Manage Options</label></div>
                                                                

                                                          
                                                            <div className="mb-4 text-left text-medium md:col-span-4 col-span-12" >
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
                                                                   
                                                                  Enable Dordown Address Option
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 text-left text-medium md:col-span-4 col-span-12" >
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
                                                                   
                                                                 Email  Skip Option
                                                                </label>
                                                            </div>
                                                              
                                                            <div className="mb-4 text-left text-medium md:col-span-4 col-span-12" >
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
                                                            <div className="mb-4 text-left text-medium md:col-span-4 col-span-12" >
                                                                <label htmlFor="noteCheckc" className="flex items-center">
                                                                  <input
                                                                  className=" w-[20px] h-[20px] mr-2"
                                                                        type="checkbox"
                                                                        name="noteCheck"
                                                                        checked={noteCheckc}
                                                                        onClick={handleToggleNoteCheckout}
                                                                          id="noteCheckc"
                                                                  />
                                                                   
                                                                  Note Field In Checkout
                                                                </label>
                                                            </div>
                                                            

                                                            
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Shipping Fee Setup</label></div>
                                                            <div className="col-span-12 grid md:grid-cols-5 grid-cols-1 gap-6 mt-4">
                                                                  <div className="mb-4 text-left text-medium ">
                                                                        <label htmlFor="Courier" className="flex items-center">
                                                                        Default Courier
                                                                        </label>
                                                                        <select
                                                                              name="courier"
                                                                              id="Courier"
                                                                              value={selectedCourier} // Bind value to state
                                                                              onChange={handleCourierChange}
                                                                              className="w-full border rounded-md py-2 px-3"
                                                                        >
                                                                        <option value="Others">defult</option>
                                                                        <option value="Pathao">Pathao</option>
                                                                        <option value="Steadfast">Steadfast</option>
                                                                        </select>
                                                                        
                                                                  </div>
                                                            
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                                                              1KG+ Charge
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="priceRole"
                                                                              type="number"
                                                                              name="weight"
                                                                              defaultValue={shopInfo.weight}
                                                                              placeholder="Enter To value"
                                                                        />
                                                                  </div>
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                                                              Extra Item Charge
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="item_charge"
                                                                              type="number"
                                                                              name="item_charge"
                                                                              defaultValue={shopInfo.item_charge}
                                                                              placeholder="Enter To value"
                                                                        />
                                                                  </div>


                                                           
 

                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                                                              Inside Dhaka
                                                                        </label>
                                                                        <input
                                                                              
                                                                              defaultValue={shopInfo.inside}
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="priceRole"
                                                                              type="number"
                                                                              name="dhaka"
                                                                              placeholder="Enter price range"
                                                                        />
                                                                  </div>
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRole">
                                                                              Outside Dhaka
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="priceRole"
                                                                              defaultValue={shopInfo.outside}
                                                                              type="number"
                                                                              name="outdhaka"
                                                                              placeholder="Enter price range"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Bulk Quantity and amount discount  </label></div>
                                                            <div className="col-span-12 grid md:grid-cols-5 grid-cols-1 gap-6 mt-4">
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="combo_qty">
                                                                              Quantity  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="combo_qty"
                                                                              defaultValue={shopInfo.combo_qty}
                                                                              type="number"
                                                                              name="combo_qty"
                                                                              placeholder="Enter Qty"
                                                                        />
                                                                  </div>
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="combo_price">
                                                                              Price  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="combo_price"
                                                                              defaultValue={shopInfo.combo_price}
                                                                              type="number"
                                                                              name="combo_price"
                                                                              placeholder="Enter Price"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Withdraw Method</label></div>
                                                            <div className="col-span-12 grid md:grid-cols-3 grid-cols-1 gap-6 mt-4">
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="combo_qty">
                                                                              Bkash  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="bkash"
                                                                              defaultValue={shopInfo.bkash}
                                                                              type="number"
                                                                              name="bkash"
                                                                              placeholder="Enter Account"
                                                                        />
                                                                  </div> 
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nagad">
                                                                              Nagad  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="nagad"
                                                                              defaultValue={shopInfo.nagad}
                                                                              type="number"
                                                                              name="nagad"
                                                                              placeholder="Enter Account"
                                                                        />
                                                                  </div>
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rocket">
                                                                              Rocket  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="rocket"
                                                                              defaultValue={shopInfo.rocket}
                                                                              type="number"
                                                                              name="rocket"
                                                                              placeholder="Enter Account"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <div className="col-span-12 grid md:grid-cols-3 grid-cols-1 gap-6 mt-4">
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">
                                                                              Bank Name  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="bank"
                                                                              defaultValue={shopInfo.bank}
                                                                              type="text"
                                                                              name="bank"
                                                                              placeholder="Bank Name"
                                                                        />
                                                                  </div>
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account_name">
                                                                              Account Name  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="account_name"
                                                                              defaultValue={shopInfo.account_name}
                                                                              type="text"
                                                                              name="account_name"
                                                                              placeholder="Account Name  "
                                                                        />
                                                                  </div> 
                                                                  <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account_number">
                                                                              Account Number  
                                                                        </label>
                                                                        <input
                                                                              
                                                                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                              id="account_number"
                                                                              defaultValue={shopInfo.account_number}
                                                                              type="number"
                                                                              name="account_number"
                                                                              placeholder="Enter Account"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Select a Theme</label></div>
                                                               
                                                            <div className="mb-4 col-span-12">
                                                                 
                                                                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-4">
                                                                        {colorPalettes.map((palette, index) => (
                                                                              <div
                                                                                    key={index}
                                                                                    className="cursor-pointer bg-[#80808038] border rounded-md p-4 hover:shadow-lg transition-shadow"
                                                                                    onClick={() => handlePaletteChange(palette)}
                                                                              >
                                                                                    <div className="flex space-x-2 text-center">
                                                                                          <div style={{flex:1}}>
                                                                                                <div
                                                                                                      className="border h-12 w-[100%] rounded"
                                                                                                      style={{ backgroundColor: palette.primary }}
                                                                                                      title={`Primary: ${palette.primary}`}
                                                                                                ></div>
                                                                                                Primary
                                                                                          </div>
                                                                                          <div style={{flex:1}}>
                                                                                                <div
                                                                                                      className="h-12 border w-[100%] rounded"
                                                                                                      style={{ backgroundColor: palette.text_primary }}
                                                                                                      title={`Primary: ${palette.text_primary}`}
                                                                                                ></div>
                                                                                                Primary Text
                                                                                          </div>
                                                                                          <div style={{flex:1}}>
                                                                                                <div
                                                                                                      className="h-12 border w-[100%] rounded"
                                                                                                      style={{ backgroundColor: palette.secondary }}
                                                                                                      title={`Secondary: ${palette.secondary}`}
                                                                                                ></div>
                                                                                                Secondary
                                                                                          </div>
                                                                                          <div style={{flex:1}}>
                                                                                                <div
                                                                                                      className="h-12 border w-[100%] rounded"
                                                                                                      style={{ backgroundColor: palette.text_secondary }}
                                                                                                      title={`Primary: ${palette.text_secondary}`}
                                                                                                ></div>
                                                                                                2nd Text

                                                                                          </div>
                                                                                          <div style={{flex:1}}>
                                                                                                <div
                                                                                                      className="h-12 border w-[100%] rounded"
                                                                                                      style={{ backgroundColor: palette.footer }}
                                                                                                      title={`Footer: ${palette.footer}`}
                                                                                                ></div>
                                                                                                Footer
                                                                                          </div>
                                                                                    </div>
                                                                                    <div className="mt-2 text-center text-sm font-medium">{palette.name}</div>
                                                                              </div>
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                            

                                                            <div className="col-span-12 mb-2 bg-black text-white text-center px-2 py-2"><label htmlFor="">Selected Theme Colour</label></div>
                                                                

                                                            {/* Individual color inputs */}
                                                            <div className="mb-4 md:col-span-4 col-span-12">
                                                                  <div>Primary colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="primary_color"
                                                                        value={primaryColor}
                                                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-4 col-span-12">
                                                                  <div>Text colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="text_color"
                                                                        value={textColor}
                                                                        onChange={(e) => setTextColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-4 col-span-12">
                                                                  <div>Footer colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="footer_color"
                                                                        value={footerColor}
                                                                        onChange={(e) => setFooterColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
                                                                  <div>Secondary colour</div>
                                                                  <input
                                                                        type="color"
                                                                        name="secounder_color"
                                                                        value={secondaryColor}
                                                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                                                        className="w-full border rounded-md py-2 px-3"
                                                                  />
                                                            </div>
                                                            <div className="mb-4 md:col-span-6 col-span-12">
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