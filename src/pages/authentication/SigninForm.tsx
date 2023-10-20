import React from "react";
import { Link } from "react-router-dom";

const SigninForm: React.FC = () => {
    return (
        <div className="w-full bg-white p-8 md:p-12 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-800">
                Welcome to <span className="text-green-600">SportsUpdate360</span>
            </h2>
            <p className="mt-4 mb-8 text-gray-600">
                Sign in to your account.
            </p>
            <div className="w-full max-w-sm mb-6">
                <label htmlFor="email" className="text-gray-700">Email address</label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full
                    p-2.5"
                    required
                />
            </div>
            <div className="w-full max-w-sm mb-6">
                <label htmlFor="password" className="text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    required
                />
            </div>
            <button className="pr-3 pl-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Sign In
            </button>
            <p className="mt-6 text-gray-700">
                Don't have an account?{" "}
                <Link
                    className="text-green-600 hover:text-green-800"
                    to="/auth/signup"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default SigninForm;
