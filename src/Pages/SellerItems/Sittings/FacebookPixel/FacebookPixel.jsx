import React, { useContext, useState ,useEffect} from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import showAlert from "../../../../Common/alert";
import { gapi } from "gapi-script"; // Google API client

const FacebookPixel = () => {
      const [pixel, setPixel] = useState("");
      const [google, setGoogle] = useState("");
      const { shopInfo } = useContext(AuthContext);

      const { data: seller_facebook_pixel = {}, refetch } = useQuery({
            queryKey: ["seller-facebook-pixel"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-facebook-id?shopId=${shopInfo.shopId}`
                  );
                  const data = await res.json();
                  setPixel(data.data.pixel);
                  setGoogle(data.data.google);
                  return data.data;
            },
      });

      console.log(seller_facebook_pixel);

      const handleChange = (e) => {
            setPixel(e.target.value);
      };
      const handleChangeg = (e) => {
            setGoogle(e.target.value);
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const data = { pixel: pixel, google: google, shopId: shopInfo.shopId };
            fetch("https://doob.dev/api/v1/seller/update-facebook-id", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("success", "", "success");
                        setPixel("");
                        refetch()
                  });
      };
      const [isSignedIn, setIsSignedIn] = useState(false);
 const {
            data: products = [],
           
            isLoading: loadingData,
      } = useQuery({
            queryKey: ["products"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/all-products/${shopInfo._id}`
                  );
                  const data = await res.json();
                  return data;
            },
      });
      useEffect(() => {
        // Load the Google API client after the component mounts
        gapi.load("client:auth2", initClient);
      }, []);
      const initClient = () => {
            gapi.client.init({
              apiKey: "AIzaSyDxjTqa9CkHnHipXd6_-vGiOCHX_ZSv1FE",
              clientId: "296250016636-lsml91cgmf1qufql35ba3afm79tvqfv2.apps.googleusercontent.com",
              scope: "https://www.googleapis.com/auth/spreadsheets",
              discoveryDocs: [
                "https://sheets.googleapis.com/$discovery/rest?version=v4",
              ],
            }).then(() => {
              const authInstance = gapi.auth2.getAuthInstance();
              setIsSignedIn(authInstance.isSignedIn.get());
              authInstance.isSignedIn.listen(setIsSignedIn);
            });
          };
        
          // Function to authenticate user
          const handleSignIn = () => {
            gapi.auth2.getAuthInstance().signIn();
          };
        
          // Function to sign out user
          const handleSignOut = () => {
            gapi.auth2.getAuthInstance().signOut();
          };
          const createNewSheetWithHeaders = async () => {
            let sheet_id = seller_facebook_pixel.sheetKey;
            const headers = [
              "id",
              "title",
              "description",
              "availability",
              "condition",
              "price",
              "sale_price",
              "link",
              "image_link",
              'additional_image_link',
              "brand",
              "product_type",
              "item_group_id",
              "color",
              "size",
            ]; 
        

           


           
            // Sample data to add under the headers
            let i = 1;
            const values = products.flatMap(product =>
                  product.variations.map(variant => {
                    const imageSources2 = product.images.map(img => img.src || img.split(',')[0]).join(',');
                    let imageSources;
                  const imageSources1 = variant.image && variant.image.length > 0
                      ? variant.image.map(img => img.src || img.split(',')[0]).join(',') // Create a comma-separated string of images
                      : product?.featuredImage?.src || "";
                      if(i==1){
                         imageSources = imageSources1 + (imageSources1 && imageSources2 ? ',' : '') + imageSources2;
                      }else{
                         imageSources = imageSources1
                      }
                  // Combine both image sources
                
                    i++;
              
                      return [
                          `${product._id || ""}${Math.floor(10 + Math.random() * 999)}`,
                          `"${product.name.replace(/"/g, '""') || ""}"`, // Wrap title in quotes and escape any internal quotes
                          `"${(product.shortDescription || product.description || "").replace(/"/g, '""')}"`, // Wrap description in quotes
                          shopInfo.inventory === true ? "in stock" : product.stock_quantity > 0 ? "in stock" : "out of stock",
                          "new", // Product condition
                          `${variant.price || variant.offerPrice} BDT`, // Price with currency
                          `${variant.offerPrice || variant.price} BDT`, // Price with currency // Offer price with currency
                          shopInfo?.domain
                              ? `https://${shopInfo.domain}/product/${product._id}`
                              : `https://${shopInfo.subDomain}/product/${product._id}`,
                              variant.image && variant.image.length > 0
                              ? variant.image[0].src || variant.image[0].split(',')[0] // Variant image, fallback to the first image or product featured image
                              : product?.featuredImage?.src,
                          imageSources, // Add the comma-separated image sources here
                          product.brandName || "No Brand", // Brand name
                          `"${(product.categories || []).map(cat => cat?.name).join(" > ").replace(/"/g, '""') || ""}"`, // Wrap category hierarchy in quotes
                          product._id || "", // Product ID
                          variant.name,
                          variant.size || "",
                      ];
                  })
              );
              
            console.log(values,'headers')
            
          
            // Get the auth instance and check if the user is signed in
            const auth = gapi.auth2.getAuthInstance();
            if (!auth.isSignedIn.get()) {
              alert("Please sign in to Google first.");
              return;
            }
          console.log(seller_facebook_pixel.sheetKey,'inner hit 2')
            try {
                  console.log('inner hit')
              // Step 1: Create a new Google Spreadsheet if needed
              if (!seller_facebook_pixel.sheetKey) {
                  console.log('outer hit')
                const createResponse = await gapi.client.sheets.spreadsheets.create({
                  properties: {
                    title: "New Spreadsheet with Headersx",
                  },
                });
                // Get the newly created spreadsheet ID
                sheet_id = createResponse.result.spreadsheetId;


                const data = { pixel: pixel, google: google,sheetKey:sheet_id, shopId: shopInfo.shopId };
                fetch("https://doob.dev/api/v1/seller/update-facebook-id", {
                      method: "PATCH",
                      headers: {
                            "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                })
                      .then((res) => res.json())
                      .then((data) => {
                            showAlert("success", "", "success");
                            setPixel("");
                            refetch()
                      });
                console.log(`Created new spreadsheet with ID: ${sheet_id}`);
             
            
                 
            }
              // Step 3: Add headers to the new sheet
              const range = `Sheet1!A1`; // Starting from the top-left corner of the new sheet
              await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: sheet_id,
                range,
                valueInputOption: "RAW",
                values: [headers],  // Only the header row
              });
             
          
              // Step 4: Add values under the headers
              const dataRange = `Sheet1!A2`; // Start inserting values from the second row
              await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: sheet_id,
                range: dataRange,
                valueInputOption: "RAW",
                values, // Insert the data rows here
              });
              
              alert("New sheet created with headers and data!");
            } catch (error) {
              console.error("Error creating new sheet:", error);
              alert("Error creating new sheet. Please try again.");
            }
          };
          console.log(shopInfo?.shopName,'shopInfo')
          const createNewSheetWithHeadersX = async () => {
            let sheet_id = seller_facebook_pixel.sheetKey;
            const headers = [
            "id",
              "title",
              "description",
              "availability",
              "condition",
              "price",
              "sale_price",
              "link",
              "image_link",
              'additional_image_link',
              "brand",
              "product_type",
              "item_group_id",
              "color",
              "size",
            ]; 
           
            // Sample data to add under the headers
            let i = 1;
            const values = products.flatMap(product =>
                  product.variations.map(variant => {
                    const imageSources2 = product.images.map(img => img.src || img.split(',')[0]).join(',');
                    let imageSources;
                  const imageSources1 = variant.image && variant.image.length > 0
                      ? variant.image.map(img => img.src || img.split(',')[0]).join(',') // Create a comma-separated string of images
                      : product?.featuredImage?.src || "";
                      if(i==1){
                         imageSources = imageSources1 + (imageSources1 && imageSources2 ? ',' : '') + imageSources2;
                      }else{
                         imageSources = imageSources1
                      }
                  // Combine both image sources
                
                    i++;
                      return [
                          `${product._id || ""}${Math.floor(10 + Math.random() * 999)}`,
                          `"${product.name.replace(/"/g, '""') || ""}"`, // Wrap title in quotes and escape any internal quotes
                          `"${(product.shortDescription || product.description || "").replace(/"/g, '""')}"`, // Wrap description in quotes
                          shopInfo.inventory === true ? "in stock" : product.stock_quantity > 0 ? "in stock" : "out of stock",
                          "new", // Product condition
                          `${variant.price || variant.offerPrice} BDT`, // Price with currency
                          `${variant.offerPrice || variant.price} BDT`, // Price with currency // Offer price with currency
                          shopInfo?.domain
                              ? `https://${shopInfo.domain}/product/${product._id}`
                              : `https://${shopInfo.subDomain}/product/${product._id}`,
                              variant.image && variant.image.length > 0
                              ? variant.image[0].src || variant.image[0].split(',')[0] // Variant image, fallback to the first image or product featured image
                              : product?.featuredImage?.src,
                          imageSources, // Add the comma-separated image sources here
                          product.brandName || "No Brand", // Brand name
                          `"${(product.categories || []).map(cat => cat?.name).join(" > ").replace(/"/g, '""') || ""}"`, // Wrap category hierarchy in quotes
                          product._id || "", // Product ID
                          variant.name,
                          variant.size || "",
                      ];
                  })
              );
            console.log(values,'headers')
            
          
            // Get the auth instance and check if the user is signed in
            const auth = gapi.auth2.getAuthInstance();
            if (!auth.isSignedIn.get()) {
              alert("Please sign in to Google first.");
              return;
            }
          console.log(seller_facebook_pixel.sheetKey,'inner hit 2')
            try {
                  console.log('inner hit')
              // Step 1: Create a new Google Spreadsheet if needed
              if (1==1) {
                  console.log('outer hit')
                const createResponse = await gapi.client.sheets.spreadsheets.create({
                  properties: {
                    title: shopInfo?.shopName+" Product Catalouge",
                  },
                });
                // Get the newly created spreadsheet ID
                sheet_id = createResponse.result.spreadsheetId;


                const data = { pixel: pixel, google: google,sheetKey:sheet_id, shopId: shopInfo.shopId };
                fetch("https://doob.dev/api/v1/seller/update-facebook-id", {
                      method: "PATCH",
                      headers: {
                            "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                })
                      .then((res) => res.json())
                      .then((data) => {
                            showAlert("success", "", "success");
                            setPixel("");
                            refetch()
                      });
                console.log(`Created new spreadsheet with ID: ${sheet_id}`);
             
            
                 
            }
              // Step 3: Add headers to the new sheet
              const range = `Sheet1!A1`; // Starting from the top-left corner of the new sheet
              await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: sheet_id,
                range,
                valueInputOption: "RAW",
                values: [headers],  // Only the header row
              });
             
          
              // Step 4: Add values under the headers
              const dataRange = `Sheet1!A2`; // Start inserting values from the second row
              await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: sheet_id,
                range: dataRange,
                valueInputOption: "RAW",
                values, // Insert the data rows here
              });
              
              alert("New sheet created with headers and data!");
            } catch (error) {
              console.error("Error creating new sheet:", error);
              alert("Error creating new sheet. Please try again.");
            }
          };
      return (
        <>
            <div className="px-4 bg-white py-2 border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl mt-5 font-semibold mb-2">Connect Your Google sheet for fb Catalouge </h2>
                <div className="flex gap-2 items-center">
                sheet key : <a href=" https://docs.google.com/spreadsheets/d/1oIrsogcOJvQTiuBsvvCL8fH0Abyi_9ArFX9wZV-xRcE" target="_blank">  {seller_facebook_pixel?.sheetKey}</a>
                 
                  <button  className=" bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
                                  onClick={createNewSheetWithHeaders}>
                    sync with google sheet
                  </button>
              </div>
              <div className="flex gap-2 mt-3">
                 
              <button  className="mb-4  bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
                                  onClick={createNewSheetWithHeadersX}>
                    new key
                  </button>
             
                  {!isSignedIn ? (
                    <button onClick={handleSignIn}  className="mb-4  bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-non"
                    >Sign In to Google</button>
                  ) : (
                    <button onClick={handleSignOut}  className="mb-4 bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-non"
                    >Sign Out</button>
                  )}
              </div>
              </div>
              <br />

              
                  <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 py-2 border border-gray-300 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Facebook Pixel  </h2>
                       <div className="flex gap-2">
                        <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                              placeholder="Enter Facebook Pixel ID"

                              value={pixel}
                              onChange={handleChange}
                              required
                        />
                         <button
                            style={{height:'40px'}}
                              type="submit"
                              className="bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
                        >
                              Submit
                        </button>
                        </div>
                </div>
                <br />
                <div className="bg-white px-4 py-2 border border-gray-300 rounded-md shadow-md">
                    
                        <h2 className="text-lg mt-5 font-semibold mb-2">Google  Analytics </h2>
                        <div className="flex gap-2">
                        <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                              placeholder="Enter Google Measurement ID For Analytics"
                              value={google}
                              onChange={handleChangeg}
                              required
                        />
                        <button
                            style={{height:'40px'}}
                              type="submit"
                              className="bg-gray-900 hover:bg-gray-600 text-white font-semibold px-4 py-1 rounded-md focus:outline-none"
                        >
                              Submit
                        </button>
                        </div>
                        </div>
                  </form>
            
            
            </>
      );
};

export default FacebookPixel;
