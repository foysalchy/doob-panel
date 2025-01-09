import React from 'react';
import banar1 from './process.png'
import banar2 from './Screenshot ss2020-04-09 at 9 1.png'
import { FaStore, FaShoppingCart, FaBullhorn, FaClipboardList, FaTruck, FaShippingFast, FaDollarSign } from 'react-icons/fa';

const HomeHowWeWork = () => {
    const events = [
        {
          type: 'type1',
          date: 'Step 1',
          icon: <FaStore />,
          title: 'Sign Up & Create Your Free Store',
          description: '<li>Register on doob.com.bd and create your free e-commerce store in minutes.</li><li>Customize your store with your brand name, logo, and design without any coding knowledge.</li>',
        },
        {
          type: 'type2',
          date: 'Step 2',
          icon: <FaShoppingCart />,
          title: 'Import Products Easily',
          description: '<li>Browse a wide range of products from Doob, Woocommerce, Daraz, and more.</li><li>Use our automatic integration tool to import product details, prices, and images directly into your store.</li>',
        },
        {
          type: 'type3',
          date: 'Step 3',
          icon: <FaBullhorn />,
          title: 'Promote & Sell Products',
          description: '<li>Share your store link or promote individual products on social media platforms like Facebook, Instagram, or WhatsApp.</li><li>Our marketing tools (Facebook Ads, Google Ads, Email & SMS campaigns) make it easy to reach your target customers.</li>',
        },
        {
          type: 'type1',
          date: 'Step 4',
          icon: <FaClipboardList />,
          title: 'Receive Orders',
          description: '<li>When customers place an order, it’s automatically synced in your doob.com.bd dashboard.</li><li>View all order details in one place, including customer information, product preferences, and payment status.</li>',
        },
   
       
        {
          type: 'type2',
          date: 'Step 5',
          icon: <FaTruck />,
          title: 'Place Orders with Suppliers',
          description: '<li>With just one click, forward your customer’s order to the supplier.</li><li>The supplier takes care of packaging and shipping directly to your customer.</li>',
        },
        
        {
          type: 'type1',
          date: 'Step 6',
          icon: <FaDollarSign />,
          title: 'Earn Profits Hassle-Free',
          description: '<li>You set the selling price, and the profit margin is yours.</li><li>Focus on growing your business while we handle the backend processes like integration, inventory management, and customer communication.</li>',
        },
      ];
      
      
    return (
        <div className='bg-[#F2F3F7]'>
             <style jsx>{`
                
                h2 {
                margin: 5%;
                text-align: center;
                font-size: 2rem;
                font-weight: 100;
                }

                
                .timeline__event {
                background: #fff;
                position: relative;
                display: flex;
                border-radius: 8px;
                box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
                }
                .timeline__event__title {
                font-size: 1.2rem;
                line-height: 1.4;
                text-transform: uppercase;
                font-weight: 600;
                color: #0967ff;
                letter-spacing: 1.5px;
                }
                .timeline__event__content {
                padding: 20px;
                }
                .timeline__event__date {
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                white-space: nowrap;
                }
                .timeline__event__icon {
                border-radius: 8px 0 0 8px;
                background: #0967ff;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: #0967ff;
                padding: 20px;
                flex-direction:column;
                display:flex
                }
                .timeline__event__icon i {
               color:white;
               fill:white
                }
                .timeline__event__description {
                flex-basis: 60%;
                }
               
                .timeline__event--type2:before {
                background: #87bbfe;
                border-color: #555ac0;
                }
                .timeline__event--type2:after {
                background: #555ac0;
                }
                .timeline__event--type2 .timeline__event__date {
                color: #87bbfe;
                }
                .timeline__event--type2 .timeline__event__icon {
                background: #555ac0;
                color: #555ac0;
                }
                .timeline__event--type2 .timeline__event__title {
                color: #555ac0;
                }
                .timeline__event--type3:before {
                background: #aff1b6;
                border-color: #24b47e;
                }
                .timeline__event--type3:after {
                background: #24b47e;
                }
                .timeline__event--type3 .timeline__event__date {
                color: #aff1b6;
                }
                .timeline__event--type3 .timeline__event__icon {
                background: #24b47e;
                color: #24b47e;
                }
                .timeline__event--type3 .timeline__event__title {
                color: #24b47e;
                }
                .timeline__event:last-child:after {
                content: none;
                }

                @media (max-width: 786px) {
                .timeline__event {
                    flex-direction: column;
                }

                .timeline__event__icon {
                    border-radius: 4px 4px 0 0;
                }
                }
      `}</style>
            <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
                <h1 className='mb-4 text-4xl font-extrabold text-center font-inner theme_colour'>Dropshipping Working Process
                </h1>
                <br />
                <div >
                    <div className="timeline grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                    {events.map((event, index) => (
                        <div key={index} className={`timeline__event animated fadeInUp ${event.type}`}>
                        <div className="timeline__event__icon">
                            <p><i>{event.icon}</i></p>
                            <div className="timeline__event__date">{event.date}</div>
                        </div>
                        <div className="timeline__event__content">
                            <div className="timeline__event__title">{event.title}</div>
                            <div className="timeline__event__description pl-10">
                            <p dangerouslySetInnerHTML={{ __html: event.description }}></p>

                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                   <div>
                    
                   </div>
                </div>
                
            </div>

        </div>
    );
};

export default HomeHowWeWork;