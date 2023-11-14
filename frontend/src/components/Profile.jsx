import { useAuth } from "../contexts/AuthContext";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <>
          <div>
            <p>Email: {currentUser.email}</p>
            <p>First Name: {currentUser.first_name}</p>
            <p>Last Name: {currentUser.last_name}</p>
            <p>Date of Birth: {formatDate(currentUser.dob)}</p>
            <p>User ID: {currentUser.user_id}</p>
          </div>
          <Link to="/messages">Go to Messages</Link>
        </>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
};
export default Profile;
