import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todosApi";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],   
    queryFn: getTodos, 
    refetchOnWindowFocus: false, 
  });
};
