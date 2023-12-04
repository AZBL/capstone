import { useState } from "react";

const AddSurgicalHistory = ({ onAdd, onCancel }) => {
  const [surgery, setSurgery] = useState("");
  const [year, setYear] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      surgery_type: surgery,
      year,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form className="medInfoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={surgery}
        onChange={(e) => setSurgery(e.target.value)}
        placeholder="Type of surgery"
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      />
      <button className="medInfoButton" type="submit">
        Submit
      </button>
      <button className="medInfoButton" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default AddSurgicalHistory;
