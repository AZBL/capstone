import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import UserSearch from "../UserSearch";
import MedicalConditions from "./medical_conditions/MedicalConditions";
import Medications from "./medications/Medications";
import Allergies from "./allergies/Allergies";
import SurgicalHistory from "./surgical_history/SurgicalHistory";

const PatientHistory = () => {
  const [patientId, setPatientId] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <>
      {currentUser.role_id === 2 || currentUser.role_id === 3 ? (
        <div>
          <UserSearch onUserSelect={setPatientId} />
          {patientId && (
            <div className="medHistoryContainer">
              <h3>Patient Medical History</h3>
              <div className="medInfoContainer">
                <MedicalConditions patientId={patientId} />
              </div>
              <div className="medInfoContainer">
                <Medications patientId={patientId} />
              </div>
              <div className="medInfoContainer">
                <Allergies patientId={patientId} />
              </div>
              <div className="medInfoContainer">
                <SurgicalHistory patientId={patientId} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>This area is for staff only. </div>
      )}
    </>
  );
};
export default PatientHistory;
