import { useQuery } from "@tanstack/react-query";
import BrightAlert from "bright-alert";
import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import PrintList from "./PrintList";
import Swal from "sweetalert2";
import WarehouseModal from "./WarehouseModal";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import Select from 'react-select';
import { RotateCcw } from "lucide-react";
const ManageProduct = () => {
      const [openModal, setOpenModal] = useState(false);
      const [sload, setSLoad] = useState(false);
      const [doobProduct, setDoobProduct] = useState(false);
      const [itemsPerPage, setItemsPerPage] = useState(parseInt(15));

      const { data: products = [], refetch } = useQuery({
            queryKey: ["products_for_admin"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/products");
                  const data = await res.json();
                  setSLoad(true)
                  return data;
                 
            },
      });
      const {
            data: all_products = [],
            refetch: reload,
            isLoading,
      } = useQuery({
            queryKey: ["all_products"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/get-all-products");
                  const data = await res.json();
                  setSLoad(true)
                  return data;
            },
      });

      const { data: othersProduct = [] } = useQuery({
            queryKey: ["othersProducts"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/others-products");
                  const data = await res.json();
                  setSLoad(true)
                  return data;
            },
      });

      const { data: sellers = [], } = useQuery({
            queryKey: ["sellers"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/seller"
                  );
                  const data = await res.json();
                  return data;
            },
      });
      const [all, setAll] = useState(true);
      const [searchQuery, setSearchQuery] = useState("");

      const [modalOpen, setModalOpen] = useState(false);

      const handleSearch = (event) => {
            setSearchQuery(event.target.value);
      };
      const handleSelectChange = (selectedOption) => {
            setSearchQuery(selectedOption); // Since selectedOption is already the value
      };
      const [trash, set_trash] = useState(false);
      const [product_status, set_product_status] = useState(null);
      const [source, set_source] = useState("all");
      const [reject_status, set_reject_status] = useState(false);
      // const [time, set_time] = useState();
      const [price_range, set_price_range] = useState({ min: 0, max: Infinity });


      const handleMinPriceChange = (e) => {
            const min = e.target.value ? parseFloat(e.target.value) : 0;
            set_price_range((prev) => ({ ...prev, min }));
      };

      const handleMaxPriceChange = (e) => {
            const max = e.target.value ? parseFloat(e.target.value) : Infinity;
            set_price_range((prev) => ({ ...prev, max }));
      };



      const filteredData = (all ? all_products : (doobProduct ? products : othersProduct))?.filter((item) => {
            const query = searchQuery.toLowerCase();

            // Basic search match
            const nameMatch = item?.name?.toLowerCase().includes(query);
            const idMatch = item?._id?.toString().includes(query);
            const sellerMatch = item?.seller?.toString().toLowerCase().includes(query);

            // Additional filters
            const trashMatch = trash ? item.delete_status === "trash" : true;
            const sourceMatch = source === "all" ? true : source === "daraz" ? item.add_daraz === true :
                  source === "woo" ? item.add_woo === true : source === "doob" ? !item.add_daraz && !item.add_woo : true;
            // const timeMatch = time ? item.time === time : true;
            const priceRangeMatch = price_range
                  ? item.price >= (price_range.min ?? 0) && item.price <= (price_range.max ?? Infinity)
                  : true;
            const rejectMatch = reject_status ? item?.product_status === reject_status : true;

            const statusMatch = product_status === null ? true:product_status === false ? item.status === false : item.status === product_status;

            return (nameMatch || idMatch || sellerMatch) && trashMatch && statusMatch && sourceMatch && priceRangeMatch && rejectMatch;
      });
      console.log(all_products,'filteredDatax')

      // delete working
      const DeleteSeller = (id) => {
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
                        DeleteSingle(id);
                  }
            });
      };
      const DeleteSingle = (id) => {

            fetch(`https://doob.dev/api/v1/seller/delete-product`, {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id: id,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert("Delete Success", "", "success");
                        refetch();
                        reload();
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
                              reload();
                        });

            })

      };
    


      const updateProductStatus = (product, status) => {
           
            if (status === true && !product?.handling && !product?.commission) {
                  setModalOpen(product?._id);
                  return;
            }
            fetch(`https://doob.dev/api/v1/seller/update-product-status`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        id: product?._id,
                        status,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(" Updated Success", "", "success");
                        setSLoad(false)
                        refetch();
                        reload();
                        
                  });
      };

      // select product
      const [on, setOn] = useState(null);
      const [printProduct, setPrintProduct] = useState([]);

      const handleUpdateCheck = (productId) => {
            setSelectProducts((prevSelectedProducts) => {
                  if (prevSelectedProducts.includes(productId)) {
                        return prevSelectedProducts?.filter((id) => id !== productId);
                  } else {
                        return [...prevSelectedProducts, productId];
                  }
            });
      };

      const handleSelectAll = () => {
            if (selectProducts.length === currentItems.length) {
                  // If all products are already selected, deselect all
                  setSelectProducts([]);
            } else {
                  // Otherwise, select all products
                  const allProductIds = currentItems.map((product) => product._id);
                  setSelectProducts(allProductIds);
            }
      };

      const logSelectedProducts = () => {
            const selectedProductData = currentItems.filter((product) =>
                  selectProducts.includes(product._id)
            );
            setPrintProduct(selectedProductData);
            setOn(!on);
      };

      const [currentPage, setCurrentPage] = useState(1);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = filteredData.slice(startIndex, endIndex);

      const [loading, setLoading] = useState(false);
      const handleSubmit = (e) => {
            e.preventDefault();

            const message = e.target.message.value;
            setLoading(true);

            fetch(
                  `https://doob.dev/api/v1/admin/product-reject-message?id=${openModal._id}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              id: openModal._id,
                              message,
                              status: "reject",
                        }),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        setOpenModal(false);
                        showAlert(" Updated Success", "", "success");
                        refetch();
                        reload();
                  });
      };
      const update_product_multi_vendor = (product, status) => {
            // const navigate = useNavigate(); // For navigation

            // Ensure the product is valid
            if (!product) {
                  showAlert("Error", "Invalid product data", "error");
                  return;
            }

            // Check if the product belongs to the admin warehouse
            if (!product?.adminWare || product.variantData.product1?.quantityPrice < 1) {

                  Swal.fire({
                        title: "Product Management",
                        text: "Please Edit Your Product And Fill all required data.",
                        icon: "info",
                        showCancelButton: false,
                        customClass: {
                              confirmButton: "swal2-confirm swal2-styled",
                              cancelButton: "swal2-cancel swal2-styled",
                        },
                        focusConfirm: false,
                  })
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
                              setLoading(false);
                              setOpenModal(false);
                              showAlert(" Update Success", "", "success");
                              setSLoad(false)
                              refetch();
                              reload();
                        });


            }
      };

      const barcode_generate = () => {
            const pdf = new jsPDF();
            const barcodesPerRow = 3;
            const maxProductsPerPage = 20;
            let productsDisplayed = 0;
            let pageIndex = 0;
            let yPos = 10;

            selectProducts.forEach((productId, index) => {
                  // Create a barcode for each product ID using JsBarcode
                  const canvas = document.createElement("canvas");
                  JsBarcode(canvas, productId, {
                        format: "CODE128", // You can specify the barcode format here
                        displayValue: false, // Hide the text beneath the barcode
                  });

                  // Convert canvas to base64 image
                  const imgData = canvas.toDataURL("image/png");

                  // Add barcode image to PDF
                  if (productsDisplayed >= maxProductsPerPage) {
                        pdf.addPage();
                        pageIndex++; // Increment page index
                        yPos = 10; // Reset y position for new page
                        productsDisplayed = 0; // Reset products displayed counter
                  }

                  const rowIndex = Math.floor(productsDisplayed / barcodesPerRow);
                  const colIndex = productsDisplayed % barcodesPerRow;

                  const xPos = 10 + colIndex * 70; // Adjust position for each column

                  pdf.addImage(imgData, "PNG", xPos, yPos, 50, 25); // Adjust position and size as needed
                  pdf.setFontSize(11); // Adjust font size for product ID
                  pdf.text(xPos, yPos + 30, `${productId}`); // Adjust position for product ID

                  productsDisplayed++;

                  if (colIndex === barcodesPerRow - 1) {
                        yPos += 60; // Increase y position for next row
                  }
            });

            // Save or navigate to the PDF page
            pdf.save("barcodes.pdf"); // Save PDF
      };

      const [loading_start, setLoading_start] = useState(false);
      const create_barcode = () => {
            setLoading_start(true);
            barcode_generate();
            setLoading_start(false);
            // need to selected productId as a pdf and barcode
            // and navigate anoter page
      };

      const [editMode, setEditMode] = useState(false);
      const [editedCommission, setEditedCommission] = useState("");
      const [editedHandling, setEditedHandling] = useState("");
      const [editedValues, setEditedValues] = useState([]);
      const [ware, setWare] = useState([]);
      const [oldprice, setOldPrice] = useState({});

      const check_input = (product_id, commission, handling, warehouse, pice) => {
            setEditMode(product_id);
            setEditedCommission(commission);
            setEditedHandling(handling);
            setWare(warehouse);
            setOldPrice(pice);
      };

      const save_input = () => {
            const handling = editedValues.handling
                  ? editedValues.handling
                  : oldprice.handling;
            const commission = editedValues.commission
                  ? editedValues.commission
                  : oldprice.commission;
            const warehouse = ware;
            const data = {
                  handling,
                  commission,
                  warehouse,
            };
            fetch(
                  `https://doob.dev/api/v1/admin/update-product-info?productId=${editMode}`,
                  {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        reload();
                        showAlert(" Update Success", "", "success");
                        setEditMode(false);
                        setEditedCommission("");
                        setEditedHandling("");
                        setWare([]);
                        setOldPrice({});
                  });
      };



      const [reject_message, setRejectMessage] = useState(false);
      const [seller_warehouse, setSellerWarehouse] = useState(false);
      const [doob_warehouse, setDoob_warehouse] = useState(false);

      const [error, setError] = useState(null);
      const [shops, setShops] = useState({});

      useEffect(() => {
            const fetchShopData = async () => {
                  try {
                        // Extract unique shop IDs from currentItems
                        const shopIds = [...new Set(currentItems.map((product) => product.shopId))];
                        const shopData = {};

                        await Promise.all(
                              shopIds.map(async (shopId) => {
                                    const res = await fetch(`https://doob.dev/api/v1/shop/${shopId}`);
                                    if (!res.ok) throw new Error('Failed to fetch shop data');
                                    const shop = await res.json();
                                    shopData[shopId] = shop;
                              })
                        );

                        setShops(shopData); // Store fetched shop data
                        setLoading(false);
                  } catch (err) {
                        console.error(err);
                        setError('Error fetching shop data');
                        setLoading(false);
                  }
            };

            if (currentItems?.length > 0) {
                  fetchShopData();
            }
      }, [currentItems]);
      // update package handling
      console.log(currentItems,'currentItems')
      const { data: sortedPackageData = [] } = useQuery({
            queryKey: ["packageData"],
            queryFn: async () => {
                  const getPackage = "https://doob.dev/api/v1/admin/package";

                  const res = await fetch(getPackage);
                  if (!res.ok) {
                        throw new Error(`Failed to fetch data: ${res?.statusText}`);
                  }
                  const data = await res.json();
                  return data;
            },
      });




      const [selectedPackage, setSelectedPackage] = useState("");

      const handlePackageChange = (e) => {

            setSelectedPackage(e.target.value);
            setEditedValues({
                  handling: e.target.value,
            });
      };
      const options = [
            { value: "", label: "All Shops" }, // Add the "All Shops" option
            ...sellers.map((seller) => ({
              value: seller.email,
              label: seller.shopName,
            })),
          ];
          


      const totalPages = Math.ceil(filteredData.length / itemsPerPage);



      // Handle page change
      const handlePageChange = (page) => {
            if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
            }
      };

      // Create page range for pagination
      const createPageRange = () => {
            const range = [];
            const delta = 2; // Number of pages to show before and after the current page

            for (let i = 1; i <= totalPages; i++) {
                  if (
                        i <= delta + 1 ||
                        (i >= currentPage - delta && i <= currentPage + delta) ||
                        i > totalPages - delta
                  ) {
                        range.push(i);
                  }
            }

            if (range[0] !== 1) range.unshift('...');
            if (range[range.length - 1] !== totalPages) range.push('...');

            return range;
      };

      const pageRange = createPageRange();

      const [showPriceRange, setShowPriceRange] = useState(false);


      // const export_product = () => {
      //       if (!selectProducts.length) {
      //             BrightAlert({
      //                   title: 'No Products Selected',
      //                   icon: 'info',
      //                   timeDuration: 3000
      //             });
      //             return;
      //       }

      //       const selected_item = filteredData?.filter((product) => selectProducts.includes(product._id));
      //       // Define the CSV headers
      //       const headers = ["Product Name", "Price", "Quantity", "Product SKU"]; // Add more headers as needed

      //       // Map selected products to rows of CSV format
      //       const rows = selected_item.map(product => [
      //             product.name && product?.name.split(" ").slice(0, 5).join(" "),
      //             product.price,
      //             product.stock_quantity,
      //             product.sku,
      //             // Add more fields as needed
      //       ]);

      //       // Combine headers and rows
      //       let csvContent = [headers, ...rows]
      //             .map(e => e.join(",")) // Convert each row array to a comma-separated string
      //             .join("\n"); // Join all rows with a newline

      //       // Create a Blob from the CSV content
      //       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      //       // Create a link and trigger the download
      //       const link = document.createElement("a");
      //       const url = URL.createObjectURL(blob);
      //       link.setAttribute("href", url);
      //       link.setAttribute("download", "exported_products.csv");
      //       link.style.visibility = "hidden";
      //       document.body.appendChild(link);
      //       link.click();
      //       document.body.removeChild(link);
      // };

      const export_product = () => {
            // Filter products based on selected product IDs
            const selectedProducts = products?.filter((product) =>
                  selectProducts.includes(product._id)
            );

            // Check if no product is selected
            if (!selectedProducts || selectedProducts.length < 1) {
                  BrightAlert({
                        title: 'Please select a product first',
                        icon: 'warning',
                  });
                  return;
            }

            // Helper function to flatten nested objects
            const flattenObject = (obj, parent = '', result = {}) => {
                  for (const key in obj) {
                        const propName = parent ? `${parent}.${key}` : key;
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                              flattenObject(obj[key], propName, result);
                        } else {
                              result[propName] = obj[key];
                        }
                  }
                  return result;
            };

            // Helper function to safely format each CSV cell
            const formatCSVCell = (value) => {
                  if (value === null || value === undefined) return '""';
                  const escapedValue = String(value).replace(/"/g, '""'); // Escape any internal quotes
                  return `"${escapedValue}"`; // Wrap in quotes
            };

            // Flatten each selected product and get all unique headers
            const flattenedProducts = selectedProducts.map(product => flattenObject(product));
            const headers = [...new Set(flattenedProducts.flatMap(product => Object.keys(product)))];

            // Prepare CSV rows
            const csvRows = [
                  headers.map(formatCSVCell).join(','), // CSV header row
                  ...flattenedProducts.map(product =>
                        headers.map(header => formatCSVCell(product[header])).join(',')
                  )
            ];

            // Convert rows to CSV format
            const csvContent = csvRows.join('\n');

            // Create and download the CSV file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `exported_products_${new Date().toISOString()}.csv`;
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      };



      const product_trash = (id, status) => {
            fetch(`https://doob.dev/api/v1/seller/update-product-any-data`, {
                  method: 'PUT',
                  headers: {
                        'content-type': 'application/json'
                  },
                  body: JSON.stringify({
                        id: id,
                        data: { delete_status: status }
                  })
            })
                  .then(res => res.json())
                  .then(data => {
                        console.log(data, "deleted data");
                        if (data?.success) {
                              refetch()
                              reload()
                              showAlert("Product Status Updated", "", "success");
                        } else {
                              showAlert("Something went wrong. Please try again", "", "error");
                        }
                  })
      }




      return (
            <div className="relative">
                  <div className="flex justify-between items-">
                        <div className="flex items-center gap-6">
                              <h2 className="text-lg font-medium text-gray-800 ">All Product</h2>
                              <span className="px-3 h-[30px] text-xs flex items-center bg-blue-100 rounded-full d text-blue-400">
                                    {filteredData?.length}
                              </span>
                        </div>
                        <div className="flex items-center gap-2">
                              <select
                                    className="border w-[50px] px-1 py-2 text-sm rounded"
                                    onChange={(e) => setItemsPerPage(e.target.value)}
                              >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={70}>70</option>
                                    <option value={100}>100</option>
                              </select>{" "}
                              <span className="text-sm">Entire per page</span>
                        </div>
                  </div>

                  <div className="flex ">
                        <div className="relative   my-2 mr-10">
                              <input
                                    type="text"
                                    id="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search for..."
                                    className="min-w-36  px-5 whitespace-nowrap  rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
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
                        <div className="flex whitespace-nowrap gap-1 w-[150px] items-center">
                              <Select
                                    className="w-[150px]"
                                    options={options}
                                    onChange={(selectedOption) => handleSelectChange(selectedOption.value)}
                                    placeholder="All Shop"
                                    isSearchable
                              />
                        </div>


                  </div>
                  <div className="flex items-center gap-2 ml-2  custom-scroll overflow-x-auto">
                        <button
                              className="bg-white whitespace-nowrap px-3 border py-2 rounded text-black "
                              onClick={create_barcode}
                        >
                              {loading_start ? "Loading" : "Barcode Generate"}
                        </button>

                        {/* <button
                              onClick={logSelectedProducts}
                              disabled={!selectProducts.length}
                              className="bg-white whitespace-nowrap border py-2 rounded px-6"
                        >
                              Print
                        </button> */}

                        <button
                              onClick={() => {
                                    setAll(true),
                                          setSellerWarehouse(false),
                                          setDoobProduct(false),
                                          setDoob_warehouse(false);
                              }}
                              className={`${all ? "bg-green-200" : " bg-white"
                                    } px-3  py-2 whitespace-nowrap rounded text-black border`}
                        >
                              All Warehouse
                        </button>
                        <button
                              onClick={() => {
                                    setDoobProduct(true),
                                          setAll(false),
                                          setSellerWarehouse(false),
                                          setDoob_warehouse(true);
                              }}
                              className={`${doob_warehouse ? "bg-green-200" : " bg-white"
                                    } px-3  py-2 whitespace-nowrap rounded text-black border`}
                        >
                              Doob Warehouse
                        </button>
                        <button
                              onClick={() => {
                                    setDoobProduct(false), setAll(false);
                                    setDoob_warehouse(false), setSellerWarehouse(true);
                              }}
                              className={`${seller_warehouse ? "bg-green-200" : " bg-white"
                                    } px-3  py-2 whitespace-nowrap rounded text-black border`}
                        >
                              Seller Warehouse
                        </button>
                        <div>
                              <div className="flex gap-1  whitespace-nowrap items-center">


                                    <button onClick={() => DeleteBulk()} className="px-2 bg-white py-2 rounded border" aria-haspopup="true">
                                          Delete
                                    </button>
                              </div>

                        </div>
                        <div>
                              <div className="flex gap-1 whitespace-nowrap  items-center">


                                    <button onClick={() => export_product()} className="px-2 bg-white py-2 rounded border" aria-haspopup="true">
                                          Export
                                    </button>
                              </div>

                        </div>
                        <div>
                              <div className="flex gap-1  whitespace-nowrap items-center">


                                    <button onClick={() => set_trash(!trash)} className="px-2 bg-white py-2 rounded border" aria-haspopup="true">
                                          Trash
                                    </button>
                              </div>

                        </div>
                        <div>
                              <div className="flex gap-1 whitespace-nowrap  items-center">
                                    <select onChange={(e) => {
                                          const value = e.target.value;
                                          if (value === "active") {
                                                set_product_status(true);
                                                set_reject_status(null); // Reset reject status if switching to "active"
                                          } else if (value === "reject") {
                                                set_product_status(false);
                                                set_reject_status('reject'); // Set reject status when "rejected" is selected
                                          } else if (value === "pending") {
                                                set_product_status(false);
                                                set_reject_status(null); // Reset reject status if switching to "pending"
                                          }
                                          else if (value === "all") {
                                                set_product_status(null);
                                                set_reject_status(null); // Reset reject status if switching to "pending"
                                          }
                                    }} className="px-2 bg-white py-2 rounded border" name="status" id="">
                                          <option value="all">All</option>
                                          <option value="active">Active</option>
                                          <option value="reject">Rejected</option>
                                          <option value="pending">Pending</option>
                                    </select>
                              </div>

                        </div>
                        <div>
                              <div className="flex gap-1  whitespace-nowrap items-center">
                                    <select onChange={(e) => set_source(e.target.value)} className="px-2 bg-white py-2 rounded border" name="status" id="">
                                          <option value="all">Source</option>
                                          <option value="doob">Doob</option>
                                          <option value="daraz">Daraz</option>
                                          <option value="woo">Woo Commerce</option>
                                    </select>
                              </div>

                        </div>
                        {/* <div>
                                    <div className="flex gap-1  whitespace-nowrap items-center">
                                          <input type="date" name="date" id="date" className="px-2 bg-white py-2 rounded border" />
                                    </div>
                              </div> */}
                        <div className="">
                              {/* Button to Show/Hide Price Range */}
                              <button
                                    onClick={() => setShowPriceRange(!showPriceRange)}
                                    className="px-3 py-2 whitespace-nowrap bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                    {showPriceRange ? "Hide Price Range" : "Show Price Range"}
                              </button>

                              {/* Price Range Inputs (Conditionally Rendered) */}

                        </div>

                        <div>
                              {showPriceRange && (
                                    <div className=" flex gap-2">
                                          <input
                                                onChange={handleMinPriceChange}
                                                type="number"
                                                placeholder="Min Price"
                                                className="px-2 bg-white py-2 rounded border"
                                          />
                                          <input
                                                onChange={handleMaxPriceChange}
                                                type="number"
                                                placeholder="Max Price"
                                                className="px-2 bg-white py-2 rounded border"
                                          />
                                    </div>
                              )}
                        </div>


                        {/* Price Range Inputs (only visible when the button is clicked) */}



                  </div>

                  <section className="">
                        <div className="flex flex-col mt-6">
                              <div className="bar overflow-x-auto">
                                    <div className="  py-2">
                                          {on && (
                                                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                                                      {" "}
                                                      <PrintList setOn={setOn} products={printProduct} />
                                                </div>
                                          )}
                                          <div className=" bar overflow-x-auto border  border-gray-700 md:rounded-lg">
                                                <table className=" divide-y w-full divide-gray-700">
                                                      <thead className="bg-gray-900 text-white ">
                                                            <tr>
                                                                  <th className="px-4 py-4 text-sm font-medium  text-gray-700 whitespace-nowrap">
                                                                        <label
                                                                              className="flex items-center gap-2  font-medium "
                                                                              htmlFor="select"
                                                                        >
                                                                              <input
                                                                                    id="select"
                                                                                    type="checkbox"
                                                                                    className="cursor-pointer"
                                                                                    checked={
                                                                                          selectProducts.length === currentItems.length
                                                                                    }
                                                                                    onChange={handleSelectAll}
                                                                              />
                                                                        </label>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5  text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <div className="flex items-center">
                                                                              <span>Name</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-12  text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <div className="flex items-center">
                                                                              <span>Seller</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Source</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Status</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Category</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        Warehouse
                                                                  </th>

                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        Stock Quantity
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right "
                                                                  >
                                                                        Fees
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left  "
                                                                  >
                                                                        <span>Action</span>
                                                                  </th>
                                                            </tr>
                                                      </thead>

                                                      <tbody className="bg-white divide-y  divide-gray-200 ">
                                                            {isLoading ? (
                                                                  <tr>
                                                                        <td colSpan="8" className="text-center py-8">
                                                                              <LoaderData />
                                                                        </td>
                                                                  </tr>
                                                            ) : currentItems?.length > 0 ? (
                                                                  currentItems?.map((product, i) => {
                                                                        const shop = shops[product.shopId];
                                                                        return (
                                                                              <tr key={product?._id}>
                                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          <div className="inline-flex items-center gap-x-3">
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
                                                                                          </div>
                                                                                    </td>
                                                                                    <td>
                                                                                          <div className="flex  duration-150 items-start gap-9 relative">
                                                                                                <div className="imgSm w-[20px] h-[20px] bg-red-50">
                                                                                                      <div
                                                                                                            style={{
                                                                                                                  backgroundImage: `url(${product &&
                                                                                                                        (product.featuredImage?.src ||
                                                                                                                              (product.images &&
                                                                                                                                    product.images[0]?.src))
                                                                                                                        })`,
                                                                                                            }}
                                                                                                            className="w-12 h-12 object-cover bg-cover rounded-md border border-[#8080809d] bar overflow-hidden"
                                                                                                      ></div>
                                                                                                      <div

                                                                                                            className="absolute top-[-40px] z-50 duration-150 abs hidden   left-[43px] object-cover bg-cover bg-white shadow-xl w-[150px] h-[150px] ring-1 ring-gray-500"
                                                                                                      ></div>
                                                                                                </div>

                                                                                                <div>
                                                                                                      <h2 className="font-medium text-gray-800 ">
                                                                                                            {product.name &&
                                                                                                                  product?.name
                                                                                                                        .split(" ")
                                                                                                                        .slice(0, 5)
                                                                                                                        .join(" ")}
                                                                                                      </h2>
                                                                                                      <p className="text-sm font-normal  text-gray-400">
                                                                                                            {product && product?._id}
                                                                                                      </p>
                                                                                                </div>
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">

                                                                                          {shop ? (
                                                                                                <span> <p>{shop.shopName}</p> <p>{shop.subDomain}</p> <p>{shop.shopNumber}</p></span>
                                                                                          ) : (
                                                                                                <div></div>
                                                                                          )}
                                                                                          <p> {product.seller}</p>

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
                                                                                    <td className="px-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                          {product?.status === true ? (
                                                                                                <button
                                                                                                      onClick={() =>
                                                                                                            updateProductStatus(product, false)
                                                                                                      }
                                                                                                      className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 cursor-pointer bg-emerald-100/60 bg-gray-800"
                                                                                                >
                                                                                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                                                     
                                                                                                             {sload==false ? (
                                                                                                             <h2 className="text-sm font-normal text-red-500">loading..</h2>
                                                                                                            ):(
                                                                                                             <h2 className="text-sm font-normal text-emerald-500">Active </h2> )}
                                                                                                      
                                                                                                </button>
                                                                                          ) : (
                                                                                                (() => {

                                                                                                      return (
                                                                                                            <button
                                                                                                                  // disabled={
                                                                                                                  //   filteredWarehouses?.length < 2
                                                                                                                  // }
                                                                                                                  onClick={() =>
                                                                                                                        updateProductStatus(product, true)
                                                                                                                  }
                                                                                                                  className="inline-flex items-center px-3 py-1 rounded-full cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                            >
                                                                                                                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                                                                  

                                                                                                                   {sload==false ? (
                                                                                                                        <h2 className="text-sm font-normal text-red-500">loading..</h2>
                                                                                                                        ):(
                                                                                                                        <h2 className="text-sm font-normal text-red-500">Pending </h2> )}
                                                                                                                  
                                                                                                            </button>
                                                                                                      );
                                                                                                })()
                                                                                          )}

                                                                                          <div className="flex justify-center py-2">
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
                                                                                                                  Doob  Yes
                                                                                                            </h2>
                                                                                                      </div>
                                                                                                ) : (
                                                                                                      <div
                                                                                                            // onClick={() =>
                                                                                                            //       update_product_multi_vendor(
                                                                                                            //             product,
                                                                                                            //             true
                                                                                                            //       )
                                                                                                            // }
                                                                                                            className="inline-flex items-center px-3 py-1 rounded-full  cursor-pointer gap-x-2 bg-emerald-100/60 bg-gray-800"
                                                                                                      >
                                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                                                                            <h2 className="text-sm font-normal text-yellow-500">
                                                                                                                  Doob No
                                                                                                            </h2>
                                                                                                      </div>
                                                                                                )}
                                                                                          </div>
                                                                                    </td>

                                                                                    <td className="px-4 py-4 text-sm text-black whitespace-nowrap  gap-1">
                                                                                          {product?.categories?.length &&
                                                                                                product?.categories?.map((itm, index) => (
                                                                                                      <div
                                                                                                            className="text-sm  items-left "
                                                                                                            key={index}
                                                                                                      >
                                                                                                            {itm?.name}
                                                                                                      </div>
                                                                                                ))}
                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                                                          {/* {product?.warehouse?.map((ware) => ware?.name)} */}
                                                                                          <button
                                                                                                className="inline- items-center px-2 py-1  cursor-pointer bg-emerald-100/60 bg-gray-800 text-white"
                                                                                                onClick={() => setModalOpen(product?._id)}
                                                                                          >
                                                                                                {" "}
                                                                                                {/* {"Select Warehouse"} */}
                                                                                                {product?.warehouse?.filter(
                                                                                                      (item) => item?.name
                                                                                                )?.length
                                                                                                      ? product?.warehouse?.map((ware, index) => (
                                                                                                            <p key={ware?.name}>{ware?.name}</p>
                                                                                                      ))
                                                                                                      : "Select Warehouse"}
                                                                                          </button>
                                                                                    </td>

                                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
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
                                                                                                            ) : (<></>)}
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

                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                          <div className="flex items-center gap-x-2">
                                                                                                Processing{" "}
                                                                                                {editMode === product._id &&
                                                                                                      editedCommission ? (
                                                                                                      <div className="flex gap-2 ">
                                                                                                            <input
                                                                                                                  type="text"
                                                                                                                  defaultValue={product?.commission}
                                                                                                                  onChange={(e) =>
                                                                                                                        setEditedValues({
                                                                                                                              commission: e.target.value,
                                                                                                                        })
                                                                                                                  }
                                                                                                                  className="px-3 w-12 py-1 text-sm border rounded bg-gray-100"
                                                                                                            />
                                                                                                            <button>
                                                                                                                  <BiSave onClick={save_input} />
                                                                                                            </button>
                                                                                                      </div>
                                                                                                ) : (
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  check_input(
                                                                                                                        product._id,
                                                                                                                        true,
                                                                                                                        false,
                                                                                                                        product.warehouse,
                                                                                                                        {
                                                                                                                              commission: product?.commission,
                                                                                                                              handling: product?.handling,
                                                                                                                        }
                                                                                                                  )
                                                                                                            }
                                                                                                            className="px-3 py-1 flex items-center gap-2 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60"
                                                                                                      >
                                                                                                            {product?.commission}
                                                                                                            <BiEdit />
                                                                                                      </button>
                                                                                                )}
                                                                                          </div>

                                                                                          <div className="flex items-center gap-x-2 py-3">
                                                                                                Packaging:{" "}
                                                                                                {editMode === product._id && editedHandling ? (
                                                                                                      <div className="flex gap-2 ">

                                                                                                            <select
                                                                                                                  id="package"
                                                                                                                  value={selectedPackage}
                                                                                                                  defaultValue={sortedPackageData?.find(
                                                                                                                        (pkg) => pkg?._id === product?.handling
                                                                                                                  )}
                                                                                                                  className="mt-2 border border-gray-300  py-3 rounded-md w-[48px] focus:outline-none focus:border-blue-500 text-black "
                                                                                                                  onChange={handlePackageChange}
                                                                                                            >
                                                                                                                  <option value="">Select Package</option>
                                                                                                                  {sortedPackageData?.map((pkg) => {
                                                                                                                        return (
                                                                                                                              <option
                                                                                                                                    key={pkg._id}
                                                                                                                                    value={pkg?._id}
                                                                                                                              >
                                                                                                                                    {pkg.name}
                                                                                                                              </option>
                                                                                                                        );
                                                                                                                  })}
                                                                                                            </select>
                                                                                                            <button>
                                                                                                                  <BiSave onClick={save_input} />
                                                                                                            </button>
                                                                                                      </div>
                                                                                                ) : (
                                                                                                      <button
                                                                                                            onClick={() =>
                                                                                                                  check_input(
                                                                                                                        product._id,
                                                                                                                        false,
                                                                                                                        true,
                                                                                                                        product.warehouse,
                                                                                                                        {
                                                                                                                              commission: product?.commission,
                                                                                                                              handling: product?.handling,
                                                                                                                        }
                                                                                                                  )
                                                                                                            }
                                                                                                            className="px-3 py-1 text-xs text-indigo-500 flex items-center gap-2  rounded-full bg-gray-800 bg-indigo-100/60"
                                                                                                      >
                                                                                                            {
                                                                                                                  sortedPackageData?.find(
                                                                                                                        (pkg) => pkg?._id === product?.handling
                                                                                                                  )?.name
                                                                                                            }

                                                                                                            <BiEdit />
                                                                                                      </button>
                                                                                                )}
                                                                                          </div>
                                                                                    </td>
                                                                                    <td className="px-4 py-4 text-sm flex gap-4 whitespace-nowrap my-auto">
                                                                                          <div className="flex items-center gap-x-2 my-auto">

                                                                                                {!trash ? <button onClick={() => product_trash(product._id, 'trash')} className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none">
                                                                                                      <svg
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            fill="none"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            strokeWidth="1.5"
                                                                                                            stroke="currentColor"
                                                                                                            className="w-5 h-5"
                                                                                                      >
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                                            />
                                                                                                      </svg>
                                                                                                </button> :
                                                                                                      <div className="flex items-center gap-2">
                                                                                                            <button onClick={() => DeleteSeller(product._id)} className=" transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none">
                                                                                                                  <svg
                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                        fill="none"
                                                                                                                        viewBox="0 0 24 24"
                                                                                                                        strokeWidth="1.5"
                                                                                                                        stroke="currentColor"
                                                                                                                        className="w-5 h-5"
                                                                                                                  >
                                                                                                                        <path
                                                                                                                              strokeLinecap="round"
                                                                                                                              strokeLinejoin="round"
                                                                                                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                                                        />
                                                                                                                  </svg>
                                                                                                            </button>

                                                                                                            <button onClick={() => product_trash(product._id, 'un_trash')} >
                                                                                                                  <RotateCcw className="text-green-500" />
                                                                                                            </button>
                                                                                                      </div>}
                                                                                                {product?.product_status == "reject" ? (
                                                                                                      <button
                                                                                                            onClick={() => setRejectMessage(product)}
                                                                                                            className="px-2 py-1 text-red-500 "
                                                                                                      >
                                                                                                            Rejected
                                                                                                      </button>
                                                                                                ) : (
                                                                                                      <div className="relative">
                                                                                                            <button
                                                                                                                  onClick={() => setOpenModal(product)}
                                                                                                                  className=" transition-colors duration-200 text-white rounded px-3 py-1 bg-red-500 hover:text-red-700 focus:outline-none"
                                                                                                            >
                                                                                                                  Reject{" "}
                                                                                                            </button>
                                                                                                            <span className="text-yellow-500 bg-black text-sm font-mono absolute -top-4 -right-3 rounded p-[1px]">
                                                                                                                  {" "}
                                                                                                                  {product?.product_status ===
                                                                                                                        "reject-requests" && "re-request"}
                                                                                                            </span>
                                                                                                      </div>
                                                                                                )}
                                                                                          </div>
                                                                                          <div>
                                                                                                <Link
                                                                                                      className="mx-4"
                                                                                                      to={`/products/${product._id}`}
                                                                                                >
                                                                                                      <BsEye />
                                                                                                </Link>
                                                                                          </div>
                                                                                    </td>
                                                                                    <div className="h-0 w-0">
                                                                                          {modalOpen == product?._id && (
                                                                                                <WarehouseModal
                                                                                                      doobProduct={doobProduct}
                                                                                                      modalOpen={modalOpen}
                                                                                                      product={product}
                                                                                                      setModalOpen={setModalOpen}
                                                                                                      reload={reload}
                                                                                                />
                                                                                          )}
                                                                                    </div>

                                                                                    <div>
                                                                                          <div
                                                                                                onClick={() => setOpenModal(false)}
                                                                                                className={`fixed z-[100] flex items-center justify-center ${openModal._id == product?._id
                                                                                                      ? "visible opacity-100"
                                                                                                      : "invisible opacity-0"
                                                                                                      } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                                                                          >
                                                                                                <div
                                                                                                      onClick={(e_) => e_.stopPropagation()}
                                                                                                      className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${openModal._id == product?._id
                                                                                                            ? "scale-1 opacity-1 duration-300"
                                                                                                            : "scale-0 opacity-0 duration-150"
                                                                                                            }`}
                                                                                                >
                                                                                                      <form onSubmit={handleSubmit}>
                                                                                                            <h1 className="mb-2 text-2xl font-semibold">
                                                                                                                  Rejected Message!
                                                                                                            </h1>
                                                                                                            <textarea
                                                                                                             value={openModal?.message || ''}
                                                                                                                  name="message"
                                                                                                                  className="w-full border mb-6 p-2"
                                                                                                                  placeholder="typer rejected message"
                                                                                                            />
                                                                                                            <div className="flex justify-between">
                                                                                                                  <button
                                                                                                                        type="submit"
                                                                                                                        className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                                                                                                                  >
                                                                                                                        {loading ? "Loading..." : "Submit"}
                                                                                                                  </button>
                                                                                                                  <button
                                                                                                                        type="button"
                                                                                                                        onClick={() => setOpenModal(false)}
                                                                                                                        className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                                                                                  >
                                                                                                                        Cancel
                                                                                                                  </button>
                                                                                                            </div>
                                                                                                      </form>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </tr>
                                                                        );
                                                                  })
                                                            ) : (
                                                                  ""
                                                            )}
                                                      </tbody>

                                                      <div>
                                                            {reject_message && (
                                                                  <Show_Reject_Modal
                                                                        openModal={reject_message}
                                                                        setOpenModal={setRejectMessage}
                                                                  />
                                                            )}
                                                      </div>
                                                </table>
                                          </div>
                                    </div>



                              </div>

                        </div>
                        <br />
                        <div className="py-6 bg-gray-50">
                              <div className="px-4 mx-auto  max-w-7xl">
                                    <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                                          <p className="text-sm font-medium text-gray-500">
                                                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
                                          </p>
                                          <nav className="relative mt-6 lg:mt-0 flex justify-end space-x-1.5">
                                                <button
                                                      onClick={() => handlePageChange(currentPage - 1)}
                                                      disabled={currentPage === 1}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                      aria-label="Previous"
                                                >
                                                      <span className="sr-only">Previous</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M15 19l-7-7 7-7"
                                                            />
                                                      </svg>
                                                </button>

                                                {pageRange.map((page, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                                                            className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold ${typeof page === 'number' ? (currentPage === page ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-400 bg-white border border-gray-200') : 'text-gray-500 bg-white border border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9`}
                                                            aria-current={typeof page === 'number' && currentPage === page ? 'page' : undefined}
                                                      >
                                                            {page}
                                                      </button>
                                                ))}

                                                <button
                                                      onClick={() => handlePageChange(currentPage + 1)}
                                                      disabled={currentPage === totalPages}
                                                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-9"
                                                      aria-label="Next"
                                                >
                                                      <span className="sr-only">Next</span>
                                                      <svg
                                                            className="flex-shrink-0 w-4 h-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                                            />
                                                      </svg>
                                                </button>
                                          </nav>
                                    </div>
                              </div>
                        </div>

                  </section>
            </div>
      );
};

export default ManageProduct;

const Show_Reject_Modal = ({ openModal, setOpenModal }) => {
      return (
            <div>
                  <div>
                        <div
                              onClick={() => setOpenModal(false)}
                              className={`fixed z-[100] flex items-center justify-center ${openModal._id ? "visible opacity-100" : "invisible opacity-0"
                                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                        >
                              <div
                                    onClick={(e_) => e_.stopPropagation()}
                                    className={`text- absolute w-[400px] rounded-sm bg-white p-6 drop-shadow-lg dark:bg-white dark:text-black ${openModal._id
                                          ? "scale-1 opacity-1 duration-300"
                                          : "scale-0 opacity-0 duration-150"
                                          }`}
                              >
                                    <form>
                                          <h1 className="mb-2 text-2xl font-semibold">Rejected Message!</h1>
                                          <textarea
                                                name="message"
                                                value={openModal?.message}
                                                className="w-full border mb-6 p-2"
                                                placeholder=" rejected message"
                                          />
                                          <div className="flex justify-between">
                                                {/* <button
                  type="submit"
                  className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white"
                >
                  {"Submit"}
                </button> */}
                                                <button
                                                      type="button"
                                                      onClick={() => setOpenModal(false)}
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
      );
};
