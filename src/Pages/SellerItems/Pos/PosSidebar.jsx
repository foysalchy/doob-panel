import React, { useContext, useEffect, useState } from 'react';
import { CgClose, CgShoppingCart } from 'react-icons/cg';
import { MdDeleteOutline } from 'react-icons/md';
import ProductList from './ProductList';
import deleteSound from '../../../../src/assets/sound_button-21.mp3'
import clickAudio from '../../../../src/assets/sound_beep-29.mp3'
import PosProductsDetails from './PosProductsDetails';
import { AuthContext } from '../../../AuthProvider/UserProvider';

const PosSidebar = ({ cartProducts, setCartProducts, close, setClose }) => {
    const {shopInfo} = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [invoice, setInvoice] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [existing, setExisting] = useState(false);
    const [user, setUser] = useState(false)
    const [error, setError] = useState(false)

    const [name, setName] = useState(user.name ? user.name : '');
    const [email, setEmail] = useState(user.email ? user.email : '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ? user.phoneNumber : '');
    const [address, setAddress] = useState(user.address ? user.address : '');

    const [searchValue, setSearchValue] = useState('')
    const [searchType, setSearchType] = useState("userNumber")

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const [deleteAudio] = useState(new Audio(deleteSound));
    const [audio] = useState(new Audio(clickAudio));

    useEffect(() => {
        return () => {
            deleteAudio.pause();
            deleteAudio.currentTime = 0;
        };
    }, [deleteAudio]);


    useEffect(() => {
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);

    const [cash, setCash] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [presents, setPresents] = useState(false);

    const singleDiscount = (index, value) => {
        const updatedCart = [...cartProducts];
        updatedCart[index].discount = value;
        setCartProducts(updatedCart);
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity += 1;
        setCartProducts(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity = Math.max(0, updatedCart[index].quantity - 1);
        setCartProducts(updatedCart);
    };

    const fetchData = () => {
        fetch(`https://salenow-v2-backend.vercel.app/api/v1/seller/seller-user?shopId=${shopInfo.shopId}&${searchType}=${searchValue}`).then((res) => res.json()).then((data) => {
            if (data.userInfo) {
                setUser(data.userInfo)
                setExisting(false)
                setError(false)
            }
            else {
                setError('User not found')
                setUser(false)
            }
        })
    }

    const totalPrice = () => {
        return cartProducts.reduce((total, item) => {
            const discountedPrice = item.price - (item.discount || 0); // Subtract discount from item price
            return total + item.quantity * discountedPrice; // Multiply by quantity and add to total
        }, 0);
    };


    let discountAmount = 0

    const calculateChange = () => {
        const cashAmount = cash ? parseInt(cash) : 0;

        if (discount && !presents) {
            const discountPrice = totalPrice() - parseInt(discount)
            discountAmount = parseInt(discount)
            return discountPrice - cashAmount;
        } else if (discount && presents) {
            const discountPrice = totalPrice() / 100 * parseInt(discount)
            discountAmount = discountPrice
            const price = totalPrice() - discountPrice

            return price - cashAmount;
        } else {
            return cashAmount - totalPrice();
        }
    };

    let changeAmount = calculateChange();

    console.log(changeAmount, 'check amount.....')

    const handleSubmit = () => {
        const items = cartProducts
        const total = totalPrice()
        const change = changeAmount
        const present = presents
        const discount = discountAmount
        const data = {
            items,
            total,
            cash,
            change,
            discount,
            present
        }
        setInvoice(data)
        setOpen(true)
    }

    const handleDelete = (id) => {
        deleteAudio.play();
        const updatedCartProducts = cartProducts.filter(product => product.id !== id);
        setCartProducts(updatedCartProducts);
    };

    const handleDeleteAll = () => {
        deleteAudio.play();
        setCartProducts([]);
        changeAmount = 0
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form?.name.value;
        const email = form?.email.value;
        const number = form?.phoneNumber.value;
        const address = form?.phoneNumber.value;

        const data = {
            name,
            email,
            number,
            address
        }
        setUser(data)
        setIsChecked(false)
    }
    
    console.log(user, '........')
    return (
        <div className=' h-full '>

            <div class="h-full flex flex-col">
                <div class="flex-grow">
                    <div class="">
                        <div className="relative">
                            {
                                <div>
                                    <div className="flex items-center border-b pb-2 justify-between">
                                        <div className='relative '>
                                            <CgShoppingCart className='text-2xl ' />
                                            <span className='absolute top-[-10px] flex justify-center items-center left-8 bg-red-500
                                text-white rounded-full px-2 py-1 text-[10px] font-semibold transform h-6 w-6 p-1 -translate-x-1/2 -translate-y-1
                                6'>{cartProducts.length}</span>
                                        </div>

                                        <button onClick={() => setClose(!close)} className='text-[#fb2464] lg:hidden text-xl'>
                                            <CgClose />
                                        </button>

                                        <button className='bg-[#f1397929] w-[35px] h-[35px] rounded-full flex justify-center items-center'
                                            onClick={handleDeleteAll}
                                        ><MdDeleteOutline className='text-[#f1397afe] text-xl' /></button>
                                    </div>

                                    <ul className='h-[280px] overflow-x-hidden overflow-y-auto'>
                                        {cartProducts?.map((itm, index) => (
                                            <li key={index}>
                                                <div className="flex justify-between items-center my-4 bg-white relative p-2 rounded-md">
                                                    <button
                                                        onClick={() => handleDelete(itm.id)}
                                                        className='bg-red-500 text-white text-xs w-[20px] h-[20px] rounded-full absolute right-0 -top-2'>
                                                        x
                                                    </button>
                                                    <div className="flex items-center gap-2">
                                                        <img src={itm?.img} alt="" className="w-[60px] h-[60px] ring-1 ring-gray-300 rounded-md object-cover" />
                                                        <div className="">
                                                            <h3 className="text-sm">{itm?.name.slice(0, 16)}...</h3>
                                                            <h3 className="text-lg">{itm?.price - (itm?.discount || 0)}</h3> {/* Subtract discount from price, defaulting to 0 if discount is not provided */}
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <span className='text-xs absolute top-[-17px] text-center left-0 right-0'>Discount</span>
                                                        <input
                                                            onChange={(e) => singleDiscount(index, e.target.value)}
                                                            type="number" className="border border-red-500 rounded w-[60px] px-1" />
                                                    </div>

                                                    <div className="flex mr-2 items-center relative">
                                                        <div className="absolute left-[-10px]">
                                                            <button
                                                                onClick={() => decreaseQuantity(index)}
                                                                className='relative bg-red-500 w-[18px] h-[18px] rounded-full  flex items-center justify-center'>
                                                                <span className="text-white absolute top-[-4px] left-0 right-0 bottom-0">-</span>
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={itm?.quantity}
                                                            readOnly
                                                            className='border text-center border-red-500 rounded w-[60px] px-3' />
                                                        <div className="absolute right-[-9px]">
                                                            <button
                                                                onClick={() => increaseQuantity(index)}
                                                                className='relative bg-red-500 w-[18px] h-[18px] rounded-full flex items-center justify-center'>
                                                                <span className="text-white absolute top-[-3px] left-0 right-0 bottom-0">+</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>


                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div class="">
                    <div className="">
                        <div className="flex items-center bg-gray-500 px-4 py-2  rounded justify-between">
                            <h2 className="text-lg">Total</h2>
                            <h2 className="text-lg">{totalPrice()}</h2>
                        </div>
                        <div className='flex bg-gray-400 justify-between px-4 py-2  mt-4 items-center'>
                            <h1> Discount</h1>
                            <label className='flex gap-2' htmlFor="percents">
                                <input
                                    id='percents'
                                    type="checkbox"
                                    checked={presents}
                                    onChange={() => setPresents(!presents)}
                                />
                                Persentise
                            </label>
                            <input onChange={(e) => setDiscount(e.target.value)} className="bg-transparent text-right ring-1 px-2 w-[80px] ring-gray-300 rounded-md text-lg" type="text px-2" />
                        </div>
                        <div className="flex justify-between bg-green-400 px-4 py-2  mt-4  items-start">
                            <div className="">
                                <h3 className="text-lg">Cash</h3>
                            </div>
                            <input
                                value={cash}
                                onChange={(e) => setCash(e.target.value)}
                                type="number"
                                className="bg-transparent px-2 text-right ring-1 w-[80px] ring-gray-300 rounded-md text-lg"
                            />
                        </div>
                        <div className="bg-white p-2  rounded-md mt-2">

                            <div className="flex justify-between flex-wrap mt-3 gap-2">
                                <button
                                    onClick={() => { setCash(100), audio.play() }}
                                    className='w-[65px] px-3 py-0 rounded bg-gray-200'>100</button>
                                <button
                                    onClick={() => { setCash(500), audio.play() }}
                                    className='w-[65px] px-3 py-0 rounded bg-gray-200'>500</button>
                                <button
                                    onClick={() => { setCash(1000), audio.play() }}
                                    className='w-[65px] px-3 py-0 rounded bg-gray-200'>1000</button>
                                <button
                                    onClick={() => { setCash(2000), audio.play() }}
                                    className='w-[65px] px-3 py-0 rounded bg-gray-200'>2000</button>
                            </div>
                        </div>

                        <div className={` ring-1 font-bold flex items-center justify-between ring-gray-300 text-black rounded p-2 w-full mt-3  ${changeAmount > 0 ? "bg-green-500" : changeAmount < 0 ? "bg-red-500" : ""}`}>
                            <div>Change</div>
                            <div className={`text-end`}>
                                {parseInt(changeAmount)}
                            </div>
                        </div> <br />
                        <div>
                            <label htmlFor='user' className=''>User information</label>
                            <input
                                type="checkbox"
                                name="user"
                                id="user"
                                checked={user}
                                onChange={toggleCheckbox}
                            />



                            <div onClick={() => setIsChecked(false)} className={`fixed z-[100] flex items-center justify-center ${isChecked ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>

                                
                                <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute w-[500px] rounded-sm bg-white p-6 drop-shadow-lg  ${isChecked ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>

                                    <h1 className='flex gap-2'> <input onClick={() => { setExisting(!existing), setUser(false) }} type="checkbox" />New User ?</h1>

                                    <h1 className="text-2xl font-bold mb-2 mt-4">User Info</h1>


                                    {existing && <div>
                                        <label> Search User</label>
                                        <div className='flex gap-2 items-center'>
                                            <select onChange={(e) => setSearchType(e.target.value)} className='mt-1 p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0' name="" id="">
                                                <option value="userNumber">Phone Number</option>
                                                <option value="userEmail">Email</option>
                                            </select>
                                            <input onChange={(e) => setSearchValue(e.target.value)} className='mt-1 ml-2 w-full p-2 border  focus:outline-none focus:border-gray-500  focus:ring-0' type="text" name="" id="" />
                                            <button onClick={() => fetchData()} className='p-2  px-4 bg-gray-900 text-white'>
                                                Search
                                            </button>
                                        </div>
                                    </div>}
                                    {
                                        error && <p className='text-sm text-red-500'>Error: {error}</p>
                                    }

                                    

                                    {!existing &&
                                        <form onSubmit={handleFormSubmit}>


                                            <div className="mb-2">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                                    Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    defaultValue={(user && !existing) ? user?.name : ''}
                                                    name="name"
                                                    className="mt-1 p-2 w-full border rounded-md"
                                                    required
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                                    Email:
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    defaultValue={(user && !existing) ? user?.email : ''}
                                                    className="mt-1 p-2 w-full border rounded-md"
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                                                    Phone Number:
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    defaultValue={(user && !existing) ? user?.phoneNumber : ''}
                                                    className="mt-1 p-2 w-full border rounded-md"
                                                    required
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                                                    Address:
                                                </label>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    className="mt-1 p-2 w-full border rounded-md"
                                                    required
                                                    onChange={(e) => setAddress(e.target.value)}
                                                ></textarea>
                                            </div>

                                            <div className="flex justify-between">
                                                <button type='submit' className="me-2 rounded-sm bg-green-700 px-6 py-[6px] text-white">Submit</button>
                                             
                                             
                                             
                                                <button onClick={() => setIsChecked(false)} className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white">Cancel</button>
                                            </div>
                                        </form>
                                    }

                                    <br />

                                </div>
                            </div>



                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={(changeAmount < -1 || !cartProducts.length) ? true : false}
                            className={`${(changeAmount < -1 || !cartProducts.length) ? 'bg-gray-500 cursor-not-allowed' : "bg-gray-900"} b text-white rounded-md p-2 w-full mt-3`}>Submit</button>
                    </div>
                </div>
            </div>





            <PosProductsDetails passUser={{ name: name, email: email, phoneNumber: phoneNumber, address: address }} invoice={invoice} open={open} setOpen={setOpen} />
        </div>
    );
};

export default PosSidebar;