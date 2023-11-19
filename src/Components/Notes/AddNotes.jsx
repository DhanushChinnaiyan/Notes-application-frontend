import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./notes.css";
import Base from "../../Base/Base";
import { useCommonContext } from "../../Base/ContextApi/context";

const AddNotes = () => {
    const[loading,setLoading] = useState(false)
    const {addNotes} = useCommonContext()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    setLoading(true)
    addNotes(formData,setLoading)
  };

  return (
    <Base>
    <Box component="form" onSubmit={handleSubmit} className="notesAddingBody">
      <Typography component="h1">Add Your Notes Now</Typography>
      <Typography component="div">
        <TextField
          id="outlined-multiline-flexible"
          label="Title for your notes"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Category"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
      </Typography>
      <TextField
        id="outlined-multiline-static"
        label="Write your notes here..."
        name="notes"
        required
        value={formData.notes}
        onChange={handleChange}
        multiline
        rows={12}
        InputProps={{
          sx: {
            color: "rgb(255, 211, 158)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(137, 71, 163)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(250, 140, 195)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(250, 140, 195)",
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: "rgb(137, 71, 163)",
            "&.Mui-focused": {
              color: "rgb(250, 140, 195)",
            },
          },
        }}
      />

      <Button variant="contained" type="submit" sx={{backgroundColor:"rgb(93, 23, 121)"}}>
      {loading ? (
            <CircularProgress
              size="30px"
              sx={{ color: "rgb(210, 114, 248)" }}
            />
          ) : (
            "SAVE"
          )}
      </Button>
    </Box>
    </Base>
  );
};

export default AddNotes;
