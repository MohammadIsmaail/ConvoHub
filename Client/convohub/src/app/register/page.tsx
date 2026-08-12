"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RegisterData } from "@/types/auth";
import { registerUser } from "@/services/auth";

interface RegisterFormData extends RegisterData {
    confirmPassword: string;
}

const registerSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),

    mobile: yup
        .number()
        .typeError("Mobile number must be a number")
        .required("Mobile number is required"),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),

    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: undefined,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const { confirmPassword, ...registerData } = data;

            const response = await registerUser(registerData);

            console.log("Register Success:", response);
        } catch (error: any) {
            console.error("Register Error:", error);
        }
    };

    return (
        <main className="min-vh-100 bg-light d-flex align-items-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card border-0 shadow rounded-4">
                            <div className="card-body p-4 p-md-5">

                                {/* Header */}
                                <div className="text-center mb-4">
                                    <Link
                                        href="/"
                                        className="text-decoration-none"
                                    >
                                        <h2 className="fw-bold text-dark">
                                            Chat
                                            <span className="text-primary">
                                                App
                                            </span>
                                        </h2>
                                    </Link>

                                    <h4 className="fw-bold mt-4">
                                        Create Account
                                    </h4>

                                    <p className="text-secondary mb-0">
                                        Create your account and start chatting
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter your name"
                                            {...register("name")}
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className={`form-control ${
                                                errors.email
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter your email"
                                            {...register("email")}
                                        />

                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Mobile
                                        </label>

                                        <input
                                            type="number"
                                            className={`form-control ${
                                                errors.mobile
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter your mobile number"
                                            {...register("mobile", {
                                                valueAsNumber: true,
                                            })}
                                        />

                                        {errors.mobile && (
                                            <div className="invalid-feedback">
                                                {errors.mobile.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className={`form-control ${
                                                errors.password
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Enter your password"
                                            {...register("password")}
                                        />

                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            className={`form-control ${
                                                errors.confirmPassword
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Confirm your password"
                                            {...register("confirmPassword")}
                                        />

                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">
                                                {errors.confirmPassword.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </button>
                                </form>

                                {/* Login */}
                                <div className="text-center mt-4">
                                    <span className="text-secondary">
                                        Already have an account?{" "}
                                    </span>

                                    <Link
                                        href="/login"
                                        className="text-primary fw-semibold text-decoration-none"
                                    >
                                        Login
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;