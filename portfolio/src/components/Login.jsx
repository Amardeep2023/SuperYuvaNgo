import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (data.token) {
        Cookies.set("token", data.token, { expires: 1, secure: true, sameSite: "Strict" });
        // Navigate to home page after successful login
        navigate("/");
      } else {
        setError("Invalid response from server.");
      } 
    } catch (e) {
      setError(e.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 ph:pt-24">
      <form
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          NGO Admin Portal
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
  
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              className="w-full px-5 py-3 text-lg border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              className="w-full px-5 py-3 text-lg border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button
            className={`w-full py-3 px-6 text-xl font-semibold rounded-xl shadow-lg transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02]"
            } text-white`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>
  
        <div className="mt-6 text-center text-gray-600">
          <p>Need help? Contact support@ngo.org</p>
        </div>
      </form>
    </div>
  );
}