import React, { useState } from 'react';
import PriceModal from '../../Home/Price/PriceModal';

const SubscriptionInvoice = ({ CommissionHistory, invoice, setInvoice, due, pricesData, id }) => {
    const [open, setOpen] = useState(false);

    console.log(id);
    const allCommissions = CommissionHistory.reduce((total, Commission) => total + Commission.commission, 0);
    let selectedObject = pricesData.filter(item => item._id === id);
    console.log(selectedObject);
    const handleSubmit = () => {

        // selectedObject.price = parseInt(allCommissions) + parseInt( selectedObject?.price ? selectedObject?.price: 0)
        // setInvoice(false)
        setOpen(selectedObject)
        

    }

    return (
        <div className={`fixed left-0 top-0 bg-black  flex  z-50 h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${invoice ? "block" : "hidden"
            }`}>
            <div className="w-full max-w-[570px] rounded-[20px] bg-white opacity-100 px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]">
                <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-back sm:text-2xl">
                    Your TotalCommission : {parseInt(allCommissions).toFixed()}
                    <br></br>
                    Your Due   {parseInt(allCommissions) + parseInt( selectedObject?.price ? selectedObject?.price: 0)}
                </h3>
                <span
                    className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                ></span>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-1/2 px-3">
                        <button
                            onClick={() => setInvoice(false)}
                            className="block w-full text-red-500 rounded-md border border-stroke p-3 text-center  font-medium  transition border-red-600 hover:bg-red-600 hover:text-white "
                        >
                            Cancel
                        </button>
                    </div>

                    {open && <PriceModal open={open} setOpen={setOpen} />}

                    <div className="w-1/2 px-3">
                        <button onClick={() => handleSubmit()} className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark">
                           Renew
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionInvoice;