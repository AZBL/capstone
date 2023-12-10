import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          dob: dob,
        }
      );
      console.log("Registration successful:", response.data);
      const user = response.data.user;
      const token = response.data.access_token;
      login(token, user);
      navigate("/profile");
    } catch (err) {
      setError("Registration failed.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="authContainer">
      <h2>Sign Up</h2>
      <div className="authMessage">
        Signing up for a portal account gives you access to your medical records
        and allows you to send and receive messages from your provider.
      </div>
      <div className="authMessage">
        Already have an account? <Link to="../signin">Sign In </Link>
      </div>
      <form className="authFormContainer" onSubmit={handleSignUp}>
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
    </div>
  );
};
export default SignUp;
