import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";

// Validation Schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  column: Yup.string().required("Column is required"),
});

export default function TaskForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      column: "backlog",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      alert("Task added successfully!");
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          variant="outlined"
          margin="normal"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        {/* Description Input */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        {/* Column Select */}
        <TextField
          select
          fullWidth
          label="Column"
          name="column"
          variant="outlined"
          margin="normal"
          value={formik.values.column}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.column && Boolean(formik.errors.column)}
          helperText={formik.touched.column && formik.errors.column}
        >
          <MenuItem value="backlog">Backlog</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: "bold",
            borderRadius: "12px",
          }}
        >
          Add Task
        </Button>
      </form>
    </Box>
  );
}
