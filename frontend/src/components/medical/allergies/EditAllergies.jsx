import { useState, useEffect } from "react";

const EditAllergies = ({ record, onUpdate, onCancel }) => {
  const [allergen, setAllergen] = useState("");
  const [reaction, setReaction] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (record) {
      setAllergen(record.allergen);
      setReaction(record.reaction);
      setAdditionalNotes(record.additional_notes);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      allergen,
      reaction,
      additional_notes: additionalNotes,
    });
  };

  return (
    <form className="medInfoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={allergen}
        onChange={(e) => setAllergen(e.target.value)}
        required
      />
      <input
        type="text"
        value={reaction}
        onChange={(e) => setReaction(e.target.value)}
        required
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional Notes"
      ></textarea>
      <button className="medInfoButton" type="submit">
        Update
      </button>
      <button className="medInfoButton" type="Button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditAllergies;
