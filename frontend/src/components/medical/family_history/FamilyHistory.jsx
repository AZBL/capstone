import { useEffect, useState } from "react";
import useMedicalData from "../../../hooks/useMedicalData";
import AddFamilyHistory from "./AddFamilyHistory";
import EditFamilyHistory from "./EditFamilyHistory";

const FamilyHistory = () => {
  const {
    data: familyHistories,
    fetchData,
    addData,
    updateData,
    deleteData,
  } = useMedicalData("family-history");
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
      <h3>Family History</h3>
      {isAdding ? (
        <AddFamilyHistory
          onAdd={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : isEditing && currentRecord ? (
        <EditFamilyHistory
          record={currentRecord}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button onClick={() => setIsAdding(true)}>Add Family History</button>
          {familyHistories.length === 0 ? (
            <p>No family history listed</p>
          ) : (
            <ul>
              {familyHistories.map((record) => (
                <li key={record.id}>
                  <p>
                    {record.medical_condition} Relation: {record.relation}{" "}
                  </p>
                  <p>{record.additional_notes}</p>
                  <button onClick={() => handleEdit(record)}>Edit</button>
                  <button onClick={() => handleDelete(record.id)}>
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
export default FamilyHistory;
