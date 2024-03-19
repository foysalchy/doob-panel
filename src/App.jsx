import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Router";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthProvider/UserProvider";
import ScrollToTop from "./SrollTop";
import Logo from '../Logo.png';
import { useQuery } from "@tanstack/react-query";


function App() {


  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user } = useContext(AuthContext)



  useEffect(() => {


    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners to detect online/offline changes
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const pathname = window.location.pathname;
  const idMatch = pathname.match(/\/shop\/([^/]+)/);

  console.log(idMatch, 'what is id');

  const { data: seller_facebook_pixel = {}, refetch } = useQuery({
    queryKey: ["seller-facebook-pixel"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/api/v1/seller/get-facebook-id?shopId=${idMatch[1]}`);
      const data = await res.json();
      return data.data;
    },
  });



  const shopId = idMatch && seller_facebook_pixel.pixel ? seller_facebook_pixel.
    pixel : 1451744009007471;

  return (
    <div >

      <script type="text/javascript">
        {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${shopId}');
                fbq('track', 'PageView');
                `}
      </script>
      {/* Your Facebook Pixel script is rendered after the MetaHelmet component */}
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1451744009007471&ev=PageView&noscript=1" />
      </noscript>


      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1451744009007471&ev=PageView&noscript=1" />
      </noscript>
      {isOnline ? <RouterProvider router={Router} /> : <div className="grid h-screen px-4 bg-white place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase text-2xl"><span className="text-red-500 ">503</span> | You are currently offline </h1>
      </div>
      }
    </div>
  );
}

export default App;
