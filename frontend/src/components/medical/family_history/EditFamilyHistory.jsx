import { useState, useEffect } from "react";

const EditFamilyHistory = ({ record, onUpdate, onCancel }) => {
  const [relation, setRelation] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (record) {
      setRelation(record.relation);
      setMedicalCondition(record.medical_condition);
      setAdditionalNotes(record.additional_notes);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      relation,
      medical_condition: medicalCondition,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form className="medInfoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
      />
      <input
        type="text"
        value={medicalCondition}
        onChange={(e) => setMedicalCondition(e.target.value)}
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      />
      <button className="medInfoButton" type="submit">
        Update
      </button>
      <button className="medInfoButton" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditFamilyHistory;
