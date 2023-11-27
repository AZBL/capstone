import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const useMedicalData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/medical/${endpoint}`, {
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
      const response = await axios.post(`/api/medical/${endpoint}`, newData, {
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
      await axios.patch(`/api/medical/${endpoint}/${id}`, updatedData, {
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
    try {
      await axios.delete(`/api/medical/${endpoint}/${id}`, {
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
