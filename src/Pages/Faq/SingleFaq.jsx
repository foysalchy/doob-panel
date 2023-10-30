import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MetaHelmet from '../../Helmate/Helmate';

const SingleFaq = () => {
    const description = useLoaderData()
    console.log(description);
    return (
        <div>
            <MetaHelmet title={description?.MetaTag} description={description?.MetaDescription} image={description?.MetaImage} />

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