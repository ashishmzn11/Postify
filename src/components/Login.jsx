import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Logo } from "./index"; // मान लो Logo bootstrap-independent है
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <Logo width="100px" />
        </div>

        {/* Title */}
        <h2 className="text-center mb-3">Sign in to your account</h2>

        {/* Signup link */}
        <p className="text-center text-muted">
          Don&apos;t have any account?{" "}
          <Link to="/signup" className="fw-bold text-decoration-none">
            Sign Up
          </Link>
        </p>

        {/* Error message */}
        {error && <p className="text-danger text-center mt-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              {...register("password", { required: true })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
