import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navContainer">
      <NavLink to="/">Home</NavLink>
      {!currentUser ? (
        <>
          <NavLink to="signup">Sign Up</NavLink>
          <NavLink to="signin">Sign In</NavLink>
        </>
      ) : (
        <>
          <NavLink to="profile">Profile</NavLink>
          <SignOutButton />
        </>
      )}
    </nav>
  );
};
export default NavBar;
