import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          re_password: password
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
        console.log(response.json());
      }

      // Handle success (e.g., navigate to login page)
      navigate("/login");
    } catch (err) {
      console.error("Error creating user:", err);
      setError((err as Error).message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="username" className="font-bold">
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="rounded-md p-1 py-3 bg-accent text-secondary"
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="username" className="font-bold">
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="rounded-md p-1 py-3 bg-accent text-secondary"
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md p-1 py-3 bg-accent text-secondary"
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md p-1 py-3 bg-accent text-secondary"
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="rounded-md p-1 py-3 bg-accent text-secondary"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-secondary rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};