import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Trams = () => {
    const page = useLoaderData()
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>

            <h1 className='text-2xl text-center font-bold py-10'>{page?.title}</h1>
            <div
                className="mb-2  "
                dangerouslySetInnerHTML={{
                    __html: page?.description,
                }}
            />

        </div>
    );
};
export default Trams;