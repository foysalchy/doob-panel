import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./AuthProvider/UserProvider.jsx";
import {
      QueryClient,
      QueryClientProvider,
      useQuery,
} from "@tanstack/react-query";




const queryClient = new QueryClient();

console.log(new Date(1728198684617).toDateString(), 'date');



document.addEventListener("DOMContentLoaded", function () {
      const body = document.body;
      const scrollContainer = document.createElement("div");

      // Set scroll container styles
      scrollContainer.style.position = "fixed";
      scrollContainer.style.top = "0";
      scrollContainer.style.right = "0";
      scrollContainer.style.width = "2px";
      scrollContainer.style.backgroundColor = "rgb(13, 153, 177)";
      scrollContainer.style.zIndex = "10000"; // Ensure it's on top of other elements

      // Append scroll container to the body
      body.appendChild(scrollContainer);

      // Update scroll container height on scroll
      const updateScrollContainer = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;

            const scrollbarHeight = (clientHeight / scrollHeight) * 100;
            scrollContainer.style.height = `${scrollbarHeight}%`;
            scrollContainer.style.top = `${scrollTop}px`;
      };

      window.addEventListener("scroll", updateScrollContainer);
      window.addEventListener("resize", updateScrollContainer); // Recalculate on resize
      updateScrollContainer(); // Initialize
});


ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                  <UserProvider>
                        <App />
                  </UserProvider>
            </QueryClientProvider>
      </React.StrictMode>
);
