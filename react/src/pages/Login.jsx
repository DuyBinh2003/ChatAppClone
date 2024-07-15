import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-clients";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setCurrentUser, setToken } = useStateContext();

    const onLogin = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setCurrentUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <form className="w-1/4 shadow-xl p-6" onSubmit={onLogin}>
            <div className="flex items-center justify-between">
                <p className="mb-4 text-4xl">Login</p>
                <Link to="/signup">
                    <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Sign Up
                    </p>
                </Link>
            </div>
            {errors && (
                <div>
                    {Object.keys(errors).map((key) =>
                        errors[key].map((error) => (
                            <p
                                key={key}
                                className="text-red-500 text-xs italic"
                            >
                                {error}
                            </p>
                        ))
                    )}
                </div>
            )}
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    ref={emailRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    ref={passwordRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
                <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Forgot Password?
                </a>
            </div>
        </form>
    );
}
