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
                         //demo slider add
                        const Slider ={ 
                              image: "https://doob.dev/api/v1/image/677e3b015b3da9e95b87e7d0.jpg", 
                              link: "#", 
                              shopId: data.shopUser._id,
                              time: new Date(),
                              status: true 
                        }
                        fetch(`https://doob.dev/api/v1/seller/slider/add`, {
                              method: "POST",
                              headers: {
                                    "content-type": "application/json",
                              },
                              body: JSON.stringify(Slider),
                        })
                              .then((res) => res.json())
                              .then((data) => {
                                   
                              });
                        //demo feathures
                        const feathures = [
                              {
                                image: "https://doob.dev/api/v1/image/677e3bf42aa288cf9e3c4dbd.jpg",
                                link: "#",
                                shopId: data.shopUser._id,
                                time: new Date(),
                                status: true,
                              },
                              {
                                image: "https://doob.dev/api/v1/image/another-image.jpg",
                                link: "#",
                                shopId: data.shopUser._id,
                                time: new Date(),
                                status: true,
                              },
                            ];
                            feathures.forEach(feathure => {
                            fetch(`https://doob.dev/api/v1/seller/feature/add`, {
                                    method: "POST",
                                    headers: {
                                          "content-type": "application/json",
                                    },
                                    body: JSON.stringify(feathure),
                              })
                              .then((res) => res.json())
                              .then((data) => {
                                   
                              });
                        });
                        //demo pages add
                        const pages = [
                              {
                                title: "Terms and Conditions",
                                description: '<p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" id="docs-internal-guid-4f6984b7-7fff-742e-7af4-c838ea200ed1"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">[Your Store Name] respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard seller data.</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">1. Information We Collect</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Registration Information</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">: Name, email, phone number, and business details.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Transaction Data</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">: Sales, payouts, and related financial records.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">2. How We Use Your Information</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">To manage your account and provide seller services.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">To communicate updates, promotions, and critical information.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">3. Data Sharing</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">We do not sell or rent your personal data.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data may be shared with payment gateways, shipping providers, and legal authorities when required.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">4. Data Security</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">We use encryption and secure servers to protect your information.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sellers are responsible for maintaining strong passwords for their accounts.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">5. Cookies and Tracking</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Our platform uses cookies to enhance user experience and analytics.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">6. Your Rights</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Access, update, or delete your personal information by contacting support.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">7. Changes to Privacy Policy</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Updates to this policy will be communicated via email or dashboard notifications.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">For questions or concerns, contact us at [support email].</span></p>',
                                shop: data.shopUser.shopId,
                                status: true,
                                page: "footer1",
                                url: undefined,
                                metaTag: "Terms and Conditions",
                                metaDescription: "Terms and Conditions",
                                trash: false,
                                timestamp: new Date().getTime(),
                                draft: false,
                              },
                              {
                                title: "Privacy Policy",
                                description: '<p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" id="docs-internal-guid-100f85bc-7fff-403a-6b25-3b98c693c6ce"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">[Your Store Name] respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard seller data.</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">1. Information We Collect</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Registration Information</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">: Name, email, phone number, and business details.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Transaction Data</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">: Sales, payouts, and related financial records.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">2. How We Use Your Information</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">To manage your account and provide seller services.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">To communicate updates, promotions, and critical information.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">3. Data Sharing</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">We do not sell or rent your personal data.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Data may be shared with payment gateways, shipping providers, and legal authorities when required.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">4. Data Security</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">We use encryption and secure servers to protect your information.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sellers are responsible for maintaining strong passwords for their accounts.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">5. Cookies and Tracking</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Our platform uses cookies to enhance user experience and analytics.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">6. Your Rights</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Access, update, or delete your personal information by contacting support.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><br></p><hr><p><br></p><h4 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:2pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">7. Changes to Privacy Policy</span></h4><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;" role="presentation"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Updates to this policy will be communicated via email or dashboard notifications.</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:12pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">For questions or concerns, contact us at [support email].</span></p>',
                                shop: data.shopUser.shopId,
                                status: true,
                                page: "footer1",
                                url: undefined,
                                metaTag: "Privacy Policy",
                                metaDescription: "Privacy Policy",
                                trash: false,
                                timestamp: new Date().getTime(),
                                draft: false,
                              }
                            ];
                            
                            
                            pages.forEach(faq => {
                              fetch(`https://doob.dev/api/v1/seller/page`, {
                                method: "POST",
                                headers: {
                                  "content-type": "application/json",
                                },
                                body: JSON.stringify(faq),
                              })
                              .then(res => res.json())
                              .then(data => {
                                
                              })
                              
                            });
                            
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
