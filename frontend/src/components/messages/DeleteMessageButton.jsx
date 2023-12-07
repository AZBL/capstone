import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteMessageButton = ({ messageId, onMessageDeleted }) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (isConfirmed) {
      try {
        console.log(messageId);
        await axios.delete(`/api/messages/${messageId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Message deleted");
        onMessageDeleted();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <button className="deleteMessageButton" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
};

export default DeleteMessageButton;
