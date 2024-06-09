import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Router";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthProvider/UserProvider";
// import ScrollToTop from "./SrollTop";
// import ReactPixel from 'react-facebook-pixel';
// import { useQuery } from "@tanstack/react-query";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners to detect online/offline changes
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // const pathname = window.location.pathname;
  // const idMatch = pathname.match(/\/shop\/([^/]+)/);

  // console.log(idMatch, 'what is id');

  // const { data: seller_facebook_pixel = {}, refetch } = useQuery({
  //   queryKey: ["seller-facebook-pixel"],
  //   queryFn: async () => {
  //     const res = await fetch(`https://doob.dev/api/v1/seller/get-facebook-id?shopId=${idMatch[1]}`);
  //     const data = await res.json();
  //     return data.data;
  //   },
  // });

  // const shopId = idMatch && seller_facebook_pixel.pixel && seller_facebook_pixel.pixel;
  // ReactPixel.init('asduygfweubuasgdf', {}, { debug: true, autoConfig: false });
  // ReactPixel.pageView();
  // ReactPixel.fbq('track', 'PageView');
  // useEffect(() => {

  // }, [shopId]);

  return (
    <div>
      {isOnline ? (
        <RouterProvider router={Router} />
      ) : (
        <div className="grid h-screen px-4 bg-white place-content-center">
          <h1 className="tracking-widest text-gray-500 uppercase text-2xl">
            <span className="text-red-500 ">503</span> | You are currently
            offline{" "}
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
