import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskCard from "../components/cards/TaskCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PopupReusable from "../components/PopUp/PopupReusable";
import TaskForm from "../components/Forms/TaskForm";
import { useDeleteTodo } from "../hooks/useDeleteTodo ";
import { useGetTodos } from "../hooks/useGetTodos";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useEffect, useState } from "react";
import { toDoTypes } from "../utils/consts";

const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { data: tasks, isLoading, isError, error } = useGetTodos();
  const { mutate: deleteTask } = useDeleteTodo();
  const { mutate: updateTask } = useUpdateTodo();

  useEffect(() => {
    if (!tasks) return;
    const groupedTasks = {
      backlog: [],
      in_progress: [],
      review: [],
      done: [],
      other: [],
    };

    for (const task of tasks) {
      if (groupedTasks[task.column]) {
        groupedTasks[task.column].push(task);
      } else {
        groupedTasks.other.push(task);
      }
    }
    setFilteredTasks(groupedTasks);
  }, [tasks]);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    updateTask({ id: taskId, updatedTask });
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: "lightgray", p: 4, height: "100vh" }}
      >
        <Grid size={12} px={1}>
          <TextField
            sx={{
              backgroundColor: "white",
              overflow: "hidden",
              borderRadius: 1,
            }}
            id="outlined-basic"
            placeholder="Search"
            size="small"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained">Add Task</Button>
        </Grid>

        {toDoTypes.map((column) => (
          <Grid
            key={column}
            size={{ xs: 12, md: 2, lg: 3 }}
            sx={{
              px: 1,
              height: "100% ",
              overflowY: "scroll",
            }}
          >
            <Typography
              variant="h4"
              color="primary.main"
              mb={1}
              fontWeight={700}
            >
              {column.replace("_", " ").toLocaleLowerCase()}
            </Typography>
            {filteredTasks[column]?.map((task) => (
              <TaskCard
                key={task.id + task.title}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            ))}
          </Grid>
        ))}
      </Grid>

      <PopupReusable>
        <TaskForm />
      </PopupReusable>
    </>
  );
};

export default Tasks;
