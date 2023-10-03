import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <div className='container py-10'>
                <div className="p-6 rounded py-5 bg-violet-400 text-gray-900">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row items-center justify-between">
                            <h2 className="text-center text-6xl tracki font-bold">Up to
                                <br className="sm:hidden" />50% Off
                            </h2>

                            <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-gray-900 border-gray-400">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;