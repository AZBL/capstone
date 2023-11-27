import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MedicalConditions from "./medical_conditions/MedicalConditions";
import Medications from "./medications/Medications";
import Allergies from "./allergies/Allergies";
import SurgicalHistory from "./surgical_history/SurgicalHistory";
import FamilyHistory from "./family_history/FamilyHistory";

const MedicalHistory = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <div>
        <MedicalConditions />
      </div>
      <div>
        <Medications />
      </div>
      <div>
        <Allergies />
      </div>
      <div>
        <SurgicalHistory />
      </div>
      <div>
        <FamilyHistory />
      </div>
    </div>
  );
};
export default MedicalHistory;
