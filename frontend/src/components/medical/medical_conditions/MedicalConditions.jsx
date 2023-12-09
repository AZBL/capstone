import { useState, useEffect } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddMedicalCondition from "./AddMedicalCondition";
import EditMedicalCondition from "./EditMedicalCondition";

const MedicalConditions = ({ patientId }) => {
  const {
    data: medicalConditions,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("medical-condition", patientId);
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

  const handleUpdate = async (updatedRecord) => {
    await updateData(currentRecord.id, updatedRecord);
    await fetchData();
    setIsEditing(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
  };

  return (
    <div className="medInfoWrapper">
      <h3>Medical Conditions</h3>
      {isAdding ? (
        <AddMedicalCondition
          onAdd={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : isEditing && currentRecord ? (
        <EditMedicalCondition
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button className="medInfoButton" onClick={() => setIsAdding(true)}>
            Add Medical Condition
          </button>
          {medicalConditions.length === 0 ? (
            <p>No medical conditions listed</p>
          ) : (
            <ul>
              {medicalConditions.map((medicalCondition) => (
                <li className="medInfoList" key={medicalCondition.id}>
                  <p>{medicalCondition.name}</p>

                  <p className="additionalNotes">
                    Additonal Notes: {medicalCondition.additional_notes}
                  </p>

                  <button
                    className="medInfoButton"
                    onClick={() => handleEdit(medicalCondition)}
                  >
                    Edit
                  </button>
                  <button
                    className="medInfoButton"
                    onClick={() => handleDelete(medicalCondition.id)}
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
export default MedicalConditions;
