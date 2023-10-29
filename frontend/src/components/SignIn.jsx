import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      // remove line below after dev
      console.log("Login successful:", response.data);
    } catch (err) {
      setError("Login failed.");
      console.error("Login error:", err);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSignIn}>
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
      <button className="formButton">Sign In</button>
    </form>
  );
};
export default SignIn;
