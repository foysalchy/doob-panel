import { useContext } from 'react';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
 import InputProductName from './Components/InputProductName';
import SincronusCategory from './Components/SincronusCategory';
import Description from './Components/Description';
import Stock from './Components/Stock';
import ServiceWarranty from './Components/ServiceWarranty';
import Delivery from './Components/Delivery';
import WareHouse from './Components/WareHouse';
import Meta from './Components/Meta';
import Swal from 'sweetalert2';
import Variants from './Components/Variants';
import DarazOption from './Components/DarazOption';
import UploadImage from './Components/UploadImage';





const SellerAddProduct = () => {

    const { shopInfo } = useContext(AuthContext)
    const [isChecked, setIsChecked] = useState(true);
    const [datazCategory, setDarazOption] = useState([]);
    const [loading, setLoading] = useState(false)
    const [daraz, setDaraz] = useState(false)
    const [woo, setWoo] = useState(false)
    const [adminWare, setAdminWare] = useState(true)
    const [coverPhoto, setCoverPhoto] = useState('');
    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [youtube, setYoutube] = useState('')
    const [multiVendor, setMultiVendor] = useState(adminWare);

    const [inputFields, setInputFields] = useState([
        { name: '', image: null, quantity: "", SKU: "", price: '', offerPrice: '', ability: false },
    ]);

    const [variantInput, setVariantInput] = useState([
        { product1: {}, product2: {}, product3: {}, sellingPrice: "" },
    ]);


    const [brandName, setBrandName] = useState()



    const imageUpload = (image) => {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;

        return fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                const imageUrl = imageData.imageUrl;
                return imageUrl;
            });
    };

    const DarazImage = async (image) => {
        const imageBlob = new Blob([image], { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('image', imageBlob);

        const url = `https://backend.doob.com.bd/api/v1/daraz/daraz-image/${shopInfo._id}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const imageData = await response.json();
            const imageUrl = imageData.url;
            if (!imageUrl) {
                Swal.fire(`${imageData.message}`, '', 'warning')
            }
            return imageUrl;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    };

    const ourData = [
        "Product Description",
        "Video URL",
        "Name",
        "Price",
        "Color Family",
        "Images",
        "Warranty Type",
        "SellerSKU",
        "Quantity",
        "Special Price",
        "Package Weight(kg)",
        "Package Weight (kg)",
        "Option",
        "adminWare",
        "Package Length (cm)",
        "English description",
        "Package Width (cm)",
        "Package Height (cm)",
        "Name in English language",
        "Short Description En",
        "Brand"

    ]

    const filteredData = datazCategory?.length && datazCategory?.filter(item => !ourData.includes(item.label))


    const formSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const BnName = form.productNameBn.value
        const sku = form.ProductSKU.value
        const EnName = form.productNameEn.value
        const megaCategory = form?.megaCategory?.value
        const Subcategory = form?.subCategory?.value || null
        const miniCategory = form?.miniCategory?.value || null
        const extraCategory = form?.extraCategory?.value || null


        const categories = [{ name: megaCategory }, Subcategory && { name: Subcategory }, miniCategory && { name: miniCategory }, extraCategory && { name: extraCategory }]

        const warehouse = form.warehouse.value
        const area = form.area && form.area.value || null
        const rack = form.rack && form.rack.value || null
        const self = form.self && form.self.value || null
        const cell = form.cell && form.cell.value || null

        const warehouseValue = [{ name: warehouse }, { name: area }, { name: rack }, { name: self }, { name: cell }]

        const warrantyTypes = form?.warrantyTypes?.value

        const packageWidth = form?.packageWidth?.value
        const productLength = form?.productLength?.value
        const productWidth = form?.productWidth?.value
        const productHight = form?.productHight?.value



        const MetaTag = form?.MetaTag?.value
        const MetaTagMetaDescription = form?.MetaDescription?.value
        const MetaImageFile = form?.MetaImage?.files[0]
        const MetaImage = await imageUpload(MetaImageFile)

        const darazOptionData = filteredData.length && filteredData?.map((item) => {
            const fieldName = item.name;
            const fieldValue = form?.[fieldName]?.value;
            return { [fieldName]: fieldValue };
        });


        const adminMegaCategory = form?.adminMegaCategory?.value;
        const adminSubCategory = form?.adminSubCategory?.value;
        const adminMiniCategory = form?.adminMiniCategory?.value;
        const adminExtraCategory = form?.adminExtraCategory?.value;

        const adminCategory = [adminMegaCategory, adminSubCategory, adminMiniCategory, adminExtraCategory];



        const formData = new FormData();



        const additionalPhotos = [
            form.coverPhoto,
            form.photo1,
            form.photo2,
            form.photo3,
            form.photo4,
            form.photo5,
            form.photo6,
            form.photo7,
        ];


        const uploadedImageUrls = await Promise.all(
            additionalPhotos.filter(fileInput => fileInput && fileInput.files[0]).map(async (fileInput, index) => {
                const file = fileInput.files[0];
                if (file && !daraz) {
                    const imageUrl = await imageUpload(file);
                    formData.append(`photo${index + 2}`, imageUrl);
                    return {
                        name: `photo ${index}`,
                        src: imageUrl,
                    };
                }
                else {
                    const imageUrl = await DarazImage(file);
                    formData.append(`photo${index + 2}`, imageUrl);
                    return {
                        name: `photo ${index}`,
                        src: imageUrl,
                    };
                }
                return null;
            })
        );



        const data = {

            videoUrl: youtube,
            brandName,
            BnName,
            name: EnName,
            daraz,
            woo,
            categories,
            warehouse: warehouseValue,
            shortDescription: shortDescription,
            description: description,
            sku: sku,
            regular_price: inputFields[0].price,
            stock_quantity: inputFields[0].quantity,
            price: inputFields[0].offerPrice,
            purchasable: true,
            total_sales: 0,
            // productType,
            weight: packageWidth,
            length: productLength,
            width: productWidth,
            height: productHight,
            multiVendor: multiVendor,
            adminCategory,
            variantData: variantInput[0],
            // color,
            // size,
            // material,
            // warrantyTime,
            // warrantyDescription,
            // shippingCost,
            // isFreeShipping,
            // isReturnable,
            // returnDays,
            // returnPolicy,
            // refundPolicy,
            // otherDetails,
            metaTitle: MetaTag,
            // metaKeywords,
            metaDescription: MetaTagMetaDescription,
            MetaImage,
            // barcode,
            // taxClassId,

            // shortDescription,
            // longDescription,
            status: false,
            createdAt: Date.now(),
            // updatedAt,
            featuredImage: uploadedImageUrls[0],
            images: uploadedImageUrls.filter(image => image !== null),
            videos: youtube,
            // attributes,
            variations: inputFields,
            warrantyTypes,
            rating_count: 0,
            shopId: shopInfo._id,
            adminWare,
            darazOptionData,
            upcoming: isChecked


        }

        console.log(data);




        fetch('https://backend.doob.com.bd/api/v1/seller/normal-product/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({ data })
        }).then((res) => res.json()).then((data) => {

            if (
                data.error
            ) {
                Swal.fire(`${data.message}`, '', 'warning')
                setLoading(false)
            }
            else {
                Swal.fire('', '', 'success')
                setLoading(false)
            }

        })
    };





    return (
        <div>

            <form className='border md:p-10 p-2' onSubmit={formSubmit} action="">

                <div className='mt-10'>
                    <UploadImage youtube={youtube} setYoutube={setYoutube} coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />
                </div>



                <InputProductName brandName={brandName} setBrandName={setBrandName} />

                <SincronusCategory datazCategory={datazCategory} setDarazOption={setDarazOption} setInputFields={setInputFields} daraz={daraz} setDaraz={setDaraz} woo={woo} setWoo={setWoo} />

                <WareHouse shopInfo={shopInfo} adminWare={adminWare} setAdminWare={setAdminWare} />

                <label
                    htmlFor="Toggle3"
                    className={`inline-flex items-center py-4 rounded-md cursor-pointer ${isChecked ? 'text-gray-800' : ''
                        }`}>

                    <input
                        id="Toggle3"
                        type="checkbox"
                        className="hidden peer"
                        checked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}
                    />
                    <span
                        className={`px-4 py-2 rounded-l-md ${isChecked ? ' bg-gray-300' : 'bg-violet-400'
                            }`}>
                        Upcoming Product
                    </span>
                    <span
                        className={`px-4 py-2 rounded-r-md ${isChecked ? ' bg-violet-400' : 'bg-gray-300'
                            }`}
                    >
                        For You Product
                    </span>
                </label>

                <div id='description'>
                    <Description shortDescription={shortDescription} setShortDescription={setShortDescription} description={description} setDescription={setDescription} />
                </div>
                <div className='my-4 mt-10'>
                    <Variants setVariantInput={setVariantInput} variantInput={variantInput} multiVendor={multiVendor} setMultiVendor={setMultiVendor} adminWare={adminWare} daraz={daraz} inputFields={inputFields} setInputFields={setInputFields} />
                </div>
                {daraz && datazCategory.length && <DarazOption datazCategory={datazCategory} />}

                <ServiceWarranty />
                <Delivery />
                <div>

                </div>
                <Meta />
                <div className="mt-4">
                    {
                        loading ?
                            <button type='button' className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4">
                                <span className="text-sm font-medium">
                                    Loading...
                                </span>
                                <svg className="animate-spin h-4 w-4 ml-3 text-white" viewBox="0 0 24 24">

                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </button>

                            :
                            <button type='submit'
                                // disabled={loading || coverPhoto}
                                className={(loading || coverPhoto) ? "group relative cursor-pointer inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 " : "group relative inline-flex items-center overflow-hidden rounded bg-gray-700 px-8 py-3 text-white focus:outline-none mt-4 cursor-not-allowed"}

                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <BsArrowRight />
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Upload Product
                                </span>
                            </button>
                    }
                </div>
            </form>


        </div>
    );
};

export default SellerAddProduct;