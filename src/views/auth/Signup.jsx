/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {message} from 'antd'
import { apis } from 'api/apis';

const Signup = () => {

    const INITIAL_OBJ = {
        fullname: '', email: '', contact: '', password: '', membership_number: '', re_password: ''
    };

    const [registerObj, setRegisterObj] = useState(INITIAL_OBJ);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if (registerObj.password === registerObj.re_password) {
            try {
                const { re_password, ...postObj } = registerObj;  // Destructure to exclude re_password

                const response = await axios.post(apis.registerUrl, postObj);

                if (response.data.success) {
                    console.log("Registration successful!");
                    navigate('/auth/sign-in');
                    message.success('Registration successful')
                } else {
                    setErrorMessage(response.data.message || "Registration failed. Please try again.");
                    message.error('Registration Failed')
                }
            } catch (error) {
                setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
                console.log(error);
                message.error('An Error Occured')
            }
        } else {
            setErrorMessage("Passwords didn't match!");
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    return (
        <div className="mt-2 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            {/* Sign in section */}
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Register
                </h4>
                <p className="mb-9 ml-1 text-base text-gray-600">
                    Enter your credentials to create an account!
                </p>
                <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                    <div className="rounded-full text-xl">
                        <FcGoogle />
                    </div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                        Sign Up with Google
                    </h5>
                </div>
                <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    <p className="text-base text-gray-600 dark:text-white"> or </p>
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                </div>
                <form onSubmit={submitForm} method='POST'>
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Fullname"
                        placeholder="enter fullname"
                        value={registerObj.fullname}
                        onChange={(e) => updateFormValue({ updateType: 'fullname', value: e.target.value })}
                        id="fullname"
                        type="text"
                        required
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email"
                        placeholder="****@***.com"
                        value={registerObj.email}
                        onChange={(e) => updateFormValue({ updateType: 'email', value: e.target.value })}
                        id="email"
                        type="email"
                        required
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Phone #"
                        placeholder="0*********"
                        value={registerObj.contact}
                        onChange={(e) => updateFormValue({ updateType: 'contact', value: e.target.value })}
                        id="contact"
                        type="text"
                        required
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="CCM Membership Number"
                        placeholder="*** *****"
                        value={registerObj.membership_number}
                        onChange={(e) => updateFormValue({ updateType: 'membership_number', value: e.target.value })}
                        id="ccm_number"
                        type="text"
                        required
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password"
                        placeholder="Min. 8 characters"
                        value={registerObj.password}
                        onChange={(e) => updateFormValue({ updateType: 'password', value: e.target.value })}
                        id="password"
                        type="password"
                        required
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Confirm Password*"
                        placeholder="Min. 8 characters"
                        value={registerObj.re_password}
                        onChange={(e) => updateFormValue({ updateType: 're_password', value: e.target.value })}
                        id="re-password"
                        type="password"
                        required
                    />
                    <div className="mb-4 flex items-center justify-between px-2">
                        <div className="flex items-center">
                            <Checkbox />
                            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                Keep me logged In
                            </p>
                        </div>
                        <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="#">
                            Forgot Password?
                        </a>
                    </div>
                    {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                    <button
                        type='submit'
                        className="linear mt-2 w-full rounded-xl  py-[12px] text-base font-medium text-white transition duration-200 dark:text-white"
                        style={{ background: 'linear-gradient(to bottom, yellow, green)' }}
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4">
                    <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already have an account?
                    </span>
                    <Link to="/auth/sign-in" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
                        login here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
