import React, { useContext, useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Step2 from './Step2';
import Step1 from './Step1';
import Step3 from './Step3';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/UserProvider';







const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    console.log(user);

    const [formValues, setFormValues] = useState({
        seller: user.email,
        shopName: user.shopName,
        shopId: '',
        logo: '',
        address: '',
        shopEmail: '',
        shopNumber: '',
        woocommerce: '',
        noStore: '',
        daraz: '',
        priceId: '',
        date: new Date()
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (field) => (e) => {
        setFormValues({ ...formValues, [field]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault()
        console.log(formValues);
        fetch(`http://localhost:5000/shop/info`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formValues),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                Swal.fire("Welcome as a new seller", "", "success");
                navigate('/seller/dashboard')
            });


    };







    return (
        <div className=''>



            {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} values={formValues} />}
            {step === 2 && (
                <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formValues} />
            )}
            {step === 3 && (
                <Step3 prevStep={prevStep} submitForm={submitForm} handleChange={handleChange} values={formValues} />
            )}
        </div>
    );
};

export default MultiStepForm;
