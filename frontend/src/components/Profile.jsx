import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h2>
        Hi {currentUser.first_name} {currentUser.last_name}{" "}
      </h2>
      <Link to="/profile/messages">Go to Messages</Link>
      <Link to="/profile/medical-history">Medical History</Link>
      <Outlet />
    </div>
  );
};
export default Profile;
