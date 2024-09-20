import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import React, { useContext, useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import DeleteModal from "../../../../../Common/DeleteModal";
import PrintList from "../PrintList";
import EditProductForm from "./EditProduct";
import WebStoreproduct from "./WebStoreProducts";
import DemoImage from "./woocommerce-placeholder-600x600.png";
import BrightAlert from "bright-alert";
import EditInventory from "../../../Inventory/EditInventory";
import LoaderData from "../../../../../Common/LoaderData";
import showAlert from "../../../../../Common/alert";
const SellerAllProducts = () => {
      const navigate = useNavigate();
      const { shopInfo } = useContext(AuthContext);
      const [loadingStates, setLoadingStates] = useState({});
      const [printProduct, setPrintProduct] = useState([]);
      const [priceOn, setPriceOn] = useState(false);
      const [stockOn, setStockOn] = useState(false);
      const location = useLocation();

      useEffect(() => {
            if (location.pathname.includes("doob")) {
                  handleOptionClick(false);
            } else if (location.pathname.includes("manage")) {
                  handleOptionClick(true);
            }
      }, [location]);
      const {
            data: products = [],
            refetch,
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

      const { data: productData = [], refetch: refetchProduct, isLoading:loadingWeb } = useQuery({
            queryKey: ["productData"],
            queryFn: async () => {
                  try {
                        const res = await fetch(
                              `https://doob.dev/api/v1/seller/web-store?id=${shopInfo._id}`
                        );
                        const data = await res.json();
                        return data?.products;
                  } catch (error) {
                        throw error; // Rethrow the error to mark the query as failed
                  }
            },
      });



      const [openModal, setOpenModal] = useState(false);
      const [onModal, setOnModal] = useState(false);
      const [open, setOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [searchQuery, setSearchQuery] = useState("");
      const [webStoreProduct, setWebStoreProduct] = useState(true);
      const [dropdownOpenWeb, setdropdownOpenWeb] = useState(false);

      const [selectedOption, setSelectedOption] = useState("");
      const [dropdownOpenFor2nd, setDropdownOpenFor2nd] = useState(false);

      const toggleDropdownFor2nd = () => {
            setDropdownOpenFor2nd(!dropdownOpenFor2nd);
            setdropdownOpenWeb(false);
            setDropdownOpenForWare(false);
      };

      const handleOptionClickFor2nd = (value) => {
            setSelectedOption(value);
            setDropdownOpenFor2nd(false);
            setdropdownOpenWeb(false);
            setDropdownOpenForWare(false);
      };

      const toggleDropdown = () => {
            setdropdownOpenWeb(!dropdownOpenWeb);
            setDropdownOpenFor2nd(false);
            setDropdownOpenForWare(false);
      };

      const handleOptionClick = (value) => {
            setWebStoreProduct(value);
            setdropdownOpenWeb(false);
            setDropdownOpenFor2nd(false);
            setDropdownOpenForWare(false);
      };

      const [selectwarehouse, setSelectWarehouse] = useState("");
      const [dropdownOpenForWare, setDropdownOpenForWare] = useState(false);

      const toggleDropdownWare = () => {
            setDropdownOpenForWare(!dropdownOpenForWare);
            setDropdownOpenFor2nd(false);
            setdropdownOpenWeb(false);
      };

      const handleOptionClickWare = (value) => {
            setSelectWarehouse(value);
            dropdownOpenForWare(false);
            setDropdownOpenFor2nd(false);
            setdropdownOpenWeb(false);
      };

      const [selectFunction, setSelectFunction] = useState("");
      const [dropdownOpenForFunction, setDropdownOpenForFunction] = useState(false);
      const toggleDropdownFunction = () => {
            setDropdownOpenForWare(!dropdownOpenForWare);
            setDropdownOpenFor2nd(false);
            setdropdownOpenWeb(false);
      };

      const handleOptionClickFunction = (value) => {
            setSelectWarehouse(value);
            dropdownOpenForWare(false);
            setDropdownOpenFor2nd(false);
            setdropdownOpenWeb(false);
      };

      const maxLength = 30;
      const [pageSize, setPageSize] = useState(15);

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };

      const filteredData =
            products.length &&
            products
                  ?.filter(
                        (item) =>
                              item.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                              (item.sku && item?.sku?.toString()?.includes(searchQuery))
                  )
                  ?.filter(
                        (product) =>
                              (selectwarehouse === "Doob_Warehouse" && product?.adminWare) ||
                              (selectwarehouse === "My_Warehouse" && !product?.adminWare) ||
                              (selectwarehouse === "" && true)
                  )
                  ?.filter((product) => {
                        if (selectedOption === "") {
                              return true; // Show all items if selectedOption is empty
                        } else if (selectedOption === "Daraz" && product.add_daraz === true) {
                              return true; // Show if selectedOption is "Daraz" and product.daraz is true
                        } else if (
                              selectedOption === "Woocommerce" &&
                              product.add_woo === true
                        ) {
                              return true; // Show if selectedOption is "Woocommerce" and product.woo is true
                        } else if (
                              selectedOption === "My_Product" &&
                              !product.add_daraz &&
                              !product.add_woo
                        ) {
                              return true; // Show if selectedOption is "My_Product" and product.woo and product.daraz are false
                        } else {
                              return false; // Otherwise, filter out the item
                        }
                  });

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Get the current page data
      const currentData =
            filteredData &&
            filteredData
                  ?.sort((a, b) => b.createdAt - a.createdAt)
                  .slice(startIndex, endIndex);

      const updateProductStatus = (id, status) => {
            console.log(id);
            fetch(`https://doob.dev/api/v1/seller/update-product-status`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id,
                        status,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Success`, "", "success");
                        refetch();
                        refetchProduct()
                  });
      };

      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);

      const DeleteSeller = (id) => {
            console.log(id);
            setDeletId(id);
            setDeletePopUp(true);
      };
      if (isDelete) {
            fetch(`https://doob.dev/api/v1/seller/delete-product`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id: deleteId,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setIsDelete(false);
                        showAlert("Delete Success", "", "success");
                        refetch();
                        refetchProduct()
                  });

      }

      const [selectProducts, setSelectProducts] = useState([]);
      const DeleteBulk = () => {
            // Show confirmation dialog before proceeding
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, keep it",
            }).then((result) => {
                  if (result.isConfirmed) {
                        // Call the DeleteSeller function if the user confirms
                        DeleteBulks();
                  }
            });
      };
      const DeleteBulks = () => {
            console.log(selectProducts, selectWebProducts, "dddd");
            if (webStoreProduct) {
                  selectProducts.forEach((productId, index) => {
                        fetch(`https://doob.dev/api/v1/seller/delete-product`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    id: productId,
                              }),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    setIsDelete(false);
                                    showAlert("Delete Success", "", "success");
                                    refetch();
                                    refetchProduct()
                              });

                  })
            } else {
                  selectWebProducts.forEach((productId, index) => {
                        fetch(`https://doob.dev/api/v1/seller/delete-product`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    id: productId,
                              }),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                    setIsDelete(false);
                                    showAlert("Delete Success", "", "success");
                                    refetch();
                                    refetchProduct()
                              });

                  })
            }
      };

      const { data: priceRole = [] } = useQuery({
            queryKey: ["priceRole"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/get-price-role/${shopInfo?._id}`
                  );
                  const data = await res.json();
                  return data?.data;
            },
      });

      // select product
      const [selectWebProducts, setSelectWebProducts] = useState([]);
      const [on, setOn] = useState(null);

      const handleUpdateCheck = (productId) => {
            if (webStoreProduct) {
                  setSelectProducts((prevSelectedProducts) => {
                        if (prevSelectedProducts.includes(productId)) {
                              return prevSelectedProducts?.filter((id) => id !== productId);
                        } else {
                              return [...prevSelectedProducts, productId];
                        }
                  });
            }
            else {
                  setSelectWebProducts((prevSelectedProducts) => {
                        if (prevSelectedProducts.includes(productId)) {
                              return prevSelectedProducts?.filter((id) => id !== productId);
                        } else {
                              return [...prevSelectedProducts, productId];
                        }
                  });
            }

      };

      const handleSelectAll = () => {
            if (webStoreProduct) {
                  if (selectProducts.length === currentData.length) {
                        // If all products are already selected, deselect all
                        setSelectProducts([]);
                  } else {
                        // Otherwise, select all products
                        const allProductIds = currentData?.map((product) => product._id);
                        setSelectProducts(allProductIds);
                  }
            } else {
                  if (selectWebProducts.length === productData.length) {
                        // If all products are already selected, deselect all
                        setSelectWebProducts([]);
                  } else {
                        // Otherwise, select all products
                        const allProductIds = productData?.map((product) => product._id);
                        setSelectWebProducts(allProductIds);
                  }
            }
      };

      const logSelectedProducts = () => {

            if (webStoreProduct) {
                  const selectedProductData = products?.filter((product) =>
                        selectProducts.includes(product._id)
                  );
                  setPrintProduct(selectedProductData);
            }
            else {
                  const selectedProductData = productData?.filter((product) =>
                        selectWebProducts.includes(product._id)
                  );
                  setPrintProduct(selectedProductData);
            }
            setOn(!on);
      };

      const handleEditPrice = async (event) => {
            event.preventDefault();

            // Create a copy of variations with updated prices
            const updatedVariations = priceOn.variations.map((variation, index) => {
                  const newPrice = event.target[`price-${index}`].value;
                  const newOfferPrice = event.target[`offerPrice-${index}`].value;

                  return { SKU: variation.SKU, price: newPrice, offerPrice: newOfferPrice };
            });

            // Call the API function to update prices
            await updateProductPricesBySKU(priceOn, updatedVariations);

            // Close the modal
            setPriceOn(false);
      };



      const updateProductPricesBySKU = async (product, updatedVariations) => {
            try {
                  const response = await fetch(`https://doob.dev/api/v1/seller/update-product-price`, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              id: product._id,
                              variations: updatedVariations, // Pass the variations object
                        }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                        showAlert("Success", "Product prices updated successfully", "success");
                        refetch();
                        refetchProduct();
                  } else {
                        showAlert("Error", data.message || "Failed to update product prices", "error");
                  }
            } catch (error) {
                  showAlert("Error", error.message, "error");
            }
      };


      const handleEditStock = (e) => {
            e.preventDefault();
            const editStock = e.target.editStock.value;

            console.log(editStock);
            setStockOn(false);
      };

      const [isOpenWarehouse, setIsWarehouse] = useState(false);
      const navigateWareHouseFunction = () => {
            navigate(`/seller/product-management/edit/${isOpenWarehouse?._id}`, {
                  state: isOpenWarehouse,
            });
            // navigate(`/seller/product-management/edit/${isOpenWarehouse}`);
            setIsWarehouse(false);
      };
      // Function to update product
      const update_product_multi_vendor = (product, status) => {
            // const navigate = useNavigate(); // For navigation

            // Ensure the product is valid
            if (!product) {
                  showAlert("Error", "Invalid product data", "error");
                  return;
            }

            // Check if the product belongs to the admin warehouse
            if (!product?.adminWare || product.variantData.product1?.quantityPrice < 1) {
                  setIsWarehouse(product);
                  // Swal.fire({
                  //   title: "Product Management",
                  //   text: "Please Edit Your Product And Fill all required data.",
                  //   icon: "info",
                  //   showCancelButton: true,
                  //   confirmButtonText: "Edit",
                  //   cancelButtonText: "Cancel",
                  //   customClass: {
                  //     confirmButton: "swal2-confirm swal2-styled",
                  //     cancelButton: "swal2-cancel swal2-styled",
                  //   },
                  //   focusConfirm: false,
                  // }).then((result) => {
                  //   if (result.isConfirmed) {
                  //     navigate(`/seller/product-management/edit/${product?._id}`);
                  //   }
                  // });
            } else {
                  fetch(
                        `https://doob.dev/api/v1/seller/update-product-multivendor`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    id: product?._id,
                                    status,
                              }),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {

                              refetch();
                              refetchProduct()// R
                              showAlert("Success", "Product updated successfully", "success");
                        });
            }
      };
      const barcode_generate = () => {
            const pdf = new jsPDF();
            const barcodesPerRow = 3;
            const maxProductsPerPage = 15;
            let productsDisplayed = 0;
            let pageIndex = 0;
            let yPos = 10;

            if (
                  !selectProducts.length && !selectWebProducts.length
            ) {
                  showAlert(`Please Select Product First`, "", "success");
                  return;
            }
            if (webStoreProduct) {
                  selectProducts.forEach((productId, index) => {
                        // Create a barcode for each product ID using JsBarcode
                        const canvas = document.createElement("canvas");
                        JsBarcode(canvas, productId, {
                              format: "CODE128", // You can specify the barcode format here
                              displayValue: false, // Hide the text beneath the barcode
                        });

                        const imgData = canvas.toDataURL("image/png");

                        if (productsDisplayed >= maxProductsPerPage) {
                              pdf.addPage();
                              pageIndex++;
                              yPos = 10;
                              productsDisplayed = 0;
                        }

                        const rowIndex = Math.floor(productsDisplayed / barcodesPerRow);
                        const colIndex = productsDisplayed % barcodesPerRow;

                        const xPos = 10 + colIndex * 70;

                        pdf.addImage(imgData, "PNG", xPos, yPos, 50, 25);
                        pdf.setFontSize(11);
                        pdf.text(xPos, yPos + 30, `${productId}`);

                        productsDisplayed++;

                        if (colIndex === barcodesPerRow - 1) {
                              yPos += 60;
                        }
                  });
            }
            else {
                  selectWebProducts.forEach((productId, index) => {
                        // Create a barcode for each product ID using JsBarcode
                        const canvas = document.createElement("canvas");
                        JsBarcode(canvas, productId, {
                              format: "CODE128", // You can specify the barcode format here
                              displayValue: false, // Hide the text beneath the barcode
                        });

                        const imgData = canvas.toDataURL("image/png");

                        if (productsDisplayed >= maxProductsPerPage) {
                              pdf.addPage();
                              pageIndex++;
                              yPos = 10;
                              productsDisplayed = 0;
                        }

                        const rowIndex = Math.floor(productsDisplayed / barcodesPerRow);
                        const colIndex = productsDisplayed % barcodesPerRow;

                        const xPos = 10 + colIndex * 70;

                        pdf.addImage(imgData, "PNG", xPos, yPos, 50, 25);
                        pdf.setFontSize(11);
                        pdf.text(xPos, yPos + 30, `${productId}`);

                        productsDisplayed++;

                        if (colIndex === barcodesPerRow - 1) {
                              yPos += 60;
                        }
                  });
            }

            // Save or navigate to the PDF page
            pdf.save("barcodes.pdf"); // Save PDF
      };

      const update_product_sorting = (e) => {
            console.log(e.target.value);
            fetch(`https://doob.dev/api/v1/seller/update-product-upcoming`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        status: e.target.value,
                        ids: selectProducts,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(`Success`, "", "success");
                        refetch();
                        refetchProduct()
                        // meed to reset e  console.log(e.target.value);
                        setSelectProducts([]);
                  });
      };
      const [rejectMessage, setRejectMessage] = useState(false);

      const [updateStart, setUpdating] = useState(false);
      const update_form_daraz = () => {
            // Set updating to true
            setUpdating(true);

            if (webStoreProduct) {

                  const daraz_products = products?.filter(
                        (product) => product.daraz === true
                  );
                  daraz_products.forEach((product) => {
                        const { _id, variations, item_id } = product;
                        const { SKU } = variations[0]; // Assuming variations always have at least one element

                        try {
                              updateProduct(_id, SKU, item_id, "daraz");
                        } catch (error) {
                              console.error(`Error updating product ${_id} for Daraz:`, error);
                              // You might want to handle the error accordingly, depending on your application's logic
                        }
                  });
            } else {
                  const daraz_products = productData?.filter(
                        (product) => product.daraz === true
                  );
                  daraz_products.forEach((product) => {
                        const { _id, variations, item_id } = product;
                        const { SKU } = variations[0]; // Assuming variations always have at least one element

                        try {
                              updateProduct(_id, SKU, item_id, "daraz");
                        } catch (error) {
                              console.error(`Error updating product ${_id} for Daraz:`, error);
                              // You might want to handle the error accordingly, depending on your application's logic
                        }
                  });
            }


            // Set updating to false
            setUpdating(false);
      };

      const updateProduct = (id, sku, item_id, category) => {
            console.log(item_id, 'ddddddddddd')
            setLoadingStates((prevLoadingStates) => ({
                  ...prevLoadingStates,
                  [id]: true,
            }));
            const data = { category, item_id, sku, id, shopId: shopInfo._id };
            fetch("https://doob.dev/api/v1/seller/update-product", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((response) => response.json())
                  .then((data) => {
                        console.log(data);
                        setLoadingStates((prevLoadingStates) => ({
                              ...prevLoadingStates,
                              [id]: false,
                        }));
                        if (data.error) {
                              showAlert(`${data.message}`, "", "warning");
                        } else {
                              if (updateStart) {
                              } else {
                                    showAlert(`${data.message}`, "", "success");
                              }
                              refetch();
                              refetchProduct()
                        }
                  });
      };

      const calculateTotalQuantity = (data) => {
            let totalQuantity = 0;
            data.forEach((item) => {
                  totalQuantity += parseInt(item.quantity);
            });
            return totalQuantity;
      };

      // console.log("manage product : ", currentData);

      const [isLoadingRequest, setIsLoadingReq] = useState(false);
      const ReRejectStatusRequestHandler = async (id) => {
            setIsLoadingReq(true);
            try {
                  await fetch(
                        `https://doob.dev/api/v1/admin/product-reject-message?id=${id}`,
                        {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    id: id,
                                    status: "reject-requests",
                              }),
                        }
                  )
                        .then((res) => res.json())
                        .then((data) => {
                              // console.log(
                              //   "🚀 ~ file: SellerAllProducts.jsx:497 ~ .then ~ data:",
                              //   data
                              // );
                              setIsLoadingReq(false);
                              if (data.success) {
                                    showAlert(`Success`, "Request Sent", "success");
                                    refetch();
                                    refetchProduct()
                              }

                              // meed to reset e
                        });
            } catch (error) {
                  setIsLoadingReq(false);
                  console.log(error);
                  showAlert("Error", "Something went wrong", "error");
            }
      };




      return (
            <div className="">
                  <div className="h-0 w-0">
                        {" "}
                        <DeleteModal
                              setOpenModal={setDeletePopUp}
                              OpenModal={deletePopUp}
                              setIsDelete={setIsDelete}
                        />
                  </div>

                  <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                              <h2 className="text-lg font-medium text-gray-800 ">All Products</h2>
                              <span className="px-3 py-1 text-xs  bg-blue-100 rounded-full d text-blue-400">
                                    {products?.length}
                              </span>
                        </div>

                        <div className="flex items-center gap-2">
                              <span className="text-sm">Entire per page</span>
                              <select
                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setPageSize(e.target.value)}
                              >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>
                              </select>
                        </div>
                  </div>
                  <div
                        className="flex flex-wrap md:gap-2  gap-1 mt-4 items-center"
                        style={{ fontSize: "15px" }}
                  >
                        <div className="relative w-3/3 ">
                              <input
                                    type="text"
                                    id="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for..."
                                    className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
                              />

                              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                    <button type="button" className="text-gray-600 hover:text-gray-700">
                                          <span className="sr-only">Search</span>

                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 text-black"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                          </svg>
                                    </button>
                              </span>
                        </div>
                        <div className="relative inline-block text-left">
                              <button
                                    onClick={toggleDropdown}
                                    className="px-2 bg-white py-1 border"
                                    aria-haspopup="true"
                                    aria-expanded={dropdownOpenWeb}
                              >
                                    {webStoreProduct ? "My Store" : "Web Store"}{" "}
                                    <IoIosArrowDown className="inline" />
                              </button>

                              {dropdownOpenWeb && (
                                    <div
                                          className="origin-top-right absolute z-50 right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="options-menu"
                                    >
                                          <div className="py-1" role="none">
                                                <button
                                                      onClick={() => handleOptionClick(true)}
                                                      className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                      role="menuitem"
                                                >
                                                      My Store
                                                </button>
                                                <button
                                                      onClick={() => handleOptionClick(false)}
                                                      className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                      role="menuitem"
                                                >
                                                      Web Store
                                                </button>
                                          </div>
                                    </div>
                              )}
                        </div>
                        {webStoreProduct && (
                              <div
                                    className="flex gap-1  items-center mr-0"
                                    style={{ margin: "0px !important" }}
                              >
                                    <div className="relative inline-block text-left">
                                          <button
                                                onClick={toggleDropdownWare}
                                                className="px-2 bg-white py-1 border"
                                                aria-haspopup="true"
                                                aria-expanded={dropdownOpenForWare}
                                          >
                                                {selectwarehouse || " Warehouse"}{" "}
                                                <IoIosArrowDown className="inline" />
                                          </button>

                                          {dropdownOpenForWare && (
                                                <div
                                                      className="origin-top-right z-50 absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                      role="menu"
                                                      aria-orientation="vertical"
                                                      aria-labelledby="options-menu"
                                                >
                                                      <div className="py-1" role="none">
                                                            <button
                                                                  onClick={() => handleOptionClickWare("")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  All
                                                            </button>
                                                            <button
                                                                  onClick={() => handleOptionClickWare("My_Warehouse")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  My_Warehouse
                                                            </button>
                                                            <button
                                                                  onClick={() => handleOptionClickWare("Doob_Warehouse")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  Doob_Warehouse
                                                            </button>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                                    <div className="relative inline-block text-left">
                                          <button
                                                onClick={toggleDropdownFor2nd}
                                                className="px-2 bg-white py-1 border"
                                                aria-haspopup="true"
                                                aria-expanded={dropdownOpenFor2nd}
                                          >
                                                {selectedOption || "Source"}{" "}
                                                <IoIosArrowDown className="inline" />
                                          </button>

                                          {dropdownOpenFor2nd && (
                                                <div
                                                      className="origin-top-right z-50 absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                      role="menu"
                                                      aria-orientation="vertical"
                                                      aria-labelledby="options-menu"
                                                >
                                                      <div className="py-1" role="none">
                                                            <button
                                                                  onClick={() => handleOptionClickFor2nd("")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  All
                                                            </button>
                                                            <button
                                                                  onClick={() => handleOptionClickFor2nd("Daraz")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  Daraz
                                                            </button>
                                                            <button
                                                                  onClick={() => handleOptionClickFor2nd("Woocommerce")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  Woocommerce
                                                            </button>
                                                            <button
                                                                  onClick={() => handleOptionClickFor2nd("My_Product")}
                                                                  className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:text-gray-900"
                                                                  role="menuitem"
                                                            >
                                                                  My_Product
                                                            </button>
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        )}
                        <div>
                              <div className="flex gap-1  items-center">
                                    <button
                                          onClick={update_form_daraz}
                                          disabled={updateStart}
                                          className="px-2 bg-white py-1 border"
                                          aria-haspopup="true"
                                    >
                                          {updateStart ? "Updating..." : "Update Daraz Product"}
                                    </button>

                                    <button className="px-2 bg-white py-1 border" aria-haspopup="true">
                                          Update Woo Product
                                    </button>
                              </div>

                        </div>
                        <div className="flex items-center mt-4 md:mt-0  gap-2">
                              {(webStoreProduct ? selectProducts.length : selectWebProducts.length) ? (
                                    <select
                                          onChange={update_product_sorting}
                                          className="px-8 py-2"
                                          name=""
                                          id=""
                                    >
                                          <option>Select Status</option>
                                          <option value={false}>For Your Product</option>
                                          <option value={true}>Upcoming Product</option>
                                    </select>
                              ) : (
                                    ""
                              )}
                              <button
                                    onClick={barcode_generate}
                                    className="px-2 bg-white py-1 border"
                              >
                                    Barcode Generate
                              </button>

                              <button
                                    onClick={logSelectedProducts}
                                    disabled={webStoreProduct ? !selectProducts.length : !selectWebProducts.length}
                                    className="px-2 bg-white py-1 border"
                              >
                                    Print
                              </button>
                        </div>{" "}
                        <div>
                              <div className="flex gap-1  items-center">


                                    <button onClick={() => DeleteBulk()} className="px-2 bg-white py-1 border" aria-haspopup="true">
                                          Delete
                                    </button>
                              </div>

                        </div>
                  </div>

                  <section>
                        {!webStoreProduct ? (
                              <WebStoreproduct navigateWareHouseFunction={navigateWareHouseFunction} loadingWeb={loadingWeb} productData={productData} refetchProduct={refetchProduct} setStockOn={setStockOn} setPriceOn={setPriceOn} calculateTotalQuantity={calculateTotalQuantity} handleEditStock={handleEditStock} stockOn={stockOn} handleEditPrice={handleEditPrice} priceOn={priceOn} rejectMessage={rejectMessage} setRejectMessage={setRejectMessage} isOpenWarehouse={isOpenWarehouse} handleUpdateCheck={handleUpdateCheck} handleSelectAll={handleSelectAll} selectProducts={selectWebProducts} setOn={setOn} on={on} priceRole={priceRole} searchQuery={searchQuery} onModal={onModal} updateProductStatus={updateProductStatus} update_product_multi_vendor={update_product_multi_vendor} printProduct={printProduct} />
                        ) : (
                              <div className="flex flex-col mt-6">
                                    <div
                                          style={{
                                                overflowY: "scroll", // Always show the scrollbar
                                                scrollbarWidth: "thin", // For Firefox
                                                scrollbarColor: "gray transparent", // Set scrollbar color (gray) for Firefox
                                                msOverflowStyle: "scrollbar", // For Internet Explorer and Edge
                                          }}
                                          className="overflow-x-scroll  "
                                    >
                                          <div className=" w-[100%]">
                                                {on && (
                                                      <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                                                            {" "}
                                                            <PrintList setOn={setOn} products={printProduct} />
                                                      </div>
                                                )}

                                                <div className="overflow-x-scroll border  border-gray-700 md:rounded-lg">
                                                      <table className="w-full">
                                                            <thead className="bg-gray-900 text-white ">
                                                                  <tr>
                                                                        <th className="px-2 text-center">
                                                                              <label
                                                                                    className="flex justify-center items-center gap-2  font-medium"
                                                                                    htmlFor="select"
                                                                              >
                                                                                    <input
                                                                                          id="select"
                                                                                          type="checkbox"
                                                                                          checked={
                                                                                                selectProducts.length === currentData.length
                                                                                          }
                                                                                          onChange={handleSelectAll}
                                                                                    />
                                                                              </label>
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="py-3.5 px-4 w-[100px] text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <div className="flex items-center gap-x-3">
                                                                                    <span>Name</span>
                                                                              </div>
                                                                        </th>

                                                                        <th
                                                                              scope="col"
                                                                              className="px-2 py-3.5 border w-[40px] text-sm font-normal text-center rtl:text-right "
                                                                        >
                                                                              <span>Status</span>
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-2 py-3.5 border  text-sm font-normal text-center rtl:text-right "
                                                                        >
                                                                              <button className="flex">
                                                                                    <span>Sync</span>
                                                                              </button>
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-2 py-3.5 border  text-sm font-normal text-center rtl:text-right "
                                                                        >
                                                                              Source
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              Shop
                                                                        </th>
                                                                        <th className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right">
                                                                              Doob Shop
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <button className="flex items-center gap-x-2">
                                                                                    <span>Categories</span>
                                                                              </button>
                                                                        </th>
                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 py-3.5 text-sm border font-normal text-left rtl:text-right "
                                                                        >
                                                                              <button className="flex items-center gap-x-2">
                                                                                    <span>Warehouse</span>
                                                                              </button>
                                                                        </th>

                                                                        <th
                                                                              style={{ width: "110px" }}
                                                                              scope="col"
                                                                              className="px-4 py-3.5 border text-sm font-normal text-left rtl:text-right "
                                                                        >
                                                                              Price/Qty
                                                                        </th>

                                                                        <th
                                                                              scope="col"
                                                                              className="px-4 border py-3.5 text-sm font-normal text-center  "
                                                                        >
                                                                              <span>Action</span>
                                                                        </th>
                                                                  </tr>
                                                            </thead>
                                                            {loadingData && <LoaderData />}
                                                            <tbody className="bg-white divide-y  divide-gray-200 ">
                                                                  {currentData
                                                                        ? currentData?.map((product, index) => (
                                                                              <tr key={product._id}>
                                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap   flex items-center justify-center">
                                                                                          <label>
                                                                                                <input
                                                                                                      type="checkbox"
                                                                                                      checked={selectProducts.includes(
                                                                                                            product._id
                                                                                                      )}
                                                                                                      onChange={() =>
                                                                                                            handleUpdateCheck(product._id)
                                                                                                      }
                                                                                                />
                                                                                          </label>
                                                                                    </td>



                                                                                    <td className="px-4 py-4 text-sm border-2 font-medium text-gray-700 whitespace-nowrap">
                                                                                          <div className="inline-flex items-center gap-x-3">
                                                                                                <div className="flex relative  items-center gap-x-2">
                                                                                                      {product?.images.length ? (
                                                                                                            <div className="imgSm w-10 ">
                                                                                                                  <img
                                                                                                                        className="object-cover w-10 h-10 rounded"
                                                                                                                        srcSet={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                                        src={product?.featuredImage?.src ?? product?.images[1].src}
                                                                                                                        alt="Product"
                                                                                                                  />
                                                                                                                  <div
                                                                                                                        style={{
                                                                                                                              backgroundImage: `url(${product?.featuredImage?.src})`,
                                                                                                                        }}
                                                                                                                        className="absolute top-[-40px] duration-150 abs hidden bg-[url(${product?.featuredImage?.src})] left-[43px] object-cover bg-cover rounded bg-white shadow-xl opacity-100 z-[1000] w-[150px] h-[150px] ring-1 ring-gray-500"
                                                                                                                  ></div>
                                                                                                            </div>
                                                                                                      ) : (
                                                                                                            <img
                                                                                                                  className="object-cover border border-black w-10 h-10 rounded"
                                                                                                                  srcSet={DemoImage}
                                                                                                                  src={DemoImage}
                                                                                                                  alt=""
                                                                                                            />
                                                                                                      )}
                                                                                                      <div>
                                                                                                            <h2 className="font-medium text-gray-800  ">
                                                                                                                  {product?.name
                                                                                                                        .split(" ")
                                                                                                                        .slice(0, 5)
                                                                                                                        .join(" ")}
                                                                                                            </h2>
                                                                                                            <p className="text-sm font-normal text-gray-600 ">
                                                                                                                  {product?.sku}
                                                                                                            </p>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>

                                                                                    <td className="px-4  border-r">
                                                                                          <div>
                                                                                                {product.product_status === "reject" ? (
                                                                                                      <div>
                                                                                                            {" "}
                                                                                                            <div
                                                                                                                  onClick={() =>
                                                                                                                        setRejectMessage(product)
                                                                                                                  }
                                                                                                                  className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                            >
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-danger-600" />
                                                                                                                  <h2 className="text-sm font-normal text-danger-600">
                                                                                                                        Rejected
                                                                                                                  </h2>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                ) : (
                                                                                                      <div>
                                                                                                            {!product.adminWare ? (
                                                                                                                  <div>
                                                                                                                        {
                                                                                                                              <div>
                                                                                                                                    {product?.status === true ? (
                                                                                                                                          <div
                                                                                                                                                onClick={() =>
                                                                                                                                                      updateProductStatus(
                                                                                                                                                            product._id,
                                                                                                                                                            false
                                                                                                                                                      )
                                                                                                                                                }
                                                                                                                                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                                                          >
                                                                                                                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                                                                <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                                                      Active
                                                                                                                                                </h2>
                                                                                                                                          </div>
                                                                                                                                    ) : (
                                                                                                                                          <div
                                                                                                                                                onClick={() =>
                                                                                                                                                      updateProductStatus(
                                                                                                                                                            product?._id,
                                                                                                                                                            true
                                                                                                                                                      )
                                                                                                                                                }
                                                                                                                                                className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                                                          >
                                                                                                                                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                                                                                                                <h2 className="text-sm font-normal text-yellow-500">
                                                                                                                                                      Inactive
                                                                                                                                                </h2>
                                                                                                                                          </div>
                                                                                                                                    )}
                                                                                                                              </div>
                                                                                                                        }
                                                                                                                  </div>
                                                                                                            ) : (
                                                                                                                  <div>
                                                                                                                        {!product?.status ? (
                                                                                                                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800">
                                                                                                                                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                                                                                                                    <h2 className="text-sm font-normal text-orange-500">
                                                                                                                                          Pending
                                                                                                                                    </h2>
                                                                                                                              </div>
                                                                                                                        ) : (
                                                                                                                              <div
                                                                                                                                    onClick={() =>
                                                                                                                                          updateProductStatus(
                                                                                                                                                product._id,
                                                                                                                                                false
                                                                                                                                          )
                                                                                                                                    }
                                                                                                                                    className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                                              >
                                                                                                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                                                    <h2 className="text-sm font-normal text-emerald-500">
                                                                                                                                          Active
                                                                                                                                    </h2>
                                                                                                                              </div>
                                                                                                                        )}
                                                                                                                  </div>
                                                                                                            )}
                                                                                                      </div>
                                                                                                )}
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className=" border-r ">
                                                                                          <div className="flex justify-center">
                                                                                                {(product?.daraz && (
                                                                                                      <img
                                                                                                            className="w-14 "
                                                                                                            src="https://doob.com.bd/assets/Daraz-fe21961a.svg"
                                                                                                      />
                                                                                                )) ||
                                                                                                      (product?.woo && (
                                                                                                            <img
                                                                                                                  className="w-14 "
                                                                                                                  src="https://doob.com.bd/assets/woocommerce-icon-236845b7.svg"
                                                                                                            />
                                                                                                      ))}
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="">
                                                                                          <div className="flex justify-center">
                                                                                                {(product?.add_daraz && (
                                                                                                      <img
                                                                                                            className="w-14 "
                                                                                                            src="https://doob.com.bd/assets/Daraz-fe21961a.svg"
                                                                                                      />
                                                                                                )) ||
                                                                                                      (product?.add_woo && (
                                                                                                            <img
                                                                                                                  className="w-14 "
                                                                                                                  src="https://doob.com.bd/assets/woocommerce-icon-236845b7.svg"
                                                                                                            />
                                                                                                      ))}
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          {product?.darazSku?.[0]?.shop || ''}
                                                                                    </td>
                                                                                    <td className=" text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          <div className="flex justify-center">
                                                                                                {product?.multiVendor === true ? (
                                                                                                      <div
                                                                                                            onClick={() =>
                                                                                                                  update_product_multi_vendor(
                                                                                                                        product,
                                                                                                                        false
                                                                                                                  )
                                                                                                            }
                                                                                                            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                      >
                                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                                                                            <h2 className="text-sm font-normal text-green-500">
                                                                                                                  Yes
                                                                                                            </h2>
                                                                                                      </div>
                                                                                                ) : (
                                                                                                      <div
                                                                                                            onClick={() =>
                                                                                                                  update_product_multi_vendor(
                                                                                                                        product,
                                                                                                                        true
                                                                                                                  )
                                                                                                            }
                                                                                                            className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                      >
                                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                                                                            <h2 className="text-sm font-normal text-yellow-500">
                                                                                                                  No
                                                                                                            </h2>
                                                                                                      </div>
                                                                                                )}
                                                                                          </div>
                                                                                    </td>

                                                                                    <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          {product?.categories
                                                                                                .filter(
                                                                                                      (category) =>
                                                                                                            category !== null && category !== ""
                                                                                                )
                                                                                                .map((category) => (
                                                                                                      <span key={category?.id}>
                                                                                                            <div>{category?.name}</div>
                                                                                                      </span>
                                                                                                ))}
                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          {product?.warehouse?.filter(
                                                                                                (item) => item?.name
                                                                                          )?.length
                                                                                                ? product?.warehouse?.map((ware, index) => (
                                                                                                      <p key={ware?.name}>{ware?.name}</p>
                                                                                                ))
                                                                                                : "No Warehouse"}
                                                                                    </td>
                                                                                    {/* <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          <div> Regular:{product.regular_price}</div>

                                                                                          <div className="flex items-center gap-2 py-3">
                                                                                                Discount: {product.price}{" "}
                                                                                                <button onClick={() => setPriceOn(product)}>
                                                                                                      {" "}
                                                                                                      <BiEdit className="text-lg" />
                                                                                                </button>
                                                                                                <div
                                                                                                      onClick={() => setPriceOn(false)}
                                                                                                      className={`fixed z-[100] flex items-center justify-center ${priceOn?._id == product?._id
                                                                                                            ? "visible opacity-100"
                                                                                                            : "invisible opacity-0"
                                                                                                            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                                >
                                                                                                      <div
                                                                                                            onClick={(e_) => e_.stopPropagation()}
                                                                                                            className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${priceOn?._id == product?._id
                                                                                                                  ? "scale-1 opacity-1 duration-300"
                                                                                                                  : "scale-0 opacity-0 duration-150"
                                                                                                                  }`}
                                                                                                      >
                                                                                                            <form onSubmit={handleEditPrice}>
                                                                                                                  <h2 className="text-lg font-medium text-gray-800 mb-4">
                                                                                                                        Update Price
                                                                                                                  </h2>
                                                                                                                  <input
                                                                                                                        name="editPrice"
                                                                                                                        defaultValue={priceOn?.price}
                                                                                                                        type="text"
                                                                                                                        placeholder="update price"
                                                                                                                        className="w-[300px] py-2 my-4 border px-2 rounded"
                                                                                                                  />
                                                                                                                  <div className="flex justify-between">
                                                                                                                        <button
                                                                                                                              type="submit"
                                                                                                                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                                        >
                                                                                                                              Update
                                                                                                                        </button>
                                                                                                                        <button
                                                                                                                              onClick={() => setPriceOn(false)}
                                                                                                                              className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                                        >
                                                                                                                              Cancel
                                                                                                                        </button>
                                                                                                                  </div>
                                                                                                            </form>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                          <div>
                                                                                                <div className="flex items-center gap-x-2 ">
                                                                                                      <div className="flex items-center gap-2">
                                                                                                            Qty:
                                                                                                            <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                                                                  {calculateTotalQuantity(
                                                                                                                        product?.variations
                                                                                                                  )}
                                                                                                            </p>
                                                                                                            <button
                                                                                                                  onClick={() => setStockOn(product)}
                                                                                                            >
                                                                                                                  {" "}
                                                                                                                  <BiEdit className="text-lg" />
                                                                                                            </button>
                                                                                                            <div
                                                                                                                  onClick={() => setStockOn(false)}
                                                                                                                  className={`fixed z-[100] flex items-center justify-center ${stockOn?._id == product?._id
                                                                                                                        ? "visible opacity-100"
                                                                                                                        : "invisible opacity-0"
                                                                                                                        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                                            >
                                                                                                                  <div
                                                                                                                        onClick={(e_) => e_.stopPropagation()}
                                                                                                                        className={`text- absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${stockOn?._id == product?._id
                                                                                                                              ? "scale-1 opacity-1 duration-300"
                                                                                                                              : "scale-0 opacity-0 duration-150"
                                                                                                                              }`}
                                                                                                                  >
                                                                                                                        <form onSubmit={handleEditStock}>
                                                                                                                              <h2 className="text-lg font-medium text-gray-800 mb-4">
                                                                                                                                    Update Stock Quantity
                                                                                                                              </h2>
                                                                                                                              <input
                                                                                                                                    name="editStock"
                                                                                                                                    defaultValue={
                                                                                                                                          stockOn?.stock_quantity
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    placeholder="update price"
                                                                                                                                    className="w-[300px] py-2 my-4 border px-2 rounded"
                                                                                                                              />
                                                                                                                              <div className="flex justify-between">
                                                                                                                                    <button
                                                                                                                                          type="submit"
                                                                                                                                          className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                                                    >
                                                                                                                                          Update
                                                                                                                                    </button>

                                                                                                                                    <button
                                                                                                                                          onClick={() =>
                                                                                                                                                setStockOn(false)
                                                                                                                                          }
                                                                                                                                          className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                                                    >
                                                                                                                                          Cancel
                                                                                                                                    </button>
                                                                                                                              </div>
                                                                                                                        </form>
                                                                                                                  </div>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td> */}
                                                                                    <td className="px-4 py-4 text-sm border-2 text-gray-500  whitespace-nowrap">
                                                                                          <span className="text-sm text-gray-500">
                                                                                                <div className="flex items-center gap-1 py-1">

                                                                                                      <button className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg" onClick={() => setPriceOn(product)}>
                                                                                                            Price Edit
                                                                                                      </button>

                                                                                                      <div>
                                                                                                            <button
                                                                                                                  onClick={() => setOpen(product)}
                                                                                                                  className="text-xs text-blue-500 border border-blue-500 px-2 py-1 rounded-lg"
                                                                                                            >
                                                                                                                  Stock Edit
                                                                                                            </button>


                                                                                                            {open._id === product._id && (
                                                                                                                  <div className="h-0 w-0">
                                                                                                                        <EditInventory
                                                                                                                              refetch={refetch}
                                                                                                                              data={product}
                                                                                                                              open={open}
                                                                                                                              setOpen={setOpen}
                                                                                                                        />
                                                                                                                  </div>
                                                                                                            )}
                                                                                                      </div>
                                                                                                </div>
                                                                                                {" "}
                                                                                                {product?.variations?.map((variant, index) => {
                                                                                                      const variantData = product?.variantData?.[index] || {};
                                                                                                      const product1 = variantData?.product1 || {};
                                                                                                      const product2 = variantData?.product2 || {};
                                                                                                      const product3 = variantData?.product3 || {};

                                                                                                      return (
                                                                                                      <div key={index}>
                                                                                                            {variant?.SKU ? (
                                                                                                            // First set of data
                                                                                                            <div >
                                                                                                            <p>{variant?.SKU}</p>
                                                                                                            <span>QTY: {variant?.quantity}</span> || 
                                                                                                            <span>Price: {variant?.offerPrice || variant?.price} </span>
                                                                                                            
                                                                                                            </div>
                                                                                                            ) : ( <></> )}
                                                                                                             {product?.multiVendor && (
                                                                                                            <>
                                                                                                            <p>
                                                                                                                 B2B P:-{product1.quantity || 1}-{product1.quantityPrice || "0"} ,{product2.quantity || 1}-{product2.quantityPrice || "0"} ,{product3.quantity || 1}-{product3.quantityPrice || "0"}
                                                                                                            </p>
                                                                                                            
                                                                                                           
                                                                                                            </>
                                                                                                      )}
                                                                                                      <hr className="pb-1" />
                                                                                                            {/* You can add additional data here */}
                                                                                                      </div>
                                                                                                      );
                                                                                                })}


                                                                                                {/* Modal for editing all variations */}
                                                                                                <div
                                                                                                      onClick={() => setPriceOn(false)}
                                                                                                      className={`fixed z-[100] flex items-center justify-center ${priceOn?._id === product?._id
                                                                                                            ? "visible opacity-100"
                                                                                                            : "invisible opacity-0"
                                                                                                            } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                                >
                                                                                                      <div
                                                                                                            onClick={(e_) => e_.stopPropagation()}
                                                                                                            className={`absolute max-w-md rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${priceOn?._id === product?._id
                                                                                                                  ? "scale-1 opacity-1 duration-300"
                                                                                                                  : "scale-0 opacity-0 duration-150"
                                                                                                                  }`}
                                                                                                      >
                                                                                                            <form onSubmit={handleEditPrice}>
                                                                                                                  <h2 className="text-lg font-medium text-gray-800 mb-4">
                                                                                                                        Update Prices for All Variations
                                                                                                                  </h2>

                                                                                                                  {priceOn?.variations?.map((variation, index) => (
                                                                                                                        <div key={variation.SKU} className="mb-4">
                                                                                                                              <p>{variation.SKU}</p>
                                                                                                                              {/* Input for price */}
                                                                                                                              <input
                                                                                                                                    name={`price-${index}`}
                                                                                                                                    defaultValue={variation.price}
                                                                                                                                    type="number" // Set input type to number for better validation
                                                                                                                                    placeholder={`Update price for ${variation.SKU}`}
                                                                                                                                    className="w-[130px] py-2 my-2 border px-2 rounded"
                                                                                                                              />
                                                                                                                              {/* Input for discount price */}
                                                                                                                              <input
                                                                                                                                    name={`offerPrice-${index}`}
                                                                                                                                    defaultValue={variation.offerPrice}
                                                                                                                                    type="number" // Set input type to number for better validation
                                                                                                                                    placeholder={`Update discount price for ${variation.SKU}`}
                                                                                                                                    className="w-[130px] py-2 border px-2 rounded"
                                                                                                                              />
                                                                                                                        </div>
                                                                                                                  ))}

                                                                                                                  <div className="flex justify-between">
                                                                                                                        <button
                                                                                                                              type="submit"
                                                                                                                              className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                                        >
                                                                                                                              Update All
                                                                                                                        </button>
                                                                                                                        <button
                                                                                                                              onClick={() => setPriceOn(false)}
                                                                                                                              className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                                        >
                                                                                                                              Cancel
                                                                                                                        </button>
                                                                                                                  </div>
                                                                                                            </form>
                                                                                                      </div>
                                                                                                </div>


                                                                                          </span>
                                                                                    </td>

                                                                                    <td className="px-4 py-4 text-sm border-2 whitespace-nowrap">
                                                                                          <div className="flex items-center gap-x-6">
                                                                                                <button
                                                                                                      onClick={() => DeleteSeller(product._id)}
                                                                                                      className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                                                >
                                                                                                      <MdDelete className="w-5 h-5" />
                                                                                                </button>

                                                                                                {/* <Link
                                    to={`/seller/product-management/edit/${product?._id}`}
                                    onClick={() => setOnModal(product)}
                                    className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4"
                                  >

                                    <BiEdit className="w-5 h-5" />
                                  </Link> */}
                                                                                                <button
                                                                                                      // to={`/seller/product-management/edit/${product?._id}`}
                                                                                                      // onClick={() => setOnModal(product)}
                                                                                                      onClick={() =>
                                                                                                            navigate(
                                                                                                                  `/seller/product-management/edit/${product?._id}`,
                                                                                                                  {
                                                                                                                        state: product,
                                                                                                                  }
                                                                                                            )
                                                                                                      }
                                                                                                      className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4"
                                                                                                >
                                                                                                      <BiEdit className="w-5 h-5" />
                                                                                                </button>

                                                                                                <a
                                                                                                      target="_blank"
                                                                                                      href={`/shop/${shopInfo.shopId}/product/${product._id}`}
                                                                                                >
                                                                                                      <BsEye />
                                                                                                </a>

                                                                                                {product?.product_status === "reject" &&
                                                                                                      product?.message && (
                                                                                                            <div>
                                                                                                                  <button
                                                                                                                        onClick={() =>
                                                                                                                              ReRejectStatusRequestHandler(
                                                                                                                                    product?._id
                                                                                                                              )
                                                                                                                        }
                                                                                                                        className="p-2 transition-colors duration-200 hover:bg-red-700  bg-red-500 focus:outline-none mr-4 text-white rounded font-semibold"
                                                                                                                  >
                                                                                                                        {isLoadingRequest && "sending.."} Re
                                                                                                                        Request
                                                                                                                  </button>
                                                                                                                  <p className="text-red-500 text-sm pt-2 ">
                                                                                                                        {product?.message}
                                                                                                                  </p>
                                                                                                            </div>
                                                                                                      )}

                                                                                                {/* <button product={product} onClick={() => setOnModal(product)} className=" transition-colors duration-200 hover:text-green-500  text-green-700 focus:outline-none mr-4">
                                                            <BiEdit className="w-5 h-5" />
                                                        </button> */}
                                                                                                {product.woo && (
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  updateProduct(
                                                                                                                        product._id,
                                                                                                                        product.sku,
                                                                                                                        product.item_id,
                                                                                                                        "woo"
                                                                                                                  )
                                                                                                            }
                                                                                                            className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4"
                                                                                                      >
                                                                                                            {loadingStates[product._id]
                                                                                                                  ? "Updating..."
                                                                                                                  : "Update on woo"}
                                                                                                      </button>
                                                                                                )}
                                                                                                {product.daraz && (
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  updateProduct(
                                                                                                                        product._id,
                                                                                                                        product.variations[0].SKU,
                                                                                                                        product.item_id,
                                                                                                                        "daraz"
                                                                                                                  )
                                                                                                            }
                                                                                                            className=" transition-colors duration-200 hover:text-yellow-500  text-yellow-700 focus:outline-none mr-4"
                                                                                                      >
                                                                                                            {loadingStates[product._id]
                                                                                                                  ? "Updating..."
                                                                                                                  : "Update on Daraz"}
                                                                                                      </button>
                                                                                                )}

                                                                                                {/* modal */}
                                                                                                {onModal?._id === product?._id && (
                                                                                                      <div
                                                                                                            className={`bg-white p-6 fixed w-screen h-full top-0 left-0 z-[3000]`}
                                                                                                      >
                                                                                                            <EditProductForm product={onModal} />
                                                                                                      </div>
                                                                                                )}
                                                                                          </div>
                                                                                          <div></div>
                                                                                    </td>
                                                                              </tr>
                                                                        ))
                                                                        : ""}
                                                                  {isOpenWarehouse && (
                                                                        <div className="container mx-auto py-20">
                                                                              <div
                                                                                    className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 py-5 ${isOpenWarehouse ? "block" : "hidden"
                                                                                          }`}
                                                                              >
                                                                                    <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
                                                                                          <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                                                                                                It Is not your warehouse
                                                                                          </h3>

                                                                                          <span
                                                                                                className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                                                                                          ></span>
                                                                                          <p className="mb-10 text-base leading-relaxed text-body-color">
                                                                                                <span>
                                                                                                      You can Edit your warehouse by Click on Edit
                                                                                                      button. For Cancel Click on OK button
                                                                                                </span>
                                                                                                <br />
                                                                                          </p>
                                                                                          <div className="flex flex-wrap -mx-3">
                                                                                                <div className="w-1/2 px-3">
                                                                                                      <button
                                                                                                            // onClick={() => SubmitData(false)}
                                                                                                            onClick={() => navigateWareHouseFunction()}
                                                                                                            className="block w-full rounded-lg border  p-3 text-center text-base font-medium text-dark transition border-green-600 hover:bg-green-600 hover:text-white"
                                                                                                      >
                                                                                                            Edit
                                                                                                      </button>
                                                                                                </div>
                                                                                                <div className="w-1/2 px-3">
                                                                                                      <button
                                                                                                            onClick={() => setIsWarehouse(false)}
                                                                                                            className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-red-600 hover:bg-red-700`}
                                                                                                      >
                                                                                                            OK
                                                                                                      </button>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  )}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </div>
                                    {rejectMessage && (
                                          <div>
                                                <div>
                                                      <div
                                                            onClick={() => setRejectMessage(false)}
                                                            className={`fixed z-[100] flex items-center justify-center visible opacity-100 inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                      >
                                                            <div
                                                                  className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${rejectMessage._id
                                                                        ? "scale-1 opacity-1 duration-300"
                                                                        : "scale-0 opacity-0 duration-150"
                                                                        }`}
                                                            >
                                                                  <form>
                                                                        <h1 className="mb-2 text-2xl font-semibold">
                                                                              Rejected Message!
                                                                        </h1>
                                                                        <textarea
                                                                              name="message"
                                                                              value={rejectMessage?.message}
                                                                              className="w-full border mb-6 p-2"
                                                                              placeholder=" rejected message"
                                                                        />
                                                                        <div className="flex justify-between">
                                                                              <button
                                                                                    type="button"
                                                                                    onClick={() => setRejectMessage(false)}
                                                                                    className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                              >
                                                                                    Cancel
                                                                              </button>
                                                                        </div>
                                                                  </form>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                                    <div className="flex items-center gap-4 mt-6">
                                          <button
                                                onClick={() =>
                                                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                                                }
                                                disabled={currentPage === 1}
                                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
                                          >
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="w-5 h-5 rtl:-scale-x-100"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                                      />
                                                </svg>
                                                <span>Previous</span>
                                          </button>

                                          {/* Show all pages */}
                                          <div className="flex items-center gap-x-3">
                                                {Array.from(
                                                      { length: Math.ceil(filteredData?.length / pageSize) },
                                                      (_, index) => (
                                                            <div
                                                                  key={index}
                                                                  className={`flex items-center px-3 py-2 cursor-pointer text-sm text-gray-700 capitalize transition-colors duration-200 border rounded-md gap-x-2   ${currentPage === index + 1
                                                                        ? "bg-blue-500 text-white"
                                                                        : "bg-blue-100/60 text-blue-500"
                                                                        }`}
                                                                  onClick={() => setCurrentPage((prevPage) => index + 1)}
                                                            >
                                                                  <span>{index + 1}</span>
                                                            </div>
                                                      )
                                                )}
                                          </div>

                                          <button
                                                onClick={() =>
                                                      setCurrentPage((prevPage) =>
                                                            Math.min(
                                                                  prevPage + 1,
                                                                  Math.ceil(filteredData?.length / pageSize)
                                                            )
                                                      )
                                                }
                                                disabled={
                                                      currentPage === Math.ceil(filteredData?.length / pageSize)
                                                }
                                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100  "
                                          >
                                                <span>Next</span>
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="w-5 h-5 rtl:-scale-x-100"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                      />
                                                </svg>
                                          </button>
                                    </div>
                              </div>
                        )}
                  </section>
            </div>
      );
};
export default SellerAllProducts;
