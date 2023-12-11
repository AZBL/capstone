import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [backendReady, setBackendReady] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/status`
        );
        if (response.data.status === "ready") {
          setBackendReady(true);
        }
      } catch (error) {
        console.error("Error checking backend status:", error);
        setError("Error checking server status. Please refresh the page.");
      }
    };
    checkBackendStatus();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!backendReady) {
      setError(
        "Sorry, our server is still loading. Please wait a moment and try again."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      const user = response.data.user;
      console.log(user);
      const token = response.data.access_token;
      login(token, user);
      navigate("/profile");

      console.log("Login successful:", response.data);
    } catch (err) {
      setError("Login failed.");
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="authContainer">
      <h2>Sign In</h2>

      <div className="authMessage">
        Don't have an account yet? <Link to="../signup">Sign Up</Link>
      </div>
      <form className="authFormContainer" onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="formButton" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};
export default SignIn;
