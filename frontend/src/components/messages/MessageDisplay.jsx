import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import DeleteMessageButton from "./DeleteMessageButton";

const MessageDisplay = ({ messages, onDeleteMessage }) => {
  return (
    <div className="messageDisplayWrapper">
      <div className="gridContainer">
        <div className="gridHeader">From:</div>
        <div className="gridHeader">Subject:</div>
        <div className="gridHeader">Date:</div>
        <div className="gridHeader">Delete:</div>

        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div className="gridRow" key={message.id}>
              <div className="gridCell">
                <Link to={`/profile/message/${message.id}`}>
                  {message.sender_first_name} {message.sender_last_name}
                </Link>
              </div>
              <div className="gridCell">
                <Link to={`/profile/message/${message.id}`}>
                  {message.subject}
                </Link>
              </div>
              <div className="gridCell">{formatDate(message.timestamp)}</div>
              <div className="gridCell">
                <DeleteMessageButton
                  messageId={message.id}
                  onMessageDeleted={() => onDeleteMessage(message.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <>
            <h4 className="noMessages">No Messages</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageDisplay;
