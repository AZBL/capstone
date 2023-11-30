import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserSearch from "./UserSearch";

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
    <div className="profileContainer">
      {currentUser.role_id === 1 ? (
        <div className="patientProfileContainer">
          <h2>
            Hi {currentUser.first_name} {currentUser.last_name}
          </h2>
          <div className="profileLinks">
            <Link to="/profile/messages" className="profileLink messagesLink">
              Messages
            </Link>
            <Link
              to="/profile/medical-history"
              className="profileLink medicalHistoryLink"
            >
              Medical History
            </Link>
          </div>

          <Outlet />
        </div>
      ) : (
        <div>
          <h2>
            Hi {currentUser.first_name} {currentUser.last_name}
          </h2>
          <Link to="/profile/messages" className="profileLink">
            Messages
          </Link>
          {/* <UserSearch /> */}
          <p>Implement user search function here?</p>
          <Outlet />
        </div>
      )}
    </div>
  );
};
export default Profile;
