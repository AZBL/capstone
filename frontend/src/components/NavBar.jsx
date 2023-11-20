import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <header className="grid">
      <h1 className="title">
        <NavLink to="/">ZB Medical</NavLink>
      </h1>

      <nav>
        {!currentUser ? (
          <>
            <div className="dropdown">
              <button className="drop-button">Patient Portal</button>
              <div className="dropdown-content">
                <NavLink to="signup">Sign Up</NavLink>
                <NavLink to="signin">Sign In</NavLink>
              </div>
            </div>

            <div className="dropdown">
              <button className="drop-button">About</button>
              <div className="dropdown-content">
                <NavLink> Services</NavLink>
                <NavLink> Our Team</NavLink>
                <NavLink>Hours and Contact</NavLink>
              </div>
            </div>

            <div>(555)-555-5555</div>
          </>
        ) : (
          <>
            <NavLink to="profile">Profile</NavLink>
            <NavLink to="profile/messages">Messages</NavLink>
            <div className="dropdown">
              <button className="drop-button">About</button>
              <div className="dropdown-content">
                <NavLink> Services</NavLink>
                <NavLink> Our Team</NavLink>
                <NavLink>Hours and Contact</NavLink>
              </div>
            </div>
            <div>(555)-555-5555</div>
            <SignOutButton />
          </>
        )}
      </nav>
    </header>
  );
};
export default NavBar;
