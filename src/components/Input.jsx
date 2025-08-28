import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-3">
          <Logo width="100px" />
        </div>
        <h2 className="text-center fw-bold">Sign in to your account</h2>
        <p className="text-center text-muted">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="text-primary fw-medium">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-danger text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-3">
          <div className="mb-3">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
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
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <Button type="submit" variant="primary" className="w-100">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

