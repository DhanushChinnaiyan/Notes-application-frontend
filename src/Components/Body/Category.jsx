import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useCommonContext } from "../../Base/ContextApi/context";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Category = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const { commonStates, getselectedCategory } = useCommonContext();
  const categories = commonStates.categories
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
     getselectedCategory(e.target.value);
    console.log(commonStates.categories)

  };
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel
        id="dropdown-label"
        sx={{
          color: "rgb(137, 71, 163)",
          "&.Mui-focused": { color: "purple" },
        }}
      >
        Select Option
      </InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedValue}
        label="Select Option"
        onChange={handleChange}
        sx={{backgroundColor:"rgb(52, 52, 82)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(137, 71, 163)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(210, 114, 248)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple",
          },
        }}
        inputProps={{
          sx: {
            color: "rgb(210, 114, 248)",
          },
        }}
      >
        <MenuItem value="" disabled>
          Select category
        </MenuItem>
        {categories.map((item, idx) => (
          <MenuItem
            key={idx}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
