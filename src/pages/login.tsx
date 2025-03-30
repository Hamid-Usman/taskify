import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/formInput/input";

interface LoginData {
  email: string,
  password: string
}

const apiUrl = import.meta.env.VITE_API_URL;

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required")
})

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: LoginData) => {
        setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/auth/token/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const responseData = await response.json();
        localStorage.setItem("authToken", responseData.auth_token);

        navigate("/home");
      } catch (err) {
        console.error("Error logging in:", err);
        setError((err as Error).message || "An unexpected error occurred");
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-accent_low p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex flex-col gap-1 mb-4">
          <Input label="Email" type="email" register={register("email")} error={errors.email}/>
          <Input label="Password" type="password" register={register("password")} error={errors.password}/>
        
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-secondary text-lg font-semibold rounded-md"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};