import { useRef } from "react";
import ReactToPrint from "react-to-print";

const StockReportPrint = ({ currentProducts, Print, setPrint }) => {
      const componentRef = useRef();

      return (
            <div className={Print ? "fixed z-50 top-0 left-0 h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 block" : "hidden"}>
                  <div className="bg-white w-full h-full">
                        <div className="flex gap-4 p-4">
                              <ReactToPrint
                                    trigger={() => (
                                          <button className=" bg-blue-500 px-6 py-2 rounded-2 text-white">
                                                Print
                                          </button>
                                    )}
                                    content={() => componentRef.current}

                              />
                              <button onClick={() => setPrint(!Print)} className="bg-red-500 px-6 py-2 rounded-2 text-white">Cancel</button>
                        </div>
                        <div ref={componentRef} className="print-container flex justify-center pt-4 items-start w-full">
                              <div className="flex justify-center border flex-col mt-4 lg:mt-8">
                                    <div className="-mx-4 -my-2 bar overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full divide-gray-600 bg-gray-600 lg:divide-y">
                                                      <thead className="table-header-group">
                                                            <tr>
                                                                  <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-100 uppercase tracking-widest">
                                                                        Product
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Status
                                                                  </th>
                                                                  <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Quantity
                                                                  </th>

                                                                  <th className="py-3.5 px-4 text-center text-xs uppercase tracking-widest font-medium text-gray-100">
                                                                        Warehouse
                                                                  </th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {currentProducts.map((product) => (
                                                                  <tr key={product._id} className="bg-white">
                                                                        <td className="px-4 py-4 text-sm font-bold  text-gray-900 align-top lg:align-middle whitespace-nowrap">
                                                                              <div className="flex items-center">
                                                                                    <img
                                                                                          className="flex-shrink-0 object-cover w-14 h-14 mr-3 rounded"
                                                                                          src={product?.productInfo.image}
                                                                                          alt=""
                                                                                    />
                                                                                    <div className="text-[10px]">
                                                                                          <p>{product?.productInfo?.name.slice(0, 20)}</p>
                                                                                          <span className="block  font-normal">{product?.SKU}</span>
                                                                                          <span className="block  font-normal">{product?.productId}</span>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-4  py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                              <div className="whitespace-nowrap px-6 py-4 text-[10px] font-medium text-left">
                                                                                    <div>
                                                                                          <b>delivery status:</b>{" "}
                                                                                          <span className="text-yellow-500">{product?.delivery_status}</span>
                                                                                    </div>
                                                                                    <div>
                                                                                          <b>status:</b> <span className="text-yellow-500">{product?.status}</span>
                                                                                    </div>
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-4 text-[10px] py-4  text-sm font-medium text-center text-gray-900 lg:table-cell whitespace-nowrap">
                                                                              <div className="text-center">{product?.quantity}</div>
                                                                        </td>

                                                                        <td className="whitespace-nowrap text-[10px]  px-6 text-center py-4 font-medium">
                                                                              {product?.warehouse?.map((war) => war?.name && <span key={war}>{war?.name}</span>)}
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default StockReportPrint;
