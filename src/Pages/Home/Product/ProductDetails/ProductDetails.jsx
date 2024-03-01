import React, { useEffect } from "react";
import { useState } from "react";
import { FaBasketShopping, FaCircle, FaMessage } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import TrendingProducts from "./TrendingProducts";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BrightAlert from 'bright-alert';
import MetaHelmet from "../../../../Helmate/Helmate";
import ReleventProduct from "./ReleventProduct";
import ModalForPayment from "./ModalFOrPayment";

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};



const ProductDetails = () => {
  const { user, shopInfo } = useContext(AuthContext)
  const location = useParams();
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [userName, setUserName] = useState(user?.name)
  const [variationData, setVariationData] = useState(null)

  const myData = useLoaderData();
  const productFind = myData?.data;

  if (variationData) {
    console.log(variationData?.name);
  } else {
    productFind?.name
  }

  const [quantity, setQuantity] = useState(1);
  const [banifit, setBanifit] = useState({
    productCost: parseInt(productFind?.variantData?.sellingPrice),
    sellingPrice: parseInt(productFind?.variantData?.sellingPrice),
    profit: 0,
    profitPercent: 0,
  });

  useEffect(() => {

  }, [variationData])
  const allUpdateInfo = () => {
    const price = parseInt(productFind?.variantData?.sellingPrice);
    const quantityPars = parseInt(quantity);
    const productCost = quantityPars * price;

    // Compare your quantity   nahid, mahadi, and murshed
    const product1Quantity = productFind?.variantData.product1.quantity;
    const product2Quantity = productFind?.variantData.product2.quantity;
    const product3Quantity = productFind?.variantData.product3.quantity;

    const product1QuantityPrice = productFind?.variantData?.product1?.quantityPrice;
    const product2QuantityPrice = productFind?.variantData?.product2?.quantityPrice;
    const product3QuantityPrice = productFind?.variantData?.product3?.quantityPrice;

    let profit = 0;
    let profitPercent = 0;
    let sealingPrice = price;
    let total = productCost;
    // ...
    const updatedProductCost = total;

    if (quantity >= product1Quantity && quantity < product2Quantity) {
      console.log(quantity * product1QuantityPrice);
      // const productQuantityPrice = (total / quantity) * quantity;
      // const countProfit = (product1QuantityPrice / product1Quantity) * quantity;
      sealingPrice = quantity * product1QuantityPrice
      profit = productCost - sealingPrice;
      profitPercent = (profit / sealingPrice) * 100;
      console.log('profit 1 : ', profit);
    }

    else if (quantity >= product2Quantity && quantity < product3Quantity) {
      // const productQuantityPrice = (total / quantity) * quantity;
      // const countProfit = (product2QuantityPrice / product2Quantity) * quantity;
      sealingPrice = quantity * product2QuantityPrice
      profit = productCost - sealingPrice;
      profitPercent = (profit / sealingPrice) * 100;
    }

    else if (quantity >= product3Quantity) {
      sealingPrice = quantity * product3QuantityPrice
      profit = productCost - sealingPrice;
      profitPercent = (profit / sealingPrice) * 100;
    }
    else {
      sealingPrice = total;
    }

    // ...


    setBanifit({
      ...banifit,
      productCost: updatedProductCost,
      sellingPrice: sealingPrice,
      profit: profit,
      profitPercent: parseFloat(profitPercent).toFixed(2),
    });
  };

  useEffect(() => {

    allUpdateInfo();
  }, [quantity]);

  const imageList = productFind ? productFind.images : [];
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const blankImg = 'https://i.ibb.co/7p2CvzT/empty.jpg';
  const [selectedImage, setSelectedImage] = useState(
    productFind?.images[0]?.src ? productFind?.images[0]?.src : blankImg
  );


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);


    console.log(userInfo);
  };

  const handleManualInput = (e) => {
    const inputQuantity = parseInt(e.target.value, 10);

    if (!isNaN(inputQuantity) && inputQuantity > 0) {
      setQuantity(inputQuantity);

    }
  };

  useEffect(() => {
    allUpdateInfo();
  }, [quantity])

  const convertedRating = (2 / 10) * 5;

  const handleStore = (id, getway, userInfo) => {


    if (shopInfo) {
      const data = {
        shopId: shopInfo?.shopId,
        shopName: shopInfo?.shopName,
        shopUid: shopInfo?._id,
        quantity: quantity,
        sellingPrice: banifit.sellingPrice,
        getway: getway,
        userInfo
      }
      console.log(data);
      fetch(`https://backend.doob.com.bd/api/v1/seller/web-store?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then((res) => res.json()).then((data) => {
        BrightAlert();
      })
    }
    else {
      navigate('/sign-in')
    }
  }

  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [invoice, setInvoice] = useState(false);
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.photo.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", selectedFile);

    try {
      // Upload the image and get the URL
      const imageUrl = await uploadImage(imageFormData);

      // Construct imgData object with the image URL
      const imgData = {
        image: imageUrl,
        link: window.location.href,
      };

      // Construct the data object for posting the comment
      const data = {
        name: userName ? userName : '', // Fixed 'user2' to 'user'
        comment,
        photo: imgData,
        rating,
        productId: myData?.data?._id,
        shopId: myData?.data?.shopId
      };

      // Post the comment data to the backend
      const response = await fetch("https://backend.doob.com.bd/api/v1/seller/add-new-comment", {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(data)
      });

      // Handle the response
      const responseData = await response.json();
      const user = responseData.user;
      BrightAlert();
      console.log(responseData, 'uploaded');
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };


  async function uploadImage(formData) {
    const url = "https://backend.doob.com.bd/api/v1/image/upload-image";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    return imageData.imageUrl;
  }


  const { data: comments = {}, refetch: reload } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(`https://backend.doob.com.bd/api/v1/seller/product-comment?id=${productFind?._id}`);
      const data = await res.json();
      return data?.comments;
    },
  });

  console.log(banifit.productCost === isNaN);

  // console.log(productFind, 'comment');
  return (
    <section>
      <div className="py-4">
        <MetaHelmet title={productFind.metaTitle} description={productFind.metaDescription} image={productFind.MetaImage} />
        <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12 ">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Link to={'/products'} className="hover:underline hover:text-gray-600">
              Home
            </Link>
            {productFind.categories.filter((category) => category && category.name).map((category, index) => [
              <span key={`arrow-${index}`}>
                <svg
                  className="h-5 w-5 leading-none text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>,
              <Link
                key={`category-${index}`}
                to={`/product/categories/${category.name}`}
                className="hover:underline hover:text-gray-600"
              >
                {category.name}
              </Link>,
            ])}

            <svg
              className="h-5 w-5 leading-none text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {variationData?.name ? variationData?.name : productFind?.name}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-12 mt-6 ">
          <div className="flex flex-col md:flex-row -mx-4 border rounded border-gray-300 py-4">
            <div className="md:flex-1 px-4">
              <div>
                <div className="h-64  md:h-[22rem] rounded-lg bg-gray-100 mb-4">
                  <div className="h-64 md:h-full rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    {
                      selectedImage ? <img
                        className="w-94 h-full"
                        src={selectedImage ? selectedImage : blankImg}
                        srcSet={selectedImage ? selectedImage : blankImg}
                        alt="product image"
                      /> : <h2>Loading...</h2>
                    }

                  </div>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 -m-4 text-white">
                  {imageList.map((imageUrl, index) => (
                    <div onClick={() => setVariationData(null)} key={index} className="p-4 w-full md:w-11/12 rounded">
                      <a
                        className="block relative h-16 rounded overflow-hidden border"
                        onClick={() => handleImageClick(imageUrl?.src)}
                      >
                        <img
                          alt={`ecommerce${index + 1}`}
                          className="object-cover cursor-pointer block w-full h-full p-2 "
                          src={imageUrl?.src}
                          srcSet={imageUrl?.src}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4 ">
              <div className="flex items-center">

                {productFind?.stock_quantity > quantity ?
                  <p className="text-sm font-medium text-green-400 ml-1 flex items-center">
                    <MdDone className="text-green-400" /> In Stock
                  </p>
                  :
                  <p className="text-sm font-medium text-red-400 ml-1 flex items-center">
                    <MdDone className="text-red-400" /> Out Stock
                  </p>

                }
              </div>
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {variationData?.name ? variationData?.name : productFind?.name}
              </h2>
              <div>
                <div className=" hidden items-center">
                  <div className="flex">

                    <span className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          className="w-4 h-4"
                          key={star}
                          style={{
                            color: star <= convertedRating ? 'gold' : 'gray',
                          }}
                        >
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 "
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </span>
                      ))}
                      <span className="text-gray-600 ml-2">9.3</span>

                    </span>

                  </div>
                  <div>
                    <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                  </div>
                  <div className="flex items-center">
                    <FaMessage className="text-[#DBDBDB] mr-2 text-[15px]" />
                    <p>32 Message</p>
                  </div>
                  <div>
                    <FaCircle className="text-[#DBDBDB] text-[8px] mx-2 md:mx-4" />
                  </div>
                  <div className="flex items-center">
                    <FaBasketShopping className="text-[#DBDBDB] mr-2 text-[16px]" />
                    <p>154 Sold</p>
                  </div>
                </div>

                {user ? <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 bg-red-100 py-3">
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">${isNaN(banifit.sellingPrice) ? "0" : parseInt(banifit.sellingPrice)}</h6>

                      <p className="text-sm text-[#606060]">Product Costing</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">${isNaN(banifit.productCost) ? '0' : parseInt(banifit.productCost)}</h6>
                      <p className="text-sm text-[#606060]">Selling Price</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">${parseInt(banifit.profit)}</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl">{banifit.profitPercent}%</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                  </div>
                </div> : <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 bg-red-100 py-3">
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">0</h6>
                      <p className="text-sm text-[#606060]">Product Costing</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">0</h6>
                      <p className="text-sm text-[#606060]">Selling Price</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl">0</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl">{0}%</h6>
                      <p className="text-sm text-[#606060]">Your Profit</p>
                    </div>
                  </div>
                </div>}
                {user ? <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 bg-red-100 py-3">

                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product1?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product1?.quantity}  Qty</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product2?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product2?.quantity}  Qty</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl text-red-400">{productFind?.variantData?.product3?.quantityPrice}</h6>
                      <p className="text-sm text-[#606060]">{productFind?.variantData?.product3?.quantity}  Qty</p>
                    </div>
                  </div>
                </div> : <div className="my-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 bg-red-100 py-3">

                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{0}</h6>
                      <p className="text-sm text-[#606060]">{0}  Qty</p>
                    </div>
                    <div className="text-center md:border-r-2 border-gray-400">
                      <h6 className="font-bold text-xl text-red-400">{0}</h6>
                      <p className="text-sm text-[#606060]">{0}  Qty</p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-bold text-xl text-red-400">{0}</h6>
                      <p className="text-sm text-[#606060]">{0}  Qty</p>
                    </div>
                  </div>
                </div>}
              </div>

              <div className="flex py-4 space-x-4">
                <div>
                  <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={
                        handleDecrease
                      }
                      className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      id="Quantity"
                      value={quantity}
                      onChange={handleManualInput}
                      className="h-10 w-24 rounded border px-4 border-gray-900 [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
                      onClick={
                        handleIncrease}
                      className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75 "
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* 
                <button
                  onClick={() => handleStore(productFind?._id)}
                  type="button"
                  className="h-10 px-6 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Buy Now
                </button> */}

                <button
                  onClick={() => setInvoice(productFind?._id)}
                  type="button"
                  className="h-10 px-6 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Buy Now
                </button>

                {invoice && <ModalForPayment quantity={quantity} seller={productFind.shopId} product={productFind} handleStore={handleStore} invoice={invoice} setInvoice={setInvoice} sellingPrice={banifit.sellingPrice} />}

              </div>
              {/* variation data */}
              <div className="flex">
                {
                  productFind?.variations?.map((variation, index) => <div onClick={() => setVariationData(variation)} className={`w-[50px] h-[50px] object-cover`} key={index}>
                    <img className="w-full h-full" src={variation?.image} alt={variation?.name} />
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        {/* comment form */}
        {user && (
          <div className="bg-gray-100 hidden py-2 px-3">
            <form className="border-b border-gray-400 mx-auto mt-2" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="write your comment..."
                  rows="4"
                  value={comment}
                  onChange={handleCommentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handlePhotoChange}
                  className="w-full border bg-white border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <StarRating rating={rating} onRatingChange={handleRatingChange} />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-indigo-700"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-white hidden p-2 mt-8">
          <h3 className="mt-2 font-semibold pb-4">All Comment</h3>
          {
            Array.isArray(comments) && comments.map((comment, index) =>
              <div key={comment?._id} className="flex mb-3">
                <div className="flex-shrink-0  mr-3">
                  <div
                    className="mt-2 rounded-full bg-gray-100 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                    {comment?.name ? comment?.name.charAt(0) : '🙎‍♂️'}
                  </div>
                </div>
                <div className="flex-1 border bg-gray-50 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <h5 className="font-[500]">{comment?.name}</h5>{" "}
                  <p className="text-sm text-gray-500">
                    {comment?.comment}
                  </p>
                </div>
              </div>
            )
          }
        </div>
        {/* end comment */}

        <br />
        {productFind?.description && <div className="border p-6 rounded">
          <ProductDescription metaTitle={productFind?.metaTitle} description={productFind?.description} />
        </div>}
      </div>
      {comments && <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ProductReviews comments={comments} />
        </div>
      </div>}
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <ReleventProduct productFind={productFind} />
        </div>
      </div>
      {/* <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 my-6">
        <div className="border p-6 rounded">
          <TrendingProducts />
        </div>
      </div> */}
    </section >
  );
};

export default ProductDetails;




