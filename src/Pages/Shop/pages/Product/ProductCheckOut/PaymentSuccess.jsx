import React from "react";
import { useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const params = useParams();
  console.log(params);
  return <div>PaymentSuccess of {params?.id}</div>;
}
