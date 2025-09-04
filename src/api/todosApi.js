import axiosInstance from "./axiosInstance";

export const addTodo = async (newTodo) => {
  const { data } = await axiosInstance.post("/task", newTodo);
  return data;
};

export const getTodos = async () => {
  const { data } = await axiosInstance.get("/task");
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await axiosInstance.delete(`/task/${id}`);
  return data;
};

export const updateTodo = async (updatedTask) => {
  const { data } = await axiosInstance.put(
    `/task/${updatedTask.id}`,
    updatedTask
  );
  return data;
};
