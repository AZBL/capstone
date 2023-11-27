import { useState } from "react";

const AddMedicalCondition = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Medical condition"
        required
      />
      <textarea
        type="text"
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default AddMedicalCondition;
