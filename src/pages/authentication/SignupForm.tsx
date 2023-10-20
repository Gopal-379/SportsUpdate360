/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
    name: string,
    email: string,
    password: string,
};

const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await fetch(`${API_ENDPOINT}/users`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const info = await res.json();

            if (!res.ok) {
                throw new Error("Signup failed");
            }

            console.log("Signup successful");
            localStorage.setItem("authToken", info.auth_token);
            localStorage.setItem("userName", JSON.stringify(info.user));
            navigate("/");
        } catch (err) {
            console.error("Signup failed", err);
        }
    };

    useEffect(() => {
        !!localStorage.getItem("authToken") && navigate("/");
    }, []);
    
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white p-8 md:p-12 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-800">
                Welcome to <span className="text-green-600">SportsUpdate360</span>
            </h2>
            <p className="mt-4 mb-8 text-gray-600">
                Create an account.
            </p>
            <div className="w-full max-w-sm mb-6">
                <label htmlFor="name" className="text-gray-700">Name</label>
                {errors.name && (
                    <span className="text-red-500">Name is required</span>
                )}
                <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                />
            </div>
            <div className="w-full max-w-sm mb-6">
                <label htmlFor="email" className="text-gray-700">Email address</label>
                {errors.email && (
                    <span className="text-red-500">Email is required</span>
                )}
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                />
            </div>
            <div className="w-full max-w-sm mb-6">
                <label htmlFor="password" className="text-gray-700">Set a password</label>
                {errors.password && (
                    <span className="text-red-500">Password is required</span>
                )}
                <input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                />
            </div>
            <button className="pl-3 pr-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                Sign Up
            </button>
            <p className="mt-6 text-gray-700">
                Already have an account?{" "}
                <Link
                    className="text-green-600 hover:text-green-800 transition-colors"
                    to="/auth/signin"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
