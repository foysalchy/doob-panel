import React from 'react';
import HomeHero from './HomeHero/HomeHero';
import HomeAbout from './HomeAbout/HomeAbout';
import HomePopularFeatures from './HomePopularFeatures/HomePopularFeatures';
import HomeHowWeWork from './HomeHowWeWork/HomeHowWeWork';
import HomeOmniChannel from './HomeOmniChannel/HomeOmniChannel';
import HomeUserVoice from './HomeUserVoice/HomeUserVoice';
import HomeNewsletter from './HomeNewsletter/HomeNewsletter';
import Benefits from './HomeOmniChannel/Benefits';


const Home = () => {
    return (
        <div>
            <HomeHero />
            <HomeOmniChannel />
            <Benefits />++++++
            <HomeAbout />
            <HomePopularFeatures />
            <HomeHowWeWork />
            <HomeUserVoice />
            <HomeNewsletter />


        </div>
    );
};

export default Home;