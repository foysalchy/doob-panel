import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import Barcode from "react-barcode";

const  BulkSellerStockInvoice = ({ setIsBulkPrint, products,productForBulkPrint }) => {
      const { user, shopInfo } = useContext(AuthContext);

      const subtotal = 0;
      // Calculate tax
      const taxRate = 0.1;
      const tax = subtotal;
      const total = subtotal;


      const componentRef = useRef();
      const handlePrint = useReactToPrint({
            content: () => componentRef.current,
      });
      console.log(productForBulkPrint,products,'productsproducts')

     




     

      
      return (


            <div className=" bg-gray-100 p-12 fixed h-screen bar overflow-y-auto top-0 left-0 right-0 z-[3000]">
                    <style>{`
    @media print {
        .invoice-page {
           
            border: 1px solid #ddd;
            padding: 16px;
            margin-bottom: 16px;
        }
    }
`}</style>
                  <button onClick={handlePrint} className='bg-blue-500 px-6 py-2 rounded-2 text-white rounded-md'>Print</button>
                  <button onClick={() => setIsBulkPrint(false)} className='bg-red-500 ml-2 px-6 py-2 rounded-2 text-white rounded-md'>Close</button>
                  <div ref={componentRef} className="w-full h-full p-8 m-auto bg-white" style={{ width: '235mm', height: '297mm' }}>
                  {productForBulkPrint.map((selectProduct,index) => (
                        <div key={selectProduct._id}>
                        {products
                              .filter((productId) => productId === selectProduct._id)
                              .map((productId) => (
                                    <>
                                    <div
                                          style={{ pageBreakBefore: index > 0 ? "always" : "auto" }}
                                          ref={componentRef}
                                          className="p-12 mx-8 print-data    mt-6">
 
                                          <header className="flex items-start justify-between">
                                                <img src={shopInfo?.logo} alt="logo" className='w-[200px]' />
                                                <div className='whitespace-wrap w-[300px]'>
                                                      <p className='text-gray-600 text-end'>{shopInfo?.seller}</p>
                                                      <p className='text-gray-600 text-end'>{shopInfo?.shopEmail}</p>
                                                      <p className='text-gray-600 text-end'>{shopInfo?.shopNumber}</p>
                                                      <p className='text-gray-600 text-end'>{shopInfo?.address}</p>
                                                </div>
                                          </header>
            
                                          <main>
                                                <div className="flex items-center justify-center py-1 font-bold   mt-8 text-center ">
                                                <Barcode
                                          
                                          value={selectProduct?._id} // Fallback in case orderNumber is undefined
                                    />
                                                </div>
            
                                                {/*.*/}
                                                {/*.... Address ...*/}
                                                {/*.*/}
                                                <div className="flex items-center justify-between mt-4">
                                                      <div>
                                                            <div className='  items-center gap-2'>
                                                                  <h2> <b className="text-gray-600 text-2xl">Doob</b></h2>
                                                                  <h4 className='font-semibold text-gray-700 text-sm'>
                                                                        Warehouse :{selectProduct.warehouse[0].name}
                                                                  </h4>
                                                                 
                                                            </div>
            
                                                      </div>
            
                                                      <div>
                                                            <li className='flex justify-start items-center gap-2'>
                                                                  <h4 className='font-semibold text-gray-700 text-sm'>
                                                                        Invoice No :
                                                                  </h4>
                                                                  <p className="text-gray-600 text-sm">{selectProduct?._id}</p>
                                                            </li>
                                                            <li className='flex justify-start items-center gap-2'>
                                                                  <h4 className='font-semibold text-gray-700 text-sm'>
                                                                        Invoice Date :
                                                                  </h4>
                                                                  <p className="text-gray-600 text-sm">{
                                                                        new Date().toDateString(selectProduct?.date)
                                                                  }</p>
                                                            </li>
                                                      </div>
            
                                                </div>
            
                                                {/*.*/}
                                                {/*.... Product ...*/}
                                                {/*.*/}
            
            {console.log(selectProduct,'selectProductselectProduct')}
                                                <section className="container mx-auto mt-8">
                                                      <div className="w-full mb-8 bar overflow-hidden">
                                                            <div className="w-full bar overflow-x-auto pb-3">
                                                                  <table className="w-full">
                                                                        <thead>
                                                                              <tr className="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-900 uppercase border-b border-gray-900">
                                                                                    <th className="px-4 py-2">Photo</th>
                                                                                    <th className="px-4 py-2">Name</th>
                                                                                    <th className="px-4 py-2 whitespace-nowrap">Stock Quantity</th>
                                                                                    <th className="px-4 py-2">Request</th>
                                                                              </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white">
                                                                              <tr className="text-gray-700">
                                                                                    <td className="px-2 w-[90px] py-2 border border-gray-800">
                                                                                          <img src={selectProduct?.productInfo?.image ? selectProduct?.productInfo?.image : ''} alt="photo" className="w-12 h-12 border object-cover m-auto rounded bg-indigo-400" />
                                                                                    </td>
                                                                                    <td className="px-2 py-2 w-[500px] text-sm border border-gray-800">
                                                                                          {selectProduct?.productInfo?.name ? selectProduct?.productInfo?.name : ''}
                                                                                    </td>
            
                                                                                    <td className="px-2 py-2 text-sm border text-center border-gray-800">
                                                                                          {selectProduct?.productInfo?.quantity ? selectProduct?.productInfo?.quantity : 0}
                                                                                    </td>
                                                                                    <td className="px-2 py-2 text-sm text-center border border-gray-800">
                                                                                          {selectProduct?.quantity}
                                                                                    </td>
                                                                              </tr>
                                                                              {/* Add more rows here */}
                                                                        </tbody>
                                                                  </table>
            
                                                            </div>
                                                      </div>
                                                </section>
            
                                                
            
            
            
                                          </main>
                                          <footer>
            
                                          </footer>
                                    </div>
                              </>
                              ))}
                        </div>
                        ))}


                  
                      

                  </div>
            </div>
      );
};

export default  BulkSellerStockInvoice;
