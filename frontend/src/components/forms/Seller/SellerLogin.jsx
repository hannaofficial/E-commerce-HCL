import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";


const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/seller/${state}`, { name, email, password });
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> {state === "login" ? "Login" : "Sign Up"}
          </p>

          {state === "register" && (
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
            {state === "login" ? "Login" : "Sign Up"}
          </button>

          {state === "login" ? (
            <p className="text-center w-full text-xs text-gray-500">
              New Seller?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer font-medium"
              >
                Sign up for seller
              </span>
            </p>
          ) : (
            <p className="text-center w-full text-xs text-gray-500">
              Already have account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer font-medium"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </form>
    )
  );
};

export default SellerLogin;
