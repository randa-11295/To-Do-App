import { useFormik } from "formik";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { useAddTodo } from "../../hooks/useAddTodo";
import { useEffect } from "react";
import { toDoSchema } from "../../validation/todoSchema";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
export default function TaskForm({ selectedTask, handleSelectTask }) {
  const {
    mutate: addTask,
    isPending,
    isSuccess,
    isError,
    error,
  } = useAddTodo();
  const { mutate: updateTask } = useUpdateTodo();

  useEffect(() => {
    console.log({ isPending, isSuccess, isError, error });
  }, [isPending, isSuccess, isError, error]);

  const formik = useFormik({
    initialValues: selectedTask.id
      ? selectedTask
      : {
          title: "",
          description: "",
          column: "backlog",
        },
    validationSchema: toDoSchema,
    onSubmit: (values, { resetForm }) => {
      {
        !selectedTask.id
          ? addTask(values, {
              onSuccess: () => resetForm(),
            })
          : updateTask(values, {
              onSuccess: () => {
                resetForm();
                handleSelectTask({});
              },
            });
      }
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

\        <Button
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
           {selectedTask.id ? "Update" :"Add"}
        </Button>
      </form>
    </Box>
  );
}
