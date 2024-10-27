import UploadImage from "../../../SellerItems/ProductManagement/SellerAddProduct/Components/UploadImage";

const EditProduct = ({ openModal, setOpenModal, product }) => {



      return (
            <div>

                  <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal?._id == product?._id ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}>
                        <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute  rounded-sm bg-white w-[90%] border-black bar overflow-hidden p-6 drop-shadow-lg dark:bg-white border dark:text-black ${openModal?._id == product?._id ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                              <h1 className="mb-2 text-2xl font-semibold">Edit...</h1> <br />
                              <UploadImage />
                        </div>
                  </div>
            </div>



      );
};

export default EditProduct;
