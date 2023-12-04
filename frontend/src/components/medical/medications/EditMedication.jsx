import { useState, useEffect } from "react";

const EditMedication = ({ record, onUpdate, onCancel }) => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (record) {
      setName(record.name);
      setDosage(record.dosage);
      setFrequency(record.frequency);
      setAdditionalNotes(record.additional_notes);
    }
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate({
      name,
      dosage,
      frequency,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form className="medInfoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Medication Name"
      />
      <input
        type="text"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="Dosage"
      />
      <input
        type="text"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frequency"
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      />
      <button className="medInfoButton" type="submit">
        Update Medication
      </button>
      <button className="medInfoButton" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditMedication;
