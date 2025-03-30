import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/formInput/input";

// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const apiUrl = import.meta.env.VITE_API_URL;

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  re_password: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    setError(null); // Reset error before submitting
 
    try {
      const response = await fetch(`${apiUrl}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: data.firstName, // ✅ Corrected field name
          lastname: data.lastName,   // ✅ Corrected field name
          email: data.email,
          password: data.password,
          re_password: data.re_password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Response Error:", responseData);
        throw new Error(
          responseData?.email?.[0] ||
          responseData?.non_field_errors?.[0] ||
          responseData?.password?.[0] ||
          "Failed to create user"
        );
      }

      console.log("Success:", responseData);
      navigate("/login");

    } catch (err) {
      console.error("Error creating user:", err);
      setError((err as Error).message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary p-6 rounded-md shadow-lg shadow-secondary_low w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-8">Register to get started</h2>
        {error && <div className="text-red-500 N-4">{error}</div>}

       <div className="sm:grid grid-cols-2 gap-4">
          <Input label="First Name" type="text" register={register("firstName")} error={errors.firstName} />
          <Input label="Last Name" type="text" register={register("lastName")} error={errors.lastName} />
          <Input label="Email Address" type="email" register={register("email")} error={errors.email} />
          <Input label="Password" type="password" register={register("password")} error={errors.password} />
          <Input label="Confirm Password" type="password" register={register("re_password")} error={errors.re_password} />
        </div>

        <button type="submit" className="w-full py-3 bg-primary text-secondary rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};
