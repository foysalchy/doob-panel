import { useContext, useState } from "react";
import { AuthContext } from "../../../../../AuthProvider/UserProvider";
import Category_For_modal from "./Category_For_modal";
import Warehouse_for_modal from "./Warehouse_for_modal";
import BrightAlert from "bright-alert";



const Update_warehouse_category = ({ category_modal, setCategory_modal, selectProducts, refetch, refetchProduct }) => {
      const [daraz, setDaraz] = useState(false);
      const [woo, setWoo] = useState(false);
      const { shopInfo } = useContext(AuthContext);
      const [inputFields, setInputFields] = useState([
            {
                  name: "",
                  image: [],
                  quantity: "",
                  SKU: `${shopInfo.shopId}_${Math.random().toString().slice(2, 10)}`, // Generate random 8-digit number
                  price: "",
                  offerPrice: 0,
                  ability: false,
            },
      ]);
      const [darazOption, setDarazOption] = useState('');
      const [primeCat, setPrimeCat] = useState("");
      const [multiVendor, setMultiVendor] = useState(false);
      const [dCat, setDCat] = useState(["", "", "", ""]);
      const [adminWare, setAdminWare] = useState(true);


      const update_multiple_products = (e) => {
            e.preventDefault();
            const form = e.target;
            const megaCategory = form?.megaCategory?.value;
            const Subcategory = form?.subCategory?.value || null;
            const miniCategory = form?.miniCategory?.value || null;
            const extraCategory = form?.extraCategory?.value || null;

            const categories = [
                  { name: megaCategory },
                  Subcategory && { name: Subcategory },
                  miniCategory && { name: miniCategory },
                  extraCategory && { name: extraCategory },
            ];

            const warehouse = form.warehouse.value;
            const area = (form.area && form.area.value) || null;
            const rack = (form.rack && form.rack.value) || null;
            const self = (form.self && form.self.value) || null;
            const cell = (form.cell && form.cell.value) || null;

            const warehouseValue = [
                  { name: warehouse },
                  { name: area },
                  { name: rack },
                  { name: self },
                  { name: cell },
            ];

            console.log(selectProducts, 'selected products', categories, warehouseValue);

            fetch("http://localhost:5001/api/v1/seller/update-selected-product-cat-and-warehouse", {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        selected_product_id: selectProducts,
                        category_data: categories,
                        warehouse_data: warehouseValue,
                        adminWare: adminWare,
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        if (data.status) {
                              BrightAlert("success", data.message);
                              refetch();
                              refetchProduct()
                              setCategory_modal(false);
                        } else {
                              BrightAlert("error", data.message);
                        }
                  })




      }


      return (
            <div>
                  <div class="bg-gray-800  absolute top-0 left-0 w-full h-full bg-opacity-90 z-50">
                        <div class="flex items-center justify-center w-full h-full px-4 py-5 sm:p-6">
                              <form onSubmit={update_multiple_products} class="w-full max-w-7xl bg-white shadow-lg rounded-xl">
                                    <div class="px-4 py-5 sm:p-6">
                                          <div class="text-center">

                                                <Category_For_modal daraz={false}
                                                      setDaraz={setDaraz}
                                                      woo={false}
                                                      setWoo={setWoo}
                                                      setInputFields={setInputFields}
                                                      setDarazOption={setDarazOption}
                                                      setPrimeCat={setPrimeCat}
                                                      multiVendor={multiVendor}
                                                      setMultiVendor={setMultiVendor}
                                                      dCat={dCat}
                                                      setDCat={setDCat} />

                                                <Warehouse_for_modal adminWare={adminWare} setAdminWare={setAdminWare} shopInfo={shopInfo} multiVendor={multiVendor} />

                                                <div class="mt-8 flex justify-start gap-4">
                                                      <button
                                                            onClick={() => setCategory_modal(!category_modal)}
                                                            type="button"
                                                            class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-indigo-600 transition-all duration-200 bg-indigo-100 border border-transparent rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-600"
                                                      >
                                                            Cancel
                                                      </button>
                                                      <button
                                                            type="submit"
                                                            class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                                      >
                                                            Update Products
                                                      </button>

                                                </div>
                                          </div>
                                    </div>
                              </form>
                        </div>
                  </div>

            </div>
      );
};

export default Update_warehouse_category;
