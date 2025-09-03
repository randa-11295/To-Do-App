import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/todosApi";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
  });
};
