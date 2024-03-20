import React from 'react';
import { useLoaderData } from 'react-router';

const ShopPage = () => {

    const page = useLoaderData()
    return (
        <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 '>

            <h1 className='text-2xl text-start font-bold py-5'>{page?.title}</h1>
            <div
                className="mb-2 text_editor "
                dangerouslySetInnerHTML={{
                    __html: page?.description,
                }}
            />

        </div>
    );
}
export default ShopPage;