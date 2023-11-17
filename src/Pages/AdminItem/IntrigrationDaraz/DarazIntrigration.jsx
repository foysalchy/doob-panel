
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/UserProvider';
import CryptoJS from 'crypto-js';
import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';

const DarazIntegration = () => {


    const { shopInfo, setShopInfo } = useContext(AuthContext)
    const [darazToken, setDarazToken] = useState(null);

    const [code, setCode] = useState(null)
    console.log(code);

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

            fetch('https://salenow-v2-backend.vercel.app/api/v1/daraz/get-key').then((res) => res.json()).then((data) => {
                const { appkey, secretkey } = data[0]

                const appKey = appkey
                const secretKey = secretkey

                const url = "https://api.daraz.com.bd/rest/auth/token/create";
                const timestamp = currentTimeInMilliseconds;
                const patch = `/auth/token/createapp_key${appKey}code${code}sign_methodsha256timestamp${timestamp}`;
                const sign = CryptoJS.HmacSHA256(patch, secretKey).toString(CryptoJS.enc.Hex).toUpperCase();

                console.log(sign);


                const body = {
                    sign_method: 'sha256',
                    sign: sign,
                    app_key: appKey,
                    code: code,
                    timestamp: timestamp,
                    url
                };


                fetch(`https://salenow-v2-backend.vercel.app/api/v1/daraz/addCode/${shopInfo._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        body
                    )
                }).then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setShopInfo(data)
                        const jsonData = JSON.stringify(data);
                        document.cookie = `SellerShop=${encodeURIComponent(jsonData)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/seller`;
                        Swal.fire('Daraz Login Successful', '', 'success')
                        console.log(data);
                    })
            })
        }

    }, [code])


    return (
        <div className="bg-gray-100 p-6 max-w-md mx-auto rounded-md shadow-md">


            {!shopInfo.darazLogin && <a
                href='https://api.daraz.com.bd/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://evidently-active-magpie.ngrok-free.app/seller/add-daraz/&client_id=501436'
                className="text-blue-500 hover:underline mb-4 inline-block"
            >
                Login Daraz
            </a>}

            {shopInfo.darazLogin && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mt-4">
                    <h1 className="text-green-700 font-bold">You have already have an account</h1>
                </div>
            )}
        </div>
    );
};

export default DarazIntegration;