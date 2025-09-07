import { useEffect, useState, useMemo } from "react";
import { Typography, Grid, TextField, Button, Stack } from "@mui/material";
import PopupReusable from "../components/PopUp/PopupReusable";
import TaskForm from "../components/Forms/TaskForm";
import DraggableTasksColumn from "../components/DragAndDrop/DraggableTasksColumn";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useGetTodos } from "../hooks/useGetTodos";
import { toDoTypes } from "../utils/consts";
import { useSnackbar } from "notistack";
import TaskCard from "../components/cards/TaskCard";
import {
  taskPageLayoutStyle,
  searchInputStyle,
  toDoColumnsStyle,
  tasksSectionStyle,
} from "../utils/styleConsts/taskPageStyleConsts";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTask, setActiveTask] = useState(null);

  const { data: tasks, isLoading, isError, error } = useGetTodos();
  const { mutate: deleteTask } = useDeleteTodo();
  const { enqueueSnackbar } = useSnackbar();

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
    deleteTask(taskId, {
      onSuccess: () => handleApiResponse("Task Deleted successfully", "success"),
      onError: () => handleApiResponse("Failed to delete task", "error"),
    });
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleControlPopup = (val) => {
    setIsPopupOpen(val);
    if (!val) setSelectedTask({});
  };

  const handleApiResponse = (massage, variant) => {
    handleControlPopup(false);
    enqueueSnackbar(massage, {
      variant,
    });
  };

  const findContainer = (id) => {
    return Object.keys(searchedTasks).find((column) =>
      searchedTasks[column]?.some((task) => task.id === id)
    );
  };
  const handleDragStart = (event) => {
  const { active } = event;
  const container = findContainer(active.id);
  if (!container) return;

  const task = filteredTasks[container].find((t) => t.id === active.id);
  setActiveTask(task);
};


const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over) return;

  const activeContainer = findContainer(active.id);
  const overContainer = findContainer(over.id) || over.id;

  if (activeContainer === overContainer) {
    setFilteredTasks((prev) => {
      const reordered = arrayMove(
        prev[activeContainer],
        prev[activeContainer].findIndex((t) => t.id === active.id),
        prev[activeContainer].findIndex((t) => t.id === over.id)
      );
      return { ...prev, [activeContainer]: reordered };
    });
  } else {
    setFilteredTasks((prev) => {
      const sourceItems = [...prev[activeContainer]];
      const destItems = [...prev[overContainer]];

      const movedTaskIndex = sourceItems.findIndex((t) => t.id === active.id);
      const [movedTask] = sourceItems.splice(movedTaskIndex, 1);

      const updatedTask = { ...movedTask, column: overContainer };
      const overIndex = destItems.findIndex((t) => t.id === over.id);

      if (overIndex >= 0) {
        destItems.splice(overIndex + 1, 0, updatedTask);
      } else {
        destItems.push(updatedTask);
      }

      return {
        ...prev,
        [activeContainer]: sourceItems,
        [overContainer]: destItems,
      };
    });
  }

  setActiveTask(null);
};


  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Stack sx={taskPageLayoutStyle}>
        {/* Search + Add Task */}
        <Stack
          alignItems="center"
          gap={2}
          direction={{ xs: "column", sm: "row" }}
        >
          <TextField
            sx={searchInputStyle}
            placeholder="Search tasks..."
            size="small"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: { xs: "100%", sm: "140px" } }}
            onClick={() => handleControlPopup(true)}
          >
            Add Task
          </Button>
        </Stack>

        {/* Drag and Drop */}
        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart}  onDragEnd={handleDragEnd}>
          <Grid container spacing={3} mt={2}>
            {toDoTypes.map((column) => (
              <Grid
                size={{ xs: 12, md: 6, lg: 3 }}
                key={column}
                item
                sx={toDoColumnsStyle}
              >
                <DraggableTasksColumn
                  column={column}
                  tasks={searchedTasks[column] || []}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                  tasksSectionStyle={tasksSectionStyle}
                />
              </Grid>
            ))}
          </Grid>
            <DragOverlay>
    {activeTask ? (
      <TaskCard
        task={activeTask}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    ) : null}
  </DragOverlay>
        </DndContext>
      </Stack>

      {/* Popup for Add/Edit Task */}
      <PopupReusable
        open={isPopupOpen}
        title={selectedTask.id ? "Edit Task" : "Add New Task"}
        handleClose={() => handleControlPopup(false)}
      >
        <TaskForm
          handleApiResponse={handleApiResponse}
          selectedTask={selectedTask}
        />
      </PopupReusable>
    </>
  );
};

export default Tasks;
