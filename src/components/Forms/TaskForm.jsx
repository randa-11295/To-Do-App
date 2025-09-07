import { useFormik } from "formik";
import { MenuItem, Box , Button  } from "@mui/material";
import { useAddTodo } from "../../hooks/useAddTodo";
import { useEffect } from "react";
import { toDoSchema } from "../../validation/todoSchema";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import ReusableTextField from "../Inputs/ReusableTextField";

export default function TaskForm({ selectedTask, handleSelectTask }) {
  const {
    mutate: addTask,
    isPending: isAddingLoading,
    isSuccess,
    isError,
    error,
  } = useAddTodo();

  const {
    mutate: updateTask,
    isPending: isUpdatingLoading,
  } = useUpdateTodo();

  useEffect(() => {
    console.log({ isAddingLoading, isSuccess, isError, error });
  }, [isAddingLoading, isSuccess, isError, error]);

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
      if (!selectedTask.id) {
        addTask(values, {
          onSuccess: () => resetForm(),
        });
      } else {
        updateTask(values, {
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
          error={formik.touched.description && Boolean(formik.errors.description)}
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
