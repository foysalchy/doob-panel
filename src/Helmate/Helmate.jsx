import React from 'react';
import { Helmet } from 'react-helmet';

const MetaHelmet = ({ title, description, image }) => {
    const pixelId = '279948015137332'
    return (
        <Helmet>

            <title>{`${title} - Doob`}</title>
            {/* <title>{`মাহাদী হাসান `}</title> */}
            <meta name="description" content={description} />
            {/* <meta name="keywords" content={title} /> */}
            {/* <meta name="keywords" content='Mahadi Hsan' /> */}
            <meta property="og:title" content={`${title} - Doob`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={`${title} - Doob`} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
          



        </Helmet>
    );
};

export default MetaHelmet;