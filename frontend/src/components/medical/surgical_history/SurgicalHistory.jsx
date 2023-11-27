import { useEffect, useState } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddSurgicalHistory from "./AddSurgicalHistory";
import EditSurgicalHistory from "./EditSurgicalHistory";

const SurgicalHistory = () => {
  const {
    data: surgeries,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("surgery");
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
    <div>
      <h3>Surgical History</h3>
      {isAdding ? (
        <AddSurgicalHistory
          onAdd={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : isEditing && currentRecord ? (
        <EditSurgicalHistory
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button onClick={() => setIsAdding(true)}>
            Add Surgical History
          </button>
          {surgeries.length === 0 ? (
            <p>No surgical history listed</p>
          ) : (
            <ul>
              {surgeries.map((surgery) => (
                <li key={surgery.id}>
                  <p>{surgery.surgery_type}</p>
                  <p>{surgery.year}</p>
                  <p>{surgery.additional_notes}</p>
                  <button onClick={() => handleEdit(surgery)}>Edit</button>
                  <button onClick={() => handleDelete(surgery.id)}>
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
export default SurgicalHistory;
