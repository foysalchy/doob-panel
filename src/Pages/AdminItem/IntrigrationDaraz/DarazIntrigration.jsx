
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import CryptoJS from 'crypto-js';
import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';
import ModalForWoo from './ModalForWoo';

const DarazIntegration = () => {


    const { shopInfo, setShopInfo } = useContext(AuthContext)
    const [wooModal, setWoModal] = useState(false);

    const [code, setCode] = useState(null)

    const currentTimeInMilliseconds = new Date().getTime();




    useEffect(() => {
        const currentUrl = window.location.href;

        // Parse the URL and get the value of the 'code' parameter
        const urlParams = new URLSearchParams(new URL(currentUrl).search);
        const code = urlParams.get('code');
        setCode(code)

    }, [])

    useEffect(() => {
        if (code) {

            fetch('https://backend.doob.com.bd/api/v1/daraz/get-key').then((res) => res.json()).then((data) => {
                const { appkey, secretkey } = data[0]

                const appKey = appkey
                const secretKey = secretkey

                const url = "https://api.daraz.com.bd/rest/auth/token/create";
                const timestamp = currentTimeInMilliseconds;
                const patch = `/auth/token/createapp_key${appKey}code${code}sign_methodsha256timestamp${timestamp}`;
                const sign = CryptoJS.HmacSHA256(patch, secretKey).toString(CryptoJS.enc.Hex).toUpperCase();



                const body = {
                    sign_method: 'sha256',
                    sign: sign,
                    app_key: appKey,
                    code: code,
                    timestamp: timestamp,
                    url
                };


                fetch(`https://backend.doob.com.bd/api/v1/daraz/addCode/${shopInfo._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        body
                    )
                }).then((res) => res.json())
                    .then((data) => {
                        setShopInfo(data)
                        const jsonData = JSON.stringify(data);
                        document.cookie = `SellerShop=${encodeURIComponent(jsonData)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                        Swal.fire('Daraz Login Successful', '', 'success')
                    })
            })
        }

    }, [code])


    return (

        <div className='grid md:grid-cols-2 justify-between md:gap-10 gap-3 md:mt-10'>

            <div className={!shopInfo.darazLogin && "bg-gray-300  py-6 text-center  rounded-md "}>


                {!shopInfo.darazLogin && <a
                    href='https://api.daraz.com.bd/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://doob.com.bd/seller/channel-integration/&client_id=501436'
                    className="text-blue-500 hover:underline mb-4 inline-block"
                >
                    Login Daraz
                </a>}

                {shopInfo.darazLogin && (
                    <div className="bg-green-100 border-l-4 border-green-500  py-6 text-center  rounded-md">
                        <h1 className="text-green-700 font-bold">Your daraz account is connected</h1>
                    </div>
                )}


            </div>
            <div className={!shopInfo.wooLogin && "bg-gray-300  flex items-center justify-center text-center rounded-md "}>


                {!shopInfo.wooLogin &&
                    <button
                        onClick={() => setWoModal(true)}
                        className="text-blue-500 hover:underline mb-4 inline-block"
                    >
                        Woo comarce Loin
                    </button>
                }

                {shopInfo.wooLogin && (
                    <div className="bg-green-100 border-l-4 border-green-500  py-6 text-center  rounded-md">
                        <h1 className="text-green-700 font-bold">Your woo Commerce account is connected</h1>
                    </div>
                )}


            </div>

            <div className='h-0 w-0'>
                <ModalForWoo setOpenModal={setWoModal} OpenModal={wooModal} shopId={shopInfo._id} setShopInfo={setShopInfo} />
            </div>
        </div>
    );
};

export default DarazIntegration;