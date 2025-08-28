import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-3">
          <Logo width="100px" />
        </div>

        <h2 className="text-center fw-bold">Sign up to create account</h2>
        <p className="text-center text-muted">
          Already have an account?&nbsp;
          <Link to="/login" className="text-primary fw-medium">
            Sign In
          </Link>
        </p>

        {error && <p className="text-danger text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-3">
          <div className="mb-3">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
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
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
