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
import SellerShopInfoProvider from "./SellerShopInfoProvider/UseSellerShopInfoProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SellerShopInfoProvider>
          <App />
        </SellerShopInfoProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
