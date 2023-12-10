import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { TextField, Autocomplete } from "@mui/material";
import { formatDate } from "../utils/formatDate";

const UserSearch = ({ onUserSelect }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    let active = true;

    if (searchTerm && searchTerm.length > 1 && open) {
      setIsLoading(true);
      const timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/search?q=${searchTerm}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (active) {
            setOptions(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error getting users:", error);
          setIsLoading(false);
        }
      }, 500);
      return () => {
        active = false;
        clearTimeout(timeoutId);
      };
    } else {
      setIsLoading(false);
    }
  }, [searchTerm, open, token]);

  const noOptionsText = () => {
    if (!isLoading && searchTerm.length > 1 && options.length === 0) {
      return "No users found";
    } else if (searchTerm.length === 0) {
      return "Type to search";
    }
    return null;
  };

  return (
    <Autocomplete
      className="autoComplete"
      id="user-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) =>
        `Name: ${option.first_name} ${option.last_name} DOB: ${formatDate(
          option.dob
        )}, User ID: ${option.user_id}`
      }
      options={options}
      loading={isLoading}
      noOptionsText={noOptionsText()}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      onChange={(event, newValue) => {
        console.log("Selected user:", newValue);
        onUserSelect(newValue ? newValue.id : null);
        console.log("Selected user:", newValue);
      }}
      renderInput={(params) => (
        <TextField
          className="userSearch"
          {...params}
          label="Search users"
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
};

export default UserSearch;
