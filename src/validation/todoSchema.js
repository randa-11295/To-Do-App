import * as Yup from "yup";


export const toDoSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  column: Yup.string().required("Column is required"),
});