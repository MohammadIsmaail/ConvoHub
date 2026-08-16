"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { loginUser } from "@/services/auth";
import { LoginData } from "@/types/auth";
import { setToken, setUser, setIsAuthenticated,} from "@/redux/slices/authSlice";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        
        console.log("LOGIN SUCCESS");

  localStorage.setItem("token", response.data.token);

  console.log("TOKEN SAVED");

  dispatch(setToken(response.data.token));

  console.log("REDUX TOKEN SET");

  dispatch(setUser(response.data));

  dispatch(setIsAuthenticated(true));

  console.log("REDIRECTING TO CHAT");

  router.push("/chat");
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
                Login
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>

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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  {isSubmitting
                    ? "Logging In..."
                    : "Login"}
                </button>
              </form>

              <div className="text-center mt-3">
                Don't have an account?{" "}
                <Link href="/register">
                  Register
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;