import { useAuth } from "../contexts/AuthContext";
import { formatDate } from "../utils/formatDate";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Email: {currentUser.email}</p>
          <p>First Name: {currentUser.first_name}</p>
          <p>First Name: {currentUser.first_name}</p>
          <p>Last Name: {currentUser.last_name}</p>
          <p>Date of Birth: {formatDate(currentUser.dob)}</p>
          <p>Patient ID: {currentUser.id}</p>
        </div>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
};
export default Profile;
