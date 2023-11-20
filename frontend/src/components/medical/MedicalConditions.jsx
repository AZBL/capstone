import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const MedicalConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchMedicalConditions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/medical/medical-problems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicalConditions(response.data.medical_problems);
      } catch (error) {
        console.error("Error getting medical conditions", error);
        setError("Failed to load medical conditions");
      }
      setIsLoading(false);
    };
    fetchMedicalConditions();
  }, [token]);

  return (
    <div>
      <h3>Medical Conditions</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && medicalConditions.length === 0 ? (
        <p>No medical conditions listed.</p>
      ) : (
        <ul>
          {medicalConditions.map((condition) => (
            <li key={condition.id}>
              {condition.name}
              {condition.additional_notes && (
                <p>{condition.additional_notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicalConditions;
