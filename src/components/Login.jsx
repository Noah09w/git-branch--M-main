import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = ({ isLogin, setIsLogin }) => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeUserData = (e) => {
        const { name, value } = e.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAuth = async () => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, userData?.email, userData?.password);
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#f6f9fc] overflow-hidden">

            <div className="absolute w-105 h-105 bg-orange-400 rounded-full -top-24 right-32 opacity-90"></div>
            <div className="absolute w-105 h-105 bg-orange-300 rounded-full -bottom-40 left-32 opacity-90"></div>

            <div className="relative bg-white shadow-xl rounded-xl w-95 max-w-[90%] p-8 z-10">

                <h1 className="text-center text-2xl font-semibold mb-2 text-gray-800">
                    Sign In
                </h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Welcome back, login to continue
                </p>

                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChangeUserData}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        name="password"
                        onChange={handleChangeUserData}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400"
                        placeholder="Password"
                    />
                </div>

                <button
                    disabled={isLoading}
                    onClick={handleAuth}
                    className="w-full mt-6 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-md transition flex items-center justify-center gap-2 shadow"
                >
                    {isLoading ? (
                        <>Processing...</>
                    ) : (
                        <>
                            Login <FaSignInAlt />
                        </>
                    )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account yet?{" "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gray-800 font-semibold cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Login;
