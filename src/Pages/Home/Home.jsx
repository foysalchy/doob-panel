import React from 'react';
import HomeComponents1 from './HomeComponents1/HomeComponents1';
import HomeComponents2 from './HomeComponents2/HomeComponents2';
import Benefits from './HomeComponents2/Benefits';
import HomeAbout from './HomeAbout/HomeAbout';
import HomeComponents4 from './HomeComponents4/HomeComponents4';
import HomeComponents5 from './HomeComponents5/HomeComponents5';

const Home = () => {
    return (
        <div>
            <HomeComponents1 />
            <HomeComponents2 />
            <Benefits />
            <HomeAbout />
            <HomeComponents4 />
            <HomeComponents5 />
        </div>
    );
};

export default Home;