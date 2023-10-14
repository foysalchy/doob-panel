import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const Faq = () => {
    const [faqs, setFaq] = useState([])

    useEffect(() => {

        fetch('https://salenow-kmg7yawl2-salenow-backend.vercel.app/admin/faq')
            .then(response => response.json())
            .then(data => {

                setFaq(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log();




    return (
        <div>
            This is Work
            <div
                className="mb-2  "
                dangerouslySetInnerHTML={{
                    __html: faqs[0]?.description,
                }}
            />
        </div>
    );
};

export default Faq;