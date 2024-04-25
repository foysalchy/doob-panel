import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Faq = () => {
  const [faqs, setFaq] = useState([]);

  useEffect(() => {
    fetch("https://backend.doob.com.bd/api/v1/admin/faq")
      .then((response) => response.json())
      .then((data) => {
        setFaq(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div >

      <div
        className="mb-2 text_editor "
        dangerouslySetInnerHTML={{
          __html: faqs[0]?.description,
        }}
      />
    </div>
  );
};

export default Faq;
