import React from 'react';
import UserDashboardHeader from './UserDashboardHeader';
import MetaHelmet from '../../../Helmate/Helmate';

const UserDashboard = () => {
      return (
            <div className="  mx-auto my-8">
                  <MetaHelmet title="User Dashboard" description={'User Dashboard'} />
                  <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
                  <UserDashboardHeader />

            </div>
      );
};

export default UserDashboard;
