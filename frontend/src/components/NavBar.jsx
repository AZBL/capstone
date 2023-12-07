import { NavLink, useLocation } from "react-router-dom";
import SignOutButton from "./auth/SignOutButton";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isHomePage = location.pathname === "/";

  return (
    <header className="grid">
      <h1 className="title">
        <NavLink to="/">PrimeCare</NavLink>
      </h1>

      <nav>
        {!currentUser ? (
          <>
            <div className="dropdown">
              <button className="drop-button">User Portal</button>
              <div className="dropdown-content">
                <NavLink to="signup">Sign Up</NavLink>
                <NavLink to="signin">Sign In</NavLink>
              </div>
            </div>

            <div className="dropdown">
              <button className="drop-button">About</button>
              <div className="dropdown-content">
                {isHomePage ? (
                  <>
                    <a href="#services"> Services</a>
                    <a href="#staff"> Our Team</a>
                    <a href="#contact">Hours and Contact</a>
                  </>
                ) : (
                  <>
                    <NavLink to="/#services"> Services</NavLink>
                    <NavLink to="/#staff"> Our Team</NavLink>
                    <NavLink to="/#contact">Hours and Contact</NavLink>
                  </>
                )}
              </div>
            </div>

            <div>(555)-555-5555</div>
          </>
        ) : (
          <>
            <NavLink to="profile">Profile</NavLink>
            <div className="dropdown">
              <button className="drop-button">About</button>
              <div className="dropdown-content">
                {isHomePage ? (
                  <>
                    <a href="#services"> Services</a>
                    <a href="#staff"> Our Team</a>
                    <a href="#contact">Hours and Contact</a>
                  </>
                ) : (
                  <>
                    <NavLink to="/#services"> Services</NavLink>
                    <NavLink to="/#staff"> Our Team</NavLink>
                    <NavLink to="/#contact">Hours and Contact</NavLink>
                  </>
                )}
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
