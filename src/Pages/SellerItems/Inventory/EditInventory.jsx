import React from 'react';

const EditInventory = ({ open, setOpen }) => {
    return (
        <div className="fixed bg-[#000000a2] top-0 left-0 flex items-center justify-center w-screen h-screen z-[1000]">
            <div className='p-3 shadow-lg relative bg-white w-[500px] rounded-lg'>
                <header>
                    <h2 className='text-lg font-medium pb-2 border-b'>Edit Inventory</h2>
                    <button onClick={() => setOpen(!open)} className='bg-gray-200 h-[30px] w-[30px] text-lg font-regular rounded-full flex items-center justify-center absolute right-2 top-2'>x</button>

                    <form>

                        <button className='bg-blue-500 text-white  px-8 py-2 rounded-md mt-3 font-semibold hover:shadow-lg duration-200 hover:bg-blue-600' type="submit">Update</button>
                    </form>
                </header>
                modal
            </div>
        </div>
    );
};

export default EditInventory;