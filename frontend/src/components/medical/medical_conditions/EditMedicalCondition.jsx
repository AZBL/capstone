import { useEffect, useState } from "react";

const EditMedicalCondition = ({ onCancel, onUpdate, record }) => {
  const [name, setName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (record) {
      setName(record.name);
      setAdditionalNotes(record.additional_notes);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
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
      />
      <textarea
        type="text"
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditMedicalCondition;
