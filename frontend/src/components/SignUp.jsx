import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dob, setDob] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        dob: dob,
      });
      login({ user: response.data.user, token: response.data.access_token });
      // remove line below after dev
      console.log("Registration successful:", response.data);
      // navigate("/profile"); ADD THIS
    } catch (err) {
      setError("Registration failed.");
      console.error("Registration error:", err);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSignUp}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
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
      <button className="formButton">Sign Up</button>
      {error && <p className="errorMessage">{error}</p>}
    </form>
  );
};
export default SignUp;
