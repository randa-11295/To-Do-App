import axiosInstance from "./axiosInstance";

export const addTodo = async (newTodo) => {
  const { data } = await axiosInstance.post("/task", newTodo);
  return data;
};
