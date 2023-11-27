import { useState, useEffect } from "react";

const EditSurgicalHistory = ({ record, onUpdate, onCancel }) => {
  const [surgery, setSurgery] = useState("");
  const [year, setYear] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (record) {
      setSurgery(record.surgery);
      setYear(record.year);
      setAdditionalNotes(record.additionalNotes);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      surgery_type: surgery,
      year,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={surgery}
        onChange={(e) => setSurgery(e.target.value)}
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditSurgicalHistory;
