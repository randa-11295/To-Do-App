import { useFormik } from "formik";
import { MenuItem, Box, Button } from "@mui/material";
import { useAddTodo } from "../../hooks/useAddTodo";
import { toDoSchema } from "../../validation/todoSchema";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import ReusableTextField from "../Inputs/ReusableTextField";

export default function TaskForm({ selectedTask, flowUpCallThaAPI }) {

  const { mutate: addTask, isPending: isAddingLoading } = useAddTodo();
  const { mutate: updateTask, isPending: isUpdatingLoading } = useUpdateTodo();

  const formik = useFormik({
    initialValues: selectedTask.id
      ? selectedTask
      : {
          title: "",
          description: "",
          column: "backlog",
        },
    validationSchema: toDoSchema,
    onSubmit: (values) => {
      if (!selectedTask.id) {
        addTask(values, {
          onSuccess: () =>
            flowUpCallThaAPI("Task added successfully", "success"),
          onError: () => flowUpCallThaAPI("Failed to add task", "error"),
        });
      } else {
        updateTask(values, {
          onSuccess: () =>
            flowUpCallThaAPI("Task updated successfully", "success"),
          onError: () => flowUpCallThaAPI("Failed to Update task", "error"),
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
        <ReusableTextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <ReusableTextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          multiline
          rows={3}
        />

        <ReusableTextField
          select
          label="Column"
          name="column"
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
        </ReusableTextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          loading={isAddingLoading || isUpdatingLoading}
        >
          {selectedTask.id ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
}
