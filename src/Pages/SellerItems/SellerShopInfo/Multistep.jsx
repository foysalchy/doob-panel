import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Step2 from "./Step2";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import showAlert from "../../../Common/alert";

const MultiStepForm = () => {
      const [step, setStep] = useState(1);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const { user, setShopInfo, setCookie, setUser } = useContext(AuthContext);

      const [formValues, setFormValues] = useState({
            seller: user.email,
            shopName: user.shopName,
            shopId: "",
            logo: "",
            address: "",
            shopEmail: "",
            shopNumber: "",
            woocommerce: "",
            noStore: "",
            daraz: "",
            priceId: "",
            paymentDate: new Date(),
            date: new Date(),
            status: "true",
            primary_color: "#111827", // Default primary color
            text_color: "#FFFFFF", // Default text color
            secounder_color: "#ffa531", // Default secondary color
            footer_color: "#111827", // Default footer color
            sellerId:Math.floor(100000 + Math.random() * 900000),
      });

console.log(formValues,'formValues')




      const nextStep = () => setStep(step + 2);
      const prevStep = () => setStep(step - 2);

      const handleChange = (field) => (e) => {
            setFormValues({ ...formValues, [field]: e.target.value });
      };

      const submitForm = (e) => {
            e.preventDefault();
            setLoading(true);
            console.log(formValues, 'formValues');
            fetch(`https://doob.dev/api/v1/shop/info`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(formValues),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        setLoading(false);
                        setShopInfo(data.shopUser);
                        setUser(data.user);
                        setCookie("DoobUser", JSON.stringify(data.user));
                        setCookie("SellerShop", JSON.stringify(data.shopUser));
                        showAlert("Shop Info Added Successfully", '', "success",);
                        navigate("/seller/dashboard");
                  });
      };

      return (
            <div className="">
                  {step === 1 && (
                        <Step1
                              nextStep={nextStep}
                              handleChange={handleChange}
                              values={formValues}
                        />
                  )}
                  {step === 2 && (
                        <Step2
                              nextStep={nextStep}
                              prevStep={prevStep}
                              handleChange={handleChange}
                              values={formValues}
                        />
                  )}
                  {step === 3 && (
                        <Step3
                              prevStep={prevStep}
                              submitForm={submitForm}
                              handleChange={handleChange}
                              values={formValues}
                        />
                  )}
            </div>
      );
};

export default MultiStepForm;
