import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleFaq = () => {
    const description = useLoaderData()
    console.log(description);
    return (
        <div>
            <div className="mx-auto ">
                <div
                    className="mb-2  "
                    dangerouslySetInnerHTML={{
                        __html: description.description,
                    }}
                />

            </div>
        </div>
    );
};

export default SingleFaq;