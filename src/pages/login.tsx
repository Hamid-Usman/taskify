import  React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/button"; // Ensure you have a Button component

const apiUrl = import.meta.env.VITE_API_URL;

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/auth/token/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const data = await response.json();
        localStorage.setItem("authToken", data.auth_token);

        navigate("/home");
      } catch (err) {
        console.error("Error logging in:", err);
        setError((err as Error).message || "An unexpected error occurred");
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-accent_low p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

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
        
        <button type="submit" className="w-full py-3 bg-primary text-secondary text-lg font-semibold rounded-md"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};