import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MedicalConditions from "./MedicalConditions";
import Medications from "./Medications";
import Allergies from "./Allergies";
import SurgicalHistory from "./SurgicalHistory";
import FamilyHistory from "./FamilyHistory";

const MedicalHistory = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect;

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
