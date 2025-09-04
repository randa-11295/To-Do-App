import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todosApi";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
  });
};
