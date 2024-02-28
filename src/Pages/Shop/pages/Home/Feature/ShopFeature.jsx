import { useQuery } from '@tanstack/react-query';
import React from 'react';





const ShopFeature = () => {

    const pathname = window.location.pathname;
    const idMatch = pathname.match(/\/shop\/([^/]+)/);

    const shopId = idMatch ? idMatch[1] : null;

    console.log('Shop ID:', shopId);


    const { data: features = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["features"],
        queryFn: async () => {
            try {
                const res = await fetch(`https://backend.doob.com.bd/api/v1/shop/feature/get/${shopId}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data. Please try again.</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row space-y-2 items-center justify-center w-full p-4">
                <div className={`w-full md:w-1/2 mx-2 lg:h-[500px] overflow-hidden ${getCollageLayout(0).join(' ')}`}>
                    <img src={features[0]?.image} alt="" className="h-full object-cover w-full" />
                </div>

                <div className={`w-full md:w-1/2  ${getCollageLayout(1).join(' ')}`}>
                    <div className="flex flex-col space-y-2 ">
                        <div className={`w-full overflow-hidden ${getCollageLayout(2).join(' ')}`}>
                            <img src={features[1]?.image} alt="" className="h-[250px] object-cover w-full" />
                        </div>
                        <div className="w-full flex gap-2">

                            <div style={{ backgroundImage: `url(${features[2]?.image} )` }} className={`md:h-[238px] bg-cover object-cover h-[148px] w-full overflow-hidden bg-red-300 ${getCollageLayout(4).join(' ')}`}>

                            </div>
                            <div className={`h-[238px] w-full overflow-hidden ${getCollageLayout(4).join(' ')}`}>
                                <img src={features[3]?.image} alt="" className=" object-contain w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getCollageLayout = (index) => {
    switch (index) {
        case 0:
            return ['col-span-2 row-span-2'];
        case 1:
            return [];
        case 2:
            return [];
        case 3:
            return ['col-span-1 row-span-2'];
        case 4:
            return ['col-span-1 row-span-2'];
        default:
            return [];
    }
};
export default ShopFeature;