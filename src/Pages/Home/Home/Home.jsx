import React from 'react';
import HomeHero from './HomeHero/HomeHero';
import HomeAbout from './HomeAbout/HomeAbout';
import HomePopularFeatures from './HomePopularFeatures/HomePopularFeatures';
import HomeHowWeWork from './HomeHowWeWork/HomeHowWeWork';
import HomeOmniChannel from './HomeOmniChannel/HomeOmniChannel';
import HomeUserVoice from './HomeUserVoice/HomeUserVoice';
import HomeNewsletter from './HomeNewsletter/HomeNewsletter';
import Benefits from './HomeOmniChannel/Benefits';
import MetaHelmet from '../../../Helmate/Helmate';
import Interest from './Interest/Interest';

const Home = () => {
      return (
            <div>
                  <MetaHelmet title="Home" description={'Discover incredible deals and a diverse range of products from various vendors at Doob. Shop now and save big!'} />

                  <HomeHero />
                  <Interest />
                  <HomeOmniChannel />
                  {/* <Benefits /> */}
                  <HomeAbout />

                  <HomePopularFeatures />
                  <HomeHowWeWork />
                  <HomeUserVoice />
                  <HomeNewsletter />


            </div>
      );
};

export default Home;
