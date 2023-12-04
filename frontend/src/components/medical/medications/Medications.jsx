import { useState, useEffect } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddMedication from "./AddMedication";
import EditMedication from "./EditMedication";

const Medications = () => {
  const {
    data: medicationData,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("medication");

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
      <h3>Medications</h3>
      {isAdding ? (
        <AddMedication onAdd={handleAdd} onCancel={() => setIsAdding(false)} />
      ) : isEditing && currentRecord ? (
        <EditMedication
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button className="medInfoButton" onClick={() => setIsAdding(true)}>
            Add medication
          </button>
          {medicationData.length === 0 ? (
            <p>No medications listed</p>
          ) : (
            <ul>
              {medicationData.map((med) => (
                <li className="medInfoList" key={med.id}>
                  <p>{med.name}</p>
                  <p>{med.dosage}</p>
                  <p>{med.frequency}</p>
                  <p>Additonal Notes: {med.additional_notes}</p>
                  <button
                    className="medInfoButton"
                    onClick={() => handleEdit(med)}
                  >
                    Edit
                  </button>
                  <button
                    className="medInfoButton"
                    onClick={() => handleDelete(med.id)}
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
export default Medications;
