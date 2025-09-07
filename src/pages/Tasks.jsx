import { useEffect, useState, useMemo } from "react";
import { Typography, Grid, TextField, Button, Box, Stack } from "@mui/material";
import TaskCard from "../components/cards/TaskCard";
import PopupReusable from "../components/PopUp/PopupReusable";
import TaskForm from "../components/Forms/TaskForm";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useGetTodos } from "../hooks/useGetTodos";
import { toDoTypes } from "../utils/consts";
const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: tasks, isLoading, isError, error } = useGetTodos();
  const { mutate: deleteTask } = useDeleteTodo();

  useEffect(() => {
    if (!tasks) return;
    const grouped = {
      backlog: [],
      in_progress: [],
      review: [],
      done: [],
      other: [],
    };

    for (const task of tasks) {
      if (grouped[task.column]) {
        grouped[task.column].push(task);
      } else {
        grouped.other.push(task);
      }
    }
    setFilteredTasks(grouped);
  }, [tasks]);

  const searchedTasks = useMemo(() => {
    if (!searchTerm) return filteredTasks;

    const lowerSearch = searchTerm.toLowerCase();
    const newGrouped = {};

    for (const column of toDoTypes) {
      newGrouped[column] = filteredTasks[column]?.filter((task) => {
        return Object.keys(task).some(
          (key) =>
            key !== "id" &&
            String(task[key]).toLowerCase().includes(lowerSearch)
        );
      });
    }
    return newGrouped;
  }, [searchTerm, filteredTasks]);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleControlPopup = (val) => {
    setIsPopupOpen(val);
    if (!val) setSelectedTask({});
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Stack
        sx={{
          backgroundColor: "#f9f9f9",
          p: 4,
          height: {md: "100vh"},
          overflow: {md:"hidden"},
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              placeholder="Search tasks..."
              size="small"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleControlPopup(true)}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
          {toDoTypes.map((column) => (
            <Grid
              size={{ xs: 12, md: 6, lg: 3 }}
              key={column}
              item
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                textTransform="capitalize"
               mx={2} mt={2}
              >
                {column.replace("_", " ")}
              </Typography>
              <Box sx={{ height:{ md: "80vh"}, overflow:"auto" ,}}>
                <Box m={2}>

                {/* If no tasks */}
                {searchedTasks[column]?.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No tasks found.
                  </Typography>
                ) : (
                  searchedTasks[column]?.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      handleDeleteTask={handleDeleteTask}
                      handleUpdateTask={handleUpdateTask}
                    />
                  ))
                )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <PopupReusable
        open={isPopupOpen}
        title={selectedTask.id ? "Edit Task" : "Add New Task"}
        handleClose={() => handleControlPopup(false)}
      >
        <TaskForm
          selectedTask={selectedTask}
          handleSelectTask={setSelectedTask}
        />
      </PopupReusable>
    </>
  );
};

export default Tasks;
