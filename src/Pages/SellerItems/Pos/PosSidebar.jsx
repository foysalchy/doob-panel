import React, { useEffect, useState } from 'react';
import { CgShoppingCart } from 'react-icons/cg';
import { MdDeleteOutline } from 'react-icons/md';
import ProductList from './ProductList';
import deleteSound from '../../../../src/assets/sound_button-21.mp3'
import PosProductsDetails from './PosProductsDetails';

const PosSidebar = ({ cartProducts, setCartProducts }) => {
    console.log(cartProducts, 'list');
    const [cashValue, setCashValue] = useState(0);
    const [passCount, setPassCount] = useState(1);
    const [open, setOpen] = useState(false);
    const [mData, setMData] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    // Handler function to toggle the checkbox value
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        
    };
    

    const [deleteAudio] = useState(new Audio(deleteSound));

    useEffect(() => {
        // Cleanup the audio when component unmounts
        return () => {
            deleteAudio.pause();
            deleteAudio.currentTime = 0;
        };
    }, [deleteAudio]);

    const deleteAll = () => {
        deleteAudio.play();
        setCartProducts([]);
        setCashValue(0);
    }
    const updateCashValue = (value) => {
        setCashValue(value);
    };

    const countCash = (num) => {
        setCashValue((prevCashValue) => prevCashValue + num);
    };

    let totalPrice = cartProducts.reduce((acc, curr) => (acc + curr.price) * passCount, 0);

    const mainPrice = isChecked ? (totalPrice - (totalPrice * (cashValue / 100))) : (totalPrice - cashValue);

    const handleSubmit = (totalPrice, cashValue, mainPrice, cartProducts) => {
        deleteAudio.play();
        const data = {
            totalPrice: totalPrice,
            cashValue: cashValue,
            mainPrice: mainPrice,
            cartProducts: cartProducts
        }
        setMData(data)
        setOpen(!open);
    }

    console.log(cartProducts, 'cashValue');
    return (
        <div className=' h-full flex flex-col justify-between'>
            <div className="relative">
                {
                    cartProducts.length === 0 ? <h1 className='text-3xl font-bold text-[#80808050] text-center absolute top-[150px] left-0 right-0 bottom-0 m-auto'>Products Empty</h1> : <div>
                        <div className="flex items-center border-b pb-2 justify-between">
                            <div><CgShoppingCart className='text-2xl ' /></div>
                            <button className='bg-[#f1397929] w-[35px] h-[35px] rounded-full flex justify-center items-center' onClick={deleteAll}><MdDeleteOutline className='text-[#f1397afe] text-xl' /></button>
                        </div>
                        <ul className=' h-[280px] overflow-x-hidden overflow-y-auto'>
                            {
                                cartProducts?.map((itm, index) => (
                                    <ProductList itm={itm} passCount={passCount} setPassCount={setPassCount} key={index} />
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className="">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg">Total</h2>
                    <h2 className="text-lg">{totalPrice}</h2>
                </div>
                <div className="bg-white p-2 rounded-md mt-2">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <h3 className="text-lg">Cash</h3>
                            <label className='flex gap-2' htmlFor="percents">
                                <input
                                    id='percents'
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                Persentise
                            </label>
                        </div>
                        <input
                            value={cashValue}
                            onChange={(e) => updateCashValue(parseFloat(e.target.value) || 0)}
                            type="text"
                            className="bg-transparent ring-1 w-[80px] ring-gray-300 rounded-md text-lg"
                        />
                    </div>
                    <div className="flex justify-center flex-wrap mt-3 gap-2">
                        <button onClick={() => countCash(1)} className='w-[65px] px-3 py-0 rounded bg-gray-200'>+1</button>
                        <button onClick={() => countCash(2)} className='w-[65px] px-3 py-0 rounded bg-gray-200'>+2</button>
                        <button onClick={() => countCash(3)} className='w-[65px] px-3 py-0 rounded bg-gray-200'>+3</button>
                    </div>
                </div>
                <div className="bg-white ring-1 ring-gray-300 text-black rounded p-2 w-full mt-3 text-end">
                    {mainPrice}
                </div>
                <button onClick={() => handleSubmit(totalPrice, cashValue, mainPrice, cartProducts)} className="bg-gray-900 text-white rounded-md p-2 w-full mt-3">Submit</button>
            </div>
            <PosProductsDetails mData={mData} open={open} setOpen={setOpen} />
        </div>
    );
};

export default PosSidebar;