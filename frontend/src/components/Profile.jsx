import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
// import UserSearch from "./UserSearch";

const Profile = () => {
  // const [recipient, setRecipient] = useState("");
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
          <div>Date of Birth: {formatDate(currentUser.dob)}</div>
          <div>Email: {currentUser.email}</div>
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

          <Link to="/profile/patient-history">Patient Info</Link>
          {/* <UserSearch setRecipient={setRecipient} />
          {recipient && <p>Selected Recipient ID: {recipient}</p>} */}
          <Outlet />
        </div>
      )}
    </div>
  );
};
export default Profile;
