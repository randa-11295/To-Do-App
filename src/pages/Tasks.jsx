import { useEffect, useState, useMemo } from "react";
import { Typography, Grid, TextField, Button, Box } from "@mui/material";
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

  // 🟢 Group tasks into columns
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

  // 🟢 Filter tasks based on search term (ignoring `id`)
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

  // 🟢 Handle delete task
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  // 🟢 Handle open popup for add/update task
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
      <Box sx={{ backgroundColor: "#f9f9f9", p: 4, minHeight: "100vh" }}>
        {/* 🔍 Search + Add Task */}
        <Grid container spacing={2} mb={3} alignItems="center">
          <Grid item xs={12} md={9}>
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
          <Grid item xs={12} md={3}>
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

        {/* 🟢 Render tasks by columns */}
        <Grid container spacing={2}>
          {toDoTypes.map((column) => (
            <Grid
              key={column}
              item
              xs={12}
              md={3}
              sx={{
                height: "80vh",
                overflowY: "auto",
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                p: 2,
              }}
            >
              {/* Column Title */}
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                textTransform="capitalize"
                mb={2}
              >
                {column.replace("_", " ")}
              </Typography>

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
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🟢 Popup for Add / Edit Task */}
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
