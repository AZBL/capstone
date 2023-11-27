import { useEffect, useState } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddAllergies from "./AddAllergies";
import EditAllergies from "./EditAllergies";

const Allergies = () => {
  const {
    data: allergies,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("allergy");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (newRecord) => {
    await addData(newRecord);
    await fetchData();
    setIsAdding(false);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsEditing(true);
  };

  const handleUpdate = async (updateRecord) => {
    await updateData(currentRecord.id, updateRecord);
    await fetchData();
    setIsEditing(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
  };

  return (
    <div>
      <h3>Allergies</h3>
      {isAdding ? (
        <AddAllergies 
          onAdd={handleAdd} 
          onCancel={() => setIsAdding(false)} 
        />
      ) : isEditing && currentRecord ? (
        <EditAllergies
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button onClick={() => setIsAdding(true)}>Add Allergy</button>
          {allergies.length === 0 ? (
            <p>No allergies listed</p>
          ) : (
            <ul>
              {allergies.map((allergy) => (
                <li key={allergy.id}>
                  <p>
                    {allergy.allergen} Reaction: {allergy.reaction}
                  </p>
                  <p>{allergy.additional_notes}</p>
                  <button onClick={() => handleEdit(allergy)}>Edit</button>
                  <button onClick={() => handleDelete(allergy.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
export default Allergies;
