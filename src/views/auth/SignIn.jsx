/* eslint-disable no-unused-vars */
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "api/baseUrl";
import { message } from 'antd';
import { apis } from "api/apis";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function SignIn() {
  const INITIAL_OBJ = {
    email: '', password: ''
  };

  const [loginObj, setLoginObj] = useState(INITIAL_OBJ);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(apis.loginUrl, loginObj);
      if (response.data.success) {
        const { user, token } = response.data;
        console.log("Login successful!");
        localStorage.setItem('refresh_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        message.success('Login Success');
        navigate('/admin');
      } else {
        setErrorMessage(response.data.message || "Login failed. Please try again.");
        console.log("Login failed");
        message.error('Login Failed');
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
      console.log(error);
      message.error('An error occurred');
    }
    setIsLoading(false);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className={`mt-5 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start ${isLoading ? 'opacity-50' : ''}`}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <ClipLoader css={override} size={150} color={"#123abc"} loading={isLoading} />
        </div>
      )}
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form action="POST" onSubmit={submitForm}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email"
            placeholder="****@***.com"
            value={loginObj.email}
            onChange={(e) => updateFormValue({ updateType: 'email', value: e.target.value })}
            id="email"
            type="email"
            required
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            value={loginObj.password}
            onChange={(e) => updateFormValue({ updateType: 'password', value: e.target.value })}
            label="Password"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            required
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 dark:text-white"
            style={{ background: 'linear-gradient(to bottom, yellow, green)' }}
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link to="/auth/register" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
            <span>
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
