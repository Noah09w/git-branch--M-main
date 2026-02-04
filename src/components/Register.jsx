import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = ({ isLogin, setIsLogin }) => {
  const [userData, setUserData] = useState({ fullName: "", email: "", password: "" });
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
      const userCredential = await createUserWithEmailAndPassword(auth, userData?.email, userData?.password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        username: user.email?.split("@")[0],
        fullName: userData.fullName,
        image: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#f6f9fc] overflow-hidden">
      
      <div className="absolute w-105 h-105 bg-linear-to-br from-orange-400 to-orange-600 rounded-full -top-24 right-32 opacity-90"></div>
      <div className="absolute w-105 h-105 bg-linear-to-br from-gray-300 to-gray-400 rounded-full -bottom-40 left-32 opacity-90"></div>

      <div className="relative z-10">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-gray-300/60"></div>

        <div className="relative bg-white rounded-xl w-95 max-w-[90%] p-8 border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.12),0_25px_60px_rgba(0,0,0,0.08)]">
          
          <div className="flex justify-center mb-4">
            <img src="/assets/logo.png" alt="App Logo" className="w-14 h-14" />
          </div>

          <h1 className="text-center text-2xl font-semibold mb-2 text-gray-800">
            Sign up
          </h1>
          <p className="text-center text-sm text-gray-400 mb-6">
            Welcome, create an account to continue
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              onChange={handleChangeUserData}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400"
            />

            <input
              type="email"
              name="email"
              onChange={handleChangeUserData}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400"
            />

            <input
              type="password"
              name="password"
              onChange={handleChangeUserData}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400"
            />
          </div>

          <div className="mt-6">
            <button
              disabled={isLoading}
              onClick={handleAuth}
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-md transition flex items-center gap-2 justify-center disabled:opacity-60"
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  Register <FaUserPlus />
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <button onClick={() => setIsLogin(!isLogin)} className="hover:underline">
              Already have an account? <span className="font-semibold text-gray-800">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
