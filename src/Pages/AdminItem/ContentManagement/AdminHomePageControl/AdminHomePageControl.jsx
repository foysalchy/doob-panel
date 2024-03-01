import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import AdminHero from './AdminHero';
import AdminOmniChat from './AdminOmniChat';
import AdminAbout from './AdminAbout';
import AdminMostPopulers from './AdminMostPopulers';
import AdminHowWeWork from './AdminHowWeWork';
import AdminTestimonial from './AdminTestimonial';


const AdminHomePageControl = () => {
    const [homeContent, setHomeContent] = useState('')
    const [omniChat, setOmniChat] = useState('')
    const [aboutData, setAboutData] = useState([])
    const [mostPopular, setMostPopular] = useState([])
    const [worksData, setWorksData] = useState('')
    const [customerData, setCustomerData] = useState([])



    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            heroSection: homeContent,
            omniChatSection: omniChat,
            aboutUsSection: aboutData,
            features: mostPopular,
            howWeWorksSection: worksData,
            testimonialSection: customerData
        }
        console.log(formData)
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend className='text-center w-full font-bold md:text-3xl pt-4 text-blue-500 pb-4'>
                        CUSTOMIZE YOUR HOME PAGE
                    </legend>
                    <br />
                    <AdminHero setHomeContent={setHomeContent} />
                    <br />
                    <AdminOmniChat setOmniChat={setOmniChat} />
                    <br />
                    <AdminAbout setAboutData={setAboutData} />
                    <br />
                    <AdminMostPopulers setMostPopular={setMostPopular} />
                    <br />
                    <AdminHowWeWork setHowWeWorksData={setWorksData} />
                    <br />
                    <AdminTestimonial setCustomerData={setCustomerData} />
                    <button type="submit" className="btn mt-6 bg-gray-900 px-8 py-2 rounded-md text-white">
                        Customize
                    </button>
                </fieldset>
            </form>

        </div>
    );
};




export default AdminHomePageControl;
