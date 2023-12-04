import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const SignOutButton = () => {
  const { logout, token } = useAuth();

  const handleSignOut = async () => {
    if (!token) {
      console.error("No token found, user is not logged in");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout successful, response from server:", response.data);
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOutButton;
