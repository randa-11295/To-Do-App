import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todosApi";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["task"],   
    queryFn: getTodos, 
    refetchOnWindowFocus: false, 
  });
};
