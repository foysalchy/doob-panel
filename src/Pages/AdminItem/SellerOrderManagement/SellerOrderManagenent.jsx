import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import ReadyToShipModal from "./ReadyToShipModal";
import BrightAlert from "bright-alert";
import BarCode from "react-barcode";
import SellerOrderInvoice from "./SellerOrderInvoice";
import OrderInvoice from "./OrderInvoice";
import { ordersNav } from "./ManageOrderNavData";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import AllOrderInvoice from "../../SellerItems/OrderManagment/ManageOrder/AllOrderInvoice";
import AllAdminOrderInvoice from "./AllAdminOrderInvoice";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import SelectStatusUpdate from "./SelectStatusUpdate";
import LoaderData from "../../../Common/LoaderData";
import AdminSellerOrder from "./AdminSellerOrder";
import showAlert from "../../../Common/alert";
import { Link } from "react-router-dom";
import Select from "react-select";
import AdminDoobInvoice from "./AdminDoobInvoice";
import Barcode from "react-barcode";
import Datepicker from "react-tailwindcss-datepicker";


const SellerOrderManagement = () => {
      const [selectedValue, setSelectedValue] = useState("pending");
      const [searchQuery, setSearchQuery] = useState("");
      const [selectedDate, setSelectedDate] = useState(null);
      const [modalOpen, setModalOpen] = useState(false);
      const [selected_seller, set_selected_seller] = useState(false);
      const [selected_warehouse, set_selected_warehouse] = useState(false);

      const { setCheckUpData, daraz_order, set_daraz_order } = useContext(AuthContext)
      const [value, setValue] = useState({
            startDate: null,
            endDate: null
      });

      const handleSelectChange = (event) => {
            setSelectedValue(event.target.value);
      };

      const { data: products = [], refetch, isLoading } = useQuery({
            queryKey: ["sellerAllOrder"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/get-shop-all-order`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });




      const filteredData = products?.filter((item) => {


            const itemDate = new Date(item?.date).getTime(); // Assuming item.date is the date you want to check
            const startDate = new Date(value.startDate).getTime();
            const endDate = new Date(value.endDate).getTime();

            console.log(itemDate, startDate, endDate, "itemDate, startDate, endDate");


            const timestampValid = (
                  (!value.startDate && !value.endDate) || // No date filter applied
                  (itemDate >= startDate && itemDate <= endDate) // Date falls within the specified range
            );


            if (searchQuery === "" && selectedValue === "All" && timestampValid) {
                  // Include all items when searchQuery is empty, selectedValue is "All", and timestamp is valid
                  return true;
            }

            if (
                  (selectedValue === "Pending" ||
                        selectedValue === "Return" ||
                        selectedValue === "returned") &&
                  timestampValid
            ) {
                  if (selectedValue === "Pending") {
                        return !item?.status || item?.status === "";
                  } else if (selectedValue === "Return" || selectedValue === "returned") {
                        return item?.status === "Return" || item?.status === "returned";
                  }
            }

            if (searchQuery && timestampValid) {
                  return String(item?._id)
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()); // Convert _id to string
            }

            if (selectedValue && timestampValid) {
                  return item?.status === selectedValue;
            }

            return false; // Exclude items that don't meet any condition
      }).filter((item) => selected_seller ? item?.seller === selected_seller : true)
            .filter((item) =>
                  selected_warehouse
                        ? item?.product?.warehouse?.some(wh => wh?.name === selected_warehouse)

                        : true
            )


      if (selectedValue === "Return" || selectedValue === "returned") {
            filteredData?.reverse();
      }

      const [selectProducts, setSelectProducts] = useState([]);
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


      //   !  all select
      const handleSelectAll = (e, data) => {

            const isChecked = e.target.checked;
            if (isChecked) {
                  setSelectProducts(data);
            } else {
                  setSelectProducts([]);
            }
      };

      const handleCheckboxChange = (event, item) => {
            const isChecked = event.target.checked;
            if (isChecked) {
                  // If checkbox is checked, add item to selectedItems array
                  setSelectProducts((prevSelectedItems) => [...prevSelectedItems, item]);
            } else {
                  // If checkbox is unchecked, remove item from selectedItems array
                  setSelectProducts((prevSelectedItems) =>
                        prevSelectedItems?.filter(
                              (selectedItem) => selectedItem._id !== item._id
                        )
                  );
            }
      };

      let statusCounts = {};

      // Calculate counts for each status
      filteredData.forEach((product) => {
            if (product?.status) {
                  if (!statusCounts[product?.status]) {
                        statusCounts[product?.status] = 1;
                  } else {
                        statusCounts[product?.status]++;
                  }
            }
      });

      let totalProductCount = filteredData.length;


      const logSelectedProducts = () => {
            const selectedProductData = products?.filter((product) =>
                  selectProducts.includes(product._id)
            );
            setPrintProduct(selectedProductData);
            console.log(selectedProductData, "selected products");
            setOn(!on);
      };

      // ! for status update

      const allStatus = [
            "pending",
            "ready_to_ship",
            "shipped",
            "delivered",
            "return",
            "returned",
            "Refund",
      ];
      const [isOpen, setIsOpen] = useState(false);

      const toggleDropdown = () => {
            setIsOpen(!isOpen);
      };

      const [selectedStatusModal, setSelectedStatusModal] = useState(false);
      // ! updated status all selected item
      const handleUpdateStatusForSelectedProducts = (status) => {
            console.log(status, "status");
            if (selectProducts?.length < 1) {
                  return showAlert("Please select product", "", "error");
            }

            let updatedCount = 0; // Counter for successfully updated products

            Swal.fire({
                  title: `Change Status ${status} ?`,
                  showCancelButton: true,
                  confirmButtonText: "Change",
            }).then((result) => {
                  if (result.isConfirmed) {
                        selectProducts.forEach((product) => {
                              productStatusUpdate(status, product?._id)
                                    .then((data) => {
                                          updatedCount++;
                                          console.log(data, "data");
                                          if (updatedCount === selectProducts.length) {
                                                // Display success message when all products are updated
                                                showAlert("Status Changed!", "", "success");
                                                setIsOpen(false);
                                                setSelectProducts([]);
                                          }
                                    })
                                    .catch((error) => {
                                          console.error("Error updating product status:", error);
                                    });
                        });
                  }
            });
      };
      // console.log(selectProducts);

      const [readyToShip, setReadyToShip] = useState(false);

      const { data: ships = [] } = useQuery({
            queryKey: ["adminSHipping"],
            queryFn: async () => {
                  const res = await fetch(`https://doob.dev/api/v1/admin/allShippings`);
                  const data = await res.json();
                  return data;
            },
      });


      const productStatusUpdate = async (status, orderId) => {
            console.log(status, orderId, "yyyyyyyyyyyy");
            const res = await fetch(
                  `https://doob.dev/api/v1/seller/update-seller-order-status?orderId=${orderId}&status=${status}`,
                  {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status, orderId }),
                  }
            );
            const data = await res.json();
            console.log(data);
            refetch();
      };

      const deleteMethod = (orderId) => {
            fetch(
                  `https://doob.dev/api/v1/seller/delete-seller-order?orderId=${orderId}`,
                  {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                  }
            )
                  .then((res) => res.json())
                  .then((data) => {
                        showAlert(" Delete Success", "", "success");
                        refetch();
                  });
      };

      const [currentPage, setCurrentPage] = useState(1);

      const [pageSize, setPageSize] = useState(15);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalPages = Math.ceil(filteredData?.length / pageSize);

      const currentData = filteredData?.slice(startIndex, endIndex);

      const handleChangePage = (newPage) => {
            setCurrentPage(newPage);
      };

      const calculateProfit = (sale) => {
            const revenue = sale.quantity * sale.price;
            const totalCosts =
                  parseFloat(sale.handling) + (parseFloat(sale.commission) / 100) * revenue;
            const profit = revenue - totalCosts;

            return profit.toFixed(2);
      };

      //  For

      const renderPageNumbers = () => {
            const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
            const endPage = Math.min(totalPages, startPage + pageSize - 1);

            return (
                  <React.Fragment>
                        {/* First Page */}
                        {startPage > 1 && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-900 bg-white text-center leading-8 text-gray-900`}
                                          onClick={() => handleChangePage(1)}
                                    >
                                          1
                                    </button>
                              </li>
                        )}

                        {/* Current Page */}
                        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                              const pageNumber = startPage + index;
                              return (
                                    <li key={pageNumber}>
                                          <button
                                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage
                                                      ? "border-blue-600 bg-blue-600 text-white"
                                                      : "border-gray-900 bg-white text-center leading-8 text-gray-900"
                                                      }`}
                                                onClick={() => handleChangePage(pageNumber)}
                                          >
                                                {pageNumber}
                                          </button>
                                    </li>
                              );
                        })}

                        {/* Last Page */}
                        {endPage < totalPages && (
                              <li>
                                    <button
                                          className={`block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-100`}
                                          onClick={() => handleChangePage(totalPages)}
                                    >
                                          {totalPages}
                                    </button>
                              </li>
                        )}
                  </React.Fragment>
            );
      };

      // !  for print

      const [showPrintModal1, setShowPrintModal1] = useState(false);
      const [daraz_invoice, set_daraz_invoice] = useState(false);
      const [doob_invoice, set_doob_invoice] = useState(false);

      const [selected_daraz_order, set_selected_daraz_order] = useState([])




      const handlePrint = () => {
            if (daraz_order && selected_daraz_order.length > 0) {
                  set_daraz_invoice(true);
            }

      };

      const handle_print = () => {
            console.log(selectProducts.length, 'hellow');
            if (selectProducts.length > 0) {
                  set_doob_invoice(true);
            }
            else {
                  showAlert("Please select product", "", "error");
            }
      };



      const update_paid_status = (id, status) => {

            fetch(`https://doob.dev/api/v1/seller/update-seller-order-paid-status`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                        status: status,
                        orderId: id,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        BrightAlert({ timeDuration: 3000, icon: 'success' });
                        refetch();
                  });

      }


      const { data: sellers = [] } = useQuery({
            queryKey: ["sellers_all_shop"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/shop"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      console.log(sellers, 'seller');


      const seller_option = sellers?.map((itm) => {
            return {
                  value: itm?._id,
                  label: itm?.shopName,
            };
      });

      const { data: warehouses = [], } = useQuery({
            queryKey: ["warehouses"],
            queryFn: async () => {
                  const res = await fetch("https://doob.dev/api/v1/admin/warehouse");
                  const data = await res.json();
                  return data;
            },
      });

      const warehouses_option = warehouses?.map((itm) => {
            return {
                  value: itm?.slag,
                  label: itm?.name,
            };
      });

      console.log(currentData, 'currentData');

      const seller_filter = (event) => {
            const seller_id = event?.value;
            set_selected_seller(seller_id);

      };
      const warehouse_filter = (event) => {
            const seller_id = event?.value;
            set_selected_warehouse(seller_id);

      };

      const create_label = () => {
            console.log(selectProducts, "selectProducts");
            return (
                  <div className="label-container">
                        {selectProducts?.map((product) => (
                              <div key={product._id} className="label-item">
                                    {console.log(product)}
                                    <h4>{product._id}</h4>
                                    {/* Generate a barcode using the product _id */}
                                    <Barcode value={product._id} />
                              </div>
                        ))}
                  </div>
            );
      };

      return (
            <div>
                  <section className=" mx-auto">
                        <div className="flex products-center justify-between gap-x-3">
                              <div className="flex products-center gap-2">
                                    <h2 className="text-lg font-medium text-gray-800 ">All Orders</h2>
                                    <span className="px-2 flex items-center  py-1 text-xs h-[22px] bg-blue-100 rounded-full d text-blue-400">
                                          {filteredData?.length}
                                    </span>
                              </div>

                        </div>


                        {doob_invoice && selectProducts?.length > 0 && (
                              <div>
                                    <div
                                          onClick={() => set_doob_invoice(false)}
                                          className={`fixed z-[100] flex items-center justify-center ${doob_invoice ? "visible opacity-100" : "invisible opacity-0"
                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                          <div
                                                onClick={(e_) => e_.stopPropagation()}
                                                className={`text- absolute bar overflow-y-auto w-[96%] h-[98%] rounded-sm bg-gray-50 p-6 drop-shadow-lg text-black ${doob_invoice
                                                      ? "scale-1 opacity-1 duration-300"
                                                      : "scale-0 opacity-0 duration-150"
                                                      }`}
                                          >
                                                <AdminDoobInvoice
                                                      data={selectProducts}
                                                      setShowPrintModal1={set_doob_invoice}
                                                      showPrintModal1={doob_invoice}
                                                />
                                          </div>
                                    </div>
                              </div>
                        )}


                        {daraz_invoice && selected_daraz_order?.length > 0 && (
                              <div>
                                    <div
                                          onClick={() => setShowPrintModal1(false)}
                                          className={`fixed z-[100] flex items-center justify-center ${daraz_invoice ? "visible opacity-100" : "invisible opacity-0"
                                                } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                                    >
                                          <div
                                                onClick={(e_) => e_.stopPropagation()}
                                                className={`text- absolute bar overflow-y-auto w-[96%] h-[98%] rounded-sm bg-gray-50 p-6 drop-shadow-lg text-black ${daraz_invoice
                                                      ? "scale-1 opacity-1 duration-300"
                                                      : "scale-0 opacity-0 duration-150"
                                                      }`}
                                          >
                                                <AllAdminOrderInvoice
                                                      data={selected_daraz_order}
                                                      setShowPrintModal1={set_daraz_invoice}
                                                      showPrintModal1={daraz_invoice}
                                                />
                                          </div>
                                    </div>
                              </div>
                        )}


                        <div className="md:flex items-center gap-3 mt-3 w-full ">

                        <div className="relative inline-block text-left group">
  <button
    className="px-4 bg-white py-[9px] border relative"
    id="dropdown-button"
    aria-haspopup="true"
  >
    Print
  </button>

  {/* Dropdown menu */}
  <div
    style={{ zIndex: '9' ,top:'-10px'}}
    className="absolute left-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300  opacity-0 hover:opacity-100 "
    
  >
    <ul>
      <li>
        <button
          onClick={() => (!daraz_order ? handle_print() : handlePrint())}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          Invoice
        </button>
      </li>
      {/* <li>
        <button
          onClick={() => create_label()}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          Label
        </button>
      </li> */}
    </ul>
  </div>
</div>


                              {/* for status update dropdown */}
                              <div className="relative inline-block text-left">
                                    <button
                                          onClick={toggleDropdown}
                                          className="px-4 bg-white py-[9px] border "
                                          id="dropdown-button"
                                          aria-haspopup="true"
                                          aria-expanded={isOpen ? "true" : "false"}
                                    >
                                          Status
                                    </button>
                                    {isOpen && (
                                          <div
                                                className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white z-[100] ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="dropdown-button"
                                                tabIndex="-1"
                                          >
                                                <div className="flex flex-col gap-2 py-2 " role="none">
                                                      {allStatus?.map((item) =>
                                                            item === "ready_to_ship" ? (
                                                                  <button
                                                                        key={item}
                                                                        className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                        onClick={() => {
                                                                              setSelectedStatusModal(item);
                                                                              toggleDropdown();
                                                                        }}
                                                                        role="menuitem"
                                                                        tabIndex="-1"
                                                                        id="dropdown-item-1"
                                                                  >
                                                                        {item}
                                                                  </button>
                                                            ) : (
                                                                  <button
                                                                        key={item}
                                                                        className="block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                        onClick={() =>
                                                                              handleUpdateStatusForSelectedProducts(item)
                                                                        }
                                                                        role="menuitem"
                                                                        tabIndex="-1"
                                                                        id="dropdown-item-1"
                                                                  >
                                                                        {item}
                                                                  </button>
                                                            )
                                                      )}
                                                </div>
                                          </div>
                                    )}
                              </div>

                              <input
                                    className="w-[260px] md:mt-0 mt-3 rounded border-gray-400 focus:outline-none p-2 border"
                                    type="date"
                                    // value={selectedDate}
                                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                              />

                              <input
                                    className="border p-2 rounded"
                                    placeholder="search..."
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    type="text"
                              />

                              <div className="flex items-center gap-2">
                                    <select
                                          className="border w-[50px] px-1 py-2 text-sm rounded"
                                          onChange={(e) => setPageSize(e.target.value)}
                                    >
                                          <option value={15}>15</option>
                                          <option value={30}>30</option>
                                          <option value={70}>70</option>
                                          <option value={100}>100</option>
                                    </select>{" "}


                              </div>

                              <div className="w-[200px]">
                                    <Datepicker
                                          value={value}
                                          onChange={newValue => setValue(newValue)}
                                          showShortcuts={true}
                                    />
                              </div>

                        </div>

                        {
                              <nav className="flex md:gap-4 gap-2 bar overflow-x-auto mt-6">
                                    {ordersNav?.map((itm) => {
                                          let statusCount = 0;

                                          if (itm.name === "all") {
                                                statusCount = totalProductCount;
                                          } else {
                                                statusCount = statusCounts[itm.value] || 0;
                                          }

                                          return itm?.status === "dropdown" ? (
                                                <select
                                                      key={itm.name}
                                                      className={`px-4 border-r bg-transparent relative border-gray-300 flex items-center gap-2 justify-center ${selectedValue === "pending" ? "" : ""
                                                            }`}
                                                      value={selectedValue}
                                                      onChange={handleSelectChange}
                                                >
                                                      <option selected value="pending">
                                                            Pending
                                                      </option>
                                                      {itm?.dropdownLink?.map((option) => (
                                                            <option key={option}>{option}</option>
                                                      ))}
                                                </select>
                                          ) : (
                                                <button
                                                      className={`px-4 border-r md:bg-transparent bg-gray-50 border-gray-300 flex  items-center ${selectedValue === itm.value ? "text-red-500" : ""
                                                            }`}
                                                      key={itm.name}
                                                      onClick={() => setSelectedValue(itm.value)}
                                                >
                                                      {itm.name === "All" ? "All" : `${itm.name} ${!daraz_order ? `(${statusCount})` : ""}`}
                                                </button>
                                          );
                                    })}
                              </nav>}


                        {!daraz_order &&
                              <div className='my-8 lg:flex gap-4'>

                                    <Select
                                          className='w-80'
                                          placeholder="Select Seller"
                                          options={seller_option}
                                          onChange={seller_filter}
                                    />
                                    <Select
                                          placeholder="Select Warehouse"
                                          className="w-80"
                                          options={warehouses_option}
                                          onChange={warehouse_filter}
                                    />
                              </div>
                        }



                        {daraz_order ? <AdminSellerOrder set_selected_daraz_order={set_selected_daraz_order} selected_daraz_order={selected_daraz_order} searchValue={searchQuery} selectedValue={selectedValue} /> : <div className="flex flex-col my-6">
                              <div className="bar overflow-x-auto">
                                    <div className="my-2">
                                          {on && (
                                                <div className="absolute top-0 left-0 right-0 bottom-0 m-auto z-[3000]">
                                                      <SellerOrderInvoice setOn={setOn} products={printProduct} />
                                                </div>
                                          )}

                                          <div className="bar overflow-x-auto border border-gray-700 md:rounded-lg">
                                                <table className="divide-y w-full divide-gray-700">
                                                      <thead className="bg-gray-900 text-white">
                                                            <tr>
                                                                  <th className="px-2 text-start ">

                                                                        <input
                                                                              type="checkbox"
                                                                              name=""
                                                                              id=""
                                                                              onChange={(e) => {
                                                                                    handleSelectAll(e, currentData);

                                                                              }}

                                                                              checked={
                                                                                    currentData?.length === selectProducts?.length
                                                                                          ? true
                                                                                          : false
                                                                              }
                                                                        />{" "}
                                                                        Product Info
                                                                  </th>

                                                                  <th className="px-2 text-start ">Profit</th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-sm font-normal text-left whitespace-nowrap"
                                                                  >
                                                                        <button className="flex items-center gap-x-2">
                                                                              <span>Status</span>
                                                                        </button>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left whitespace-nowrap"
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Date and time</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="py-3.5 px-4 text-sm font-normal text-left whitespace-nowrap"
                                                                  >
                                                                        <div className="flex items-center gap-x-3">
                                                                              <span>Customer Name</span>
                                                                        </div>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left whitespace-nowrap"
                                                                  >
                                                                        Order Quantity
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left whitespace-nowrap"
                                                                  >
                                                                        Order Price
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left whitespace-nowrap "
                                                                  >
                                                                        <span>Action</span>
                                                                  </th>
                                                                  <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-sm font-normal text-left whitespace-nowrap "
                                                                  >
                                                                        <span>Paid \ Unpaid</span>
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      {selectedStatusModal && (
                                                            <SelectStatusUpdate
                                                                  selectedStatusModal={selectedStatusModal}
                                                                  setSelectedStatusModal={setSelectedStatusModal}
                                                                  handleUpdateStatusForSelectedProducts={
                                                                        handleUpdateStatusForSelectedProducts
                                                                  }
                                                                  orderInfo={selectProducts[0]}
                                                                  refetch={refetch}
                                                                  ships={ships}
                                                            />
                                                      )}
                                                      <tbody className="bg-white divide-y divide-gray-200">
                                                            {isLoading ? (
                                                                  <tr>
                                                                        <td colSpan="9" className="text-center py-8">
                                                                              <LoaderData />
                                                                        </td>
                                                                  </tr>
                                                            )
                                                                  :
                                                                  currentData.length ? (
                                                                        currentData?.map((product) => (
                                                                              <React.Fragment key={product._id}>
                                                                                    <tr className="items-center" key={product._id}>
                                                                                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                                <div className="inline-flex items-center gap-x-3">
                                                                                                      {/* single input */}
                                                                                                      <input
                                                                                                            type="checkbox"
                                                                                                            onChange={(e) =>
                                                                                                                  handleCheckboxChange(e, product)
                                                                                                            }
                                                                                                            checked={selectProducts?.some(
                                                                                                                  (selectedItem) =>
                                                                                                                        selectedItem._id === product._id
                                                                                                            )}
                                                                                                      />
                                                                                                      <div className="flex gap-x-2 relative">
                                                                                                            <div className=" w-10 h-10 bar overflow-hidden rounded-full">
                                                                                                                  <img
                                                                                                                        className="object-cover w-full h-full hover:cursor-pointer"
                                                                                                                        src={product.image}
                                                                                                                        alt=""
                                                                                                                  />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                  <h2 className="font-medium text-gray-800">
                                                                                                                        {product.product &&
                                                                                                                              product.product.name
                                                                                                                                    .split(" ")
                                                                                                                                    .slice(0, 5)
                                                                                                                                    .join(" ")}
                                                                                                                  </h2>
                                                                                                                  <p className="text-sm font-normal text-gray-600">
                                                                                                                        {product?._id}
                                                                                                                  </p>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </td>



                                                                                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                                                {calculateProfit(product)}
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm flex items-center font-medium text-gray-700 whitespace-nowrap">
                                                                                                <div className="border-r flex items-center px-6 py-4 whitespace-nowrap text-[16px] font-[400]  flex-col gap-2">
                                                                                                      {product?.status === "pending" && (
                                                                                                            <>
                                                                                                                  <button

                                                                                                                        onClick={() => setReadyToShip(product)}
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Ready to Ship
                                                                                                                  </button>
                                                                                                                  <button
                                                                                                                        onClick={() =>
                                                                                                                              productStatusUpdate(
                                                                                                                                    "Cancel",
                                                                                                                                    product._id
                                                                                                                              )
                                                                                                                        }
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Cancel
                                                                                                                  </button>
                                                                                                            </>
                                                                                                      )}
                                                                                                      {product?.status === "ready_to_ship" && (
                                                                                                            <button
                                                                                                                  onClick={() =>
                                                                                                                        productStatusUpdate(
                                                                                                                              "shipped",
                                                                                                                              product._id
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="text-blue-700"
                                                                                                            >
                                                                                                                  Shipped
                                                                                                            </button>
                                                                                                      )}
                                                                                                      {product?.status === "shipped" && (
                                                                                                            <div className="flex flex-col gap-2">
                                                                                                                  <button
                                                                                                                        onClick={() =>
                                                                                                                              productStatusUpdate(
                                                                                                                                    "delivered",
                                                                                                                                    product._id
                                                                                                                              )
                                                                                                                        }
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Delivered
                                                                                                                  </button>
                                                                                                                  <button
                                                                                                                        onClick={() =>
                                                                                                                              productStatusUpdate(
                                                                                                                                    "failed",
                                                                                                                                    product._id
                                                                                                                              )
                                                                                                                        }
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Failed Delivery
                                                                                                                  </button>
                                                                                                            </div>
                                                                                                      )}
                                                                                                      {product?.status === "delivered" && (
                                                                                                            <button
                                                                                                                  onClick={() =>
                                                                                                                        productStatusUpdate(
                                                                                                                              "returned",
                                                                                                                              product._id
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="text-blue-700"
                                                                                                            >
                                                                                                                  Returned
                                                                                                            </button>
                                                                                                      )}
                                                                                                      {product?.status === "return" && (
                                                                                                            <div className="flex flex-col justify-center">
                                                                                                                  <button
                                                                                                                        onClick={() => {
                                                                                                                              setShowAlert(product);
                                                                                                                              checkBox(product._id);
                                                                                                                        }}
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Approve
                                                                                                                  </button>
                                                                                                                  <button
                                                                                                                        onClick={() =>
                                                                                                                              productStatusUpdate(
                                                                                                                                    "failed",
                                                                                                                                    product._id
                                                                                                                              )
                                                                                                                        }
                                                                                                                        className="text-blue-700"
                                                                                                                  >
                                                                                                                        Reject
                                                                                                                  </button>
                                                                                                            </div>
                                                                                                      )}
                                                                                                      {product?.status === "returned" && (
                                                                                                            <button
                                                                                                                  onClick={() =>
                                                                                                                        productStatusUpdate(
                                                                                                                              "RefoundOnly",
                                                                                                                              product._id
                                                                                                                        )
                                                                                                                  }
                                                                                                                  className="text-blue-700"
                                                                                                            >
                                                                                                                  Refund Data
                                                                                                            </button>
                                                                                                      )}
                                                                                                      {product?.status === "Refund" && (
                                                                                                            <button
                                                                                                                  onClick={() => viewDetails(product)}
                                                                                                                  className="text-blue-700"
                                                                                                            >
                                                                                                                  View Details
                                                                                                            </button>
                                                                                                      )}
                                                                                                      {!allStatus.includes(product?.status) && (
                                                                                                            <button className="text-blue-700">
                                                                                                                  {product?.status}
                                                                                                            </button>
                                                                                                      )}
                                                                                                      {product._id === readyToShip._id && (
                                                                                                            <tr>
                                                                                                                  <td colSpan="10">
                                                                                                                        <ReadyToShipModal
                                                                                                                              readyToShip={readyToShip}
                                                                                                                              setReadyToShip={setReadyToShip}
                                                                                                                              productStatusUpdate={
                                                                                                                                    productStatusUpdate
                                                                                                                              }
                                                                                                                              orderInfo={product}
                                                                                                                              refetch={refetch}
                                                                                                                              ships={ships}
                                                                                                                        />
                                                                                                                  </td>
                                                                                                            </tr>
                                                                                                      )}
                                                                                                </div>
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                      <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                                                            {new Date(product.date).toLocaleString()}
                                                                                                      </p>
                                                                                                </div>
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                                                {product.customerName}
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                      <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                                                            {product.quantity}
                                                                                                      </p>
                                                                                                </div>
                                                                                          </td>

                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                      <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800 bg-indigo-100/60">
                                                                                                            {product.price}
                                                                                                      </p>
                                                                                                </div>
                                                                                          </td>

                                                                                          <td className="px-4 mt-12  h-full my-auto flex items-center gap-4 text-sm whitespace-nowrap">
                                                                                                <button
                                                                                                      onClick={() => deleteMethod(product._id)}
                                                                                                      className="transition-colors duration-200 text-red-500 hover:text-red-700 focus:outline-none"
                                                                                                >
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
                                                                                                <button
                                                                                                      onClick={() => setModalOpen(product)}
                                                                                                      className="group relative inline-block bar overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                                                                                                >
                                                                                                      <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                                                                                                      <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                                                                                            Invoice
                                                                                                      </span>
                                                                                                </button>
                                                                                                <Link to={`/admin/doob-order-management/details?order_id=${product._id}`}>
                                                                                                      <button className="group relative inline-block bar overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring">
                                                                                                            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                                                                                                            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                                                                                                  Details
                                                                                                            </span>
                                                                                                      </button>
                                                                                                </Link>
                                                                                          </td>
                                                                                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex gap-2">


                                                                                                      {(product?.paid_status === 'unpaid' || product?.paid_status === undefined) && < button className="bg-gray-200 text-gray-500 px-2 py-1"
                                                                                                            onClick={() =>
                                                                                                                  update_paid_status(product._id, 'paid')
                                                                                                            }
                                                                                                      >
                                                                                                            Paid
                                                                                                      </button>}
                                                                                                      {product?.paid_status === 'paid' && < button className="bg-gray-200 text-gray-500 px-2 py-1"
                                                                                                            onClick={() =>
                                                                                                                  update_paid_status(product._id, 'unpaid')
                                                                                                            }
                                                                                                      >
                                                                                                            UnPaid
                                                                                                      </button>}
                                                                                                </div>
                                                                                          </td>
                                                                                    </tr>

                                                                                    {modalOpen?._id === product._id && (
                                                                                          <OrderInvoice
                                                                                                openModal={modalOpen}
                                                                                                setOpenModal={setModalOpen}
                                                                                                product={product}
                                                                                          />
                                                                                    )}
                                                                              </React.Fragment>
                                                                        ))
                                                                  ) : (
                                                                        <tr className="text-[gray] py-4 font-seminold  text-center w-full">
                                                                              <td colSpan={9}>No items metch</td>
                                                                        </tr>
                                                                  )}
                                                      </tbody>
                                                </table>
                                          </div>
                                          <div className="flex justify-center mt-8">
                                                <ol className="flex justify-center gap-1 text-xs font-medium">
                                                      <li>
                                                            <button
                                                                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 bg-white text-gray-900 rtl:rotate-180"
                                                                  onClick={() =>
                                                                        handleChangePage(Math.max(1, currentPage - 1))
                                                                  }
                                                                  disabled={currentPage === 1}
                                                            >
                                                                  <span className="sr-only">Prev Page</span>
                                                                  <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-3 w-3"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                  >
                                                                        <BiLeftArrow className="text-xl" />
                                                                  </svg>
                                                            </button>
                                                      </li>

                                                      {renderPageNumbers()}

                                                      <li>
                                                            <button
                                                                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-900 disabled:cursor-not-allowed bg-white text-gray-900 rtl:rotate-180"
                                                                  onClick={() =>
                                                                        handleChangePage(Math.min(totalPages, currentPage + 1))
                                                                  }
                                                                  disabled={currentPage === totalPages}
                                                            >
                                                                  <span className="sr-only">Next Page</span>
                                                                  <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-3 w-3"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                  >
                                                                        <BiRightArrow className="text-xl" />
                                                                  </svg>
                                                            </button>
                                                      </li>
                                                </ol>
                                          </div>
                                    </div>
                              </div>
                        </div>}
                  </section>
            </div>
      );
};

export default SellerOrderManagement;
