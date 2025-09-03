import axiosInstance from "./axiosInstance";

export const addTodo = async (newTodo) => {
  const { data } = await axiosInstance.post("/task", newTodo);
  return data;
};

export const getTodos = async () => {
  const { data } = await axiosInstance.get("/task");
  return data;
};
