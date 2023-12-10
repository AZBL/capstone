import { useEffect, useState } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddAllergies from "./AddAllergies";
import EditAllergies from "./EditAllergies";

const Allergies = ({ patientId }) => {
  const {
    data: allergies,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("allergy", patientId);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, [patientId]);

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
    <div className="medInfoWrapper">
      <h3>Allergies</h3>
      {isAdding ? (
        <AddAllergies onAdd={handleAdd} onCancel={() => setIsAdding(false)} />
      ) : isEditing && currentRecord ? (
        <EditAllergies
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button className="medInfoButton" onClick={() => setIsAdding(true)}>
            Add Allergy
          </button>
          {allergies.length === 0 ? (
            <p>No allergies listed</p>
          ) : (
            <ul>
              {allergies.map((allergy) => (
                <li className="medInfoList" key={allergy.id}>
                  <p>{allergy.allergen}</p>
                  <p>Reaction: {allergy.reaction}</p>
                  <p>Additonal Notes: {allergy.additional_notes}</p>
                  <button
                    className="medInfoButton"
                    onClick={() => handleEdit(allergy)}
                  >
                    Edit
                  </button>
                  <button
                    className="medInfoButton"
                    onClick={() => handleDelete(allergy.id)}
                  >
                    Delete
                  </button>
                  <hr />
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
