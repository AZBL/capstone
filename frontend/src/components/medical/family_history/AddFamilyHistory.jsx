import { useState } from "react";

const AddFamilyHistory = ({ onAdd, onCancel }) => {
  const [relation, setRelation] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      relation,
      medical_condition: medicalCondition,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
        placeholder="Relation"
        required
      />
      <input
        type="text"
        value={medicalCondition}
        onChange={(e) => setMedicalCondition(e.target.value)}
        placeholder="Medical Condition"
        required
      />
      <textarea
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
export default AddFamilyHistory;
