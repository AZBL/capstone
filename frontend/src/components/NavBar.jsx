import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navContainer">
        <NavLink to="/">Home</NavLink>
        <NavLink to="signup">Sign Up</NavLink>
        <NavLink to="signin">Sign In</NavLink>
        <NavLink to="profile">Profile</NavLink>
        <button>Sign out</button>
      </nav>
    </>
  );
};
export default NavBar;
