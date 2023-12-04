import { useState } from "react";

const AddAllergies = ({ onAdd, onCancel }) => {
  const [allergen, setAllergen] = useState("");
  const [reaction, setReaction] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
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
        placeholder="Allergy"
        required
      />
      <input
        type="text"
        value={reaction}
        onChange={(e) => setReaction(e.target.value)}
        placeholder="Reaction"
        required
      />
      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Additional notes"
      ></textarea>
      <button className="medInfoButton" type="submit">Add allergy</button>
      <button  className="medInfoButton" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default AddAllergies;
