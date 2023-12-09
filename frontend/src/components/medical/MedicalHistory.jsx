import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MedicalConditions from "./medical_conditions/MedicalConditions";
import Medications from "./medications/Medications";
import Allergies from "./allergies/Allergies";
import SurgicalHistory from "./surgical_history/SurgicalHistory";

const MedicalHistory = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }
    console.log(currentUser.role_id);
  }, [currentUser, navigate]);

  return (
    <div>
      {currentUser.role_id === 1 ? (
        <div className="medHistoryContainer">
          <h3>{currentUser.first_name}'s Medical History</h3>
          <div className="medInfoContainer">
            <MedicalConditions />
          </div>
          <div className="medInfoContainer">
            <Medications />
          </div>
          <div className="medInfoContainer">
            <Allergies />
          </div>
          <div className="medInfoContainer">
            <SurgicalHistory />
          </div>
        </div>
      ) : (
        <div>This area is for patient's only</div>
      )}
    </div>
  );
};
export default MedicalHistory;
