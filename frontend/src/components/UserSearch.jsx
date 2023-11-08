import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

const UserSearch = ({ setRecipient }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    let active = true;

    if (searchTerm && searchTerm.length > 1 && open) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get(`/users/search?q=${searchTerm}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (active) {
            setOptions(response.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }, 500);
      return () => {
        active = false;
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm, open, token]);

  return (
    <Autocomplete
      id="user-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      // isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
      options={options}
      loading={open && options.length === 0}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      onChange={(event, newValue) => {
        console.log("Selected user:", newValue);
        console.log("Selected user ID:", newValue.id);

        setRecipient(newValue ? Number(newValue.id) : null);

        // setRecipient(newValue ? newValue.id : null);
      }}
      renderInput={(params) => (
        <TextField
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
