import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/UserProvider";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PrivateRoute = ({ children }) => {
  const { user, loading, shopInfo } = useContext(AuthContext);
  const location = useLocation();

  const pathname = location.pathname;
  const idMatch = pathname.match(/\/seller\/([^/]+)/);
  const sellerPath = idMatch ? idMatch[1] : null;

  const { data: prices = [], isLoading } = useQuery({
    queryKey: ["prices", shopInfo?.priceId, shopInfo?._id],
    queryFn: async () => {
      if (shopInfo?.priceId && shopInfo?._id) {
        const res = await fetch(
          `https://doob.dev/api/v1/seller/subscription-model?priceId=${shopInfo.priceId}&shopId=${shopInfo._id}`
        );
        const data = await res.json();
        return data?.data?.result;
      }
      return [];
    },
    enabled: !!shopInfo?.priceId && !!shopInfo?._id, // Ensure the query runs only if shopInfo is available
  });

  if (isLoading || loading) {
    return <div>Loading...</div>; // Add your loading animation here
  }

  // Check for the 'POS' permission
  const check = prices?.permissions?.some((itm) => itm?.route === sellerPath);

  if (check || user.staffRole) {
    return children;
  }

  // Redirect to dashboard if the user doesn't have access to POS
  return (
    <Navigate to="/seller/dashboard" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
