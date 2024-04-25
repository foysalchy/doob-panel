

import React, { useContext, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ImageUploadSeller from './ImageUploadSeller';
import ProductInfoSeller from './ProductInfoSeller';
import EditSincronusCategory from './EditSincronusCategory';
import EditWareHouse from './EditWarehiuses';
import SellerEditDiscription from './SellerEditDiscription';
import SellerEditVariants from './SellerEditVariants';
import EditServiceWarranty from './EditServiceWarenty';
import EditDelivery from './EditDelavery';
import EditMetaProduct from './EdidMetaProduct';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../../AuthProvider/UserProvider';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const EditProductForm = ({ product }) => {
    const [loading, setLoading] = useState(false)

    const { shopInfo } = useContext(AuthContext)
    const [isChecked, setIsChecked] = useState(true);
    const [datazCategory, setDarazOption] = useState([]);
    const [daraz, setDaraz] = useState(false)
    const [woo, setWoo] = useState(false)
    const [adminWare, setAdminWare] = useState(true)
    const [coverPhoto, setCoverPhoto] = useState('');
    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [youtube, setYoutube] = useState('')
    const [multiVendor, setMultiVendor] = useState(adminWare);




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


    //     const { shopInfo } = useContext(AuthContext)
    //     const id = useParams().id;
    //     const { data: products = [], refetch } = useQuery({
    //         queryKey: ["products"],
    //         queryFn: async () => {
    //             const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/all-products/${shopInfo._id}`);
    //             const data = await res.json();
    //             return data;
    //         },
    //     });

    //     const product = products.find(product => product?._id === id && product != null);
    // console.log(product, '...');

    delete product._id
    delete product.id
    delete product.shopId
    delete product.price_html
    delete product.menu_order
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [brandName, setBrandName] = useState('')
    const [inputFields, setInputFields] = useState([
        { name: '', image: null, quantity: "", SKU: "", price: '', offerPrice: '', ability: false },
    ]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };


    console.log(product, 'data........');

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        // const BnName = form.productNameBn.value
        // const sku = form.ProductSKU.value
        // const EnName = form.productNameEn.value
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
        console.log(additionalPhotos[0][0].files[0]);
        const firstFile = additionalPhotos.length > 0 && additionalPhotos[0].length > 0 && additionalPhotos[0][0].files[0];

        if (firstFile) {
            console.log(firstFile);
        }

        const uploadedImageUrls = await Promise.all(
            additionalPhotos?.filter(fileInputArray => fileInputArray.length > 0 && fileInputArray[0].files[0]).map(async (fileInputArray, index) => {
                const file = fileInputArray[0].files[0];
                let imageUrl;
                if (file) {
                    if (!daraz) {
                        imageUrl = await imageUpload(file);
                    } else {
                        imageUrl = await DarazImage(file);
                    }
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

            // videoUrl: youtube,
            // brandName,
            // BnName,
            // name: EnName,
            // daraz,
            // woo,
            // categories,
            // warehouse: warehouseValue,
            // shortDescription: shortDescription,
            // description: description,
            // sku: sku,
            // regular_price: inputFields[0].price,
            // stock_quantity: inputFields[0].quantity,
            // price: inputFields[0].offerPrice,
            // purchasable: true,
            // total_sales: 0,
            // // productType,
            // weight: packageWidth,
            // length: productLength,
            // width: productWidth,
            // height: productHight,
            // multiVendor: multiVendor,
            // adminCategory,
            // variantData: variantInput[0],
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
            // metaTitle: MetaTag,
            // metaKeywords,
            // metaDescription: MetaTagMetaDescription,
            // MetaImage,
            // barcode,
            // taxClassId,

            // shortDescription,
            // longDescription,
            // status: false,
            // createdAt: Date.now(),
            // updatedAt,
            // featuredImage: uploadedImageUrls[0],
            images: uploadedImageUrls.filter(image => image !== null),
            // videos: youtube,
            // attributes,
            // variations: inputFields,
            // warrantyTypes,
            // rating_count: 0,
            // shopId: shopInfo._id,
            // adminWare,
            // darazOptionData,
            // upcoming: isChecked


        }


        console.log(data, 'ddddddddddd');


    };


    return (

        <form
            onSubmit={formSubmit}
            className='h-[600px] overflow-x-hidden  px-10 text-start overflow-y-auto'>

            {/* <ImageUploadSeller product={product} /> */}
            <ImageUploadSeller youtube={youtube} setYoutube={setYoutube} coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />
            {/* * <ProductInfoSeller product={product} brandName={brandName} setBrandName={setBrandName} /> */}

            {/* <EditSincronusCategory /> */}

            {/* <EditWareHouse /> */}
            <EditWareHouse shopInfo={shopInfo} adminWare={adminWare} setAdminWare={setAdminWare} />
            {/* <label
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
                    </label> */}


            {/* <SellerEditDiscription /> */}

            {/* <SellerEditVariants inputFields={inputFields} setInputFields={setInputFields} /> */}

            {/* <EditServiceWarranty /> */}

            {/* <EditDelivery /> */}

            {/* <EditMetaProduct />   */}
            <br />
            <button
                className='bg-gray-800 text-white px-8 py-2 rounded-md mt-4'
                type="submit">Submit</button>
        </form>


    );
};

export default EditProductForm;