import React, { useEffect, useState } from "react";
import axios from "axios";

const WakeUp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const totalAttempts = 3;
    let attempt = 0;
    const interval = 5000;

    const wakeUpBackend = async () => {
      console.log(
        `Attempting to wake up the backend. Attempt number: ${attempt + 1}`
      );

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wakeup`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error waking up the backend:", error);
      }

      if (attempt < totalAttempts - 1) {
        setTimeout(wakeUpBackend, interval);
        attempt++;
      } else {
        setIsLoading(false);
      }
    };

    wakeUpBackend();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="loader"></div>
        <p className="wakeUpMessage">
          Please be patient while the server loads before attempting to sign in
          or create an account. Feel free to browse the rest of the site in the
          meantime!
        </p>
      </div>
    );
  }

  return null;
};
export default WakeUp;
