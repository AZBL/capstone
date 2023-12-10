import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const useMedicalData = (endpoint, patientId = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const url = patientId
        ? `${
            import.meta.env.VITE_API_URL
          }/api/medical/${endpoint}?patient_id=${patientId}`
        : `${import.meta.env.VITE_API_URL}/api/medical/${endpoint}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data[endpoint]);
    } catch (error) {
      setError(error.message);
    }
  };

  const addData = async (newData) => {
    try {
      const url = patientId
        ? `${
            import.meta.env.VITE_API_URL
          }/api/medical/${endpoint}?patient_id=${patientId}`
        : `${import.meta.env.VITE_API_URL}/api/medical/${endpoint}`;

      const response = await axios.post(url, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      const url = patientId
        ? `${
            import.meta.env.VITE_API_URL
          }/api/medical/${endpoint}/${id}?patient_id=${patientId}`
        : `${import.meta.env.VITE_API_URL}/api/medical/${endpoint}/${id}`;

      await axios.patch(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => {
        prevData.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteData = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const url = patientId
        ? `${
            import.meta.env.VITE_API_URL
          }/api/medical/${endpoint}/${id}?patient_id=${patientId}`
        : `${import.meta.env.VITE_API_URL}/api/medical/${endpoint}/${id}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return { data, error, fetchData, addData, updateData, deleteData };
};

export default useMedicalData;
