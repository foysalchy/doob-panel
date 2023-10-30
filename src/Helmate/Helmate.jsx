import React from 'react';
import { Helmet } from 'react-helmet';

const MetaHelmet = ({ title, description, image }) => {
    console.log(title);
    return (
        <Helmet>
            <title>{`${title} - SaleNow`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={title} />
            <meta property="og:title" content={`${title} - SaleNow`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={`${title} - SaleNow`} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default MetaHelmet;