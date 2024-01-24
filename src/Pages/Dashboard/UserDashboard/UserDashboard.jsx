import React from 'react';
import UserDashboardHeader from './UserDashboardHeader';
import RecentOrder from './RecentOrder/RecentOrder';

const UserDashboard = () => {
    return (
        <div className="  mx-auto my-8">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <UserDashboardHeader />
            <RecentOrder />
        </div>
    );
};

export default UserDashboard;