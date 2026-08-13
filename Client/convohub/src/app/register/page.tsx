"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { registerUser } from "@/services/auth";
import { RegisterData } from "@/types/auth";

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
    .email("Invalid email"),

  mobile: yup
    .string()
    .typeError("Mobile number is required")
    .required("Mobile number is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;

      const response = await registerUser(registerData);

      if (response.success) {
        toast.success(response.message);

        reset();

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow border-0">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Create Account
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name")}
                  />

                  <div className="invalid-feedback">
                    {errors.name?.message}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                  />

                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label className="form-label">
                    Mobile
                  </label>

                  <input
                    type="number"
                    className={`form-control ${
                      errors.mobile ? "is-invalid" : ""
                    }`}
                    {...register("mobile", {
                      valueAsNumber: true,
                    })}
                  />

                  <div className="invalid-feedback">
                    {errors.mobile?.message}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                  />

                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    {...register("confirmPassword")}
                  />

                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Register"}
                </button>
              </form>

              <div className="text-center mt-3">
                Already have an account?{" "}
                <Link href="/login">
                  Login
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;