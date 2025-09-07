import React from "react";
import { Box, Typography } from "@mui/material";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../cards/TaskCard";

const SortableTaskCard = ({ task, handleDeleteTask, handleUpdateTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    marginBottom: "12px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        task={task}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default function DraggableTasksColumn({
  column,
  tasks,
  handleDeleteTask,
  handleUpdateTask,
  tasksSectionStyle,
}) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="h6"
        color="primary"
        fontWeight={700}
        textTransform="capitalize"
        mx={2}
        mt={2}
      >
        {column.replace("_", " ")}
      </Typography>

      <Box sx={tasksSectionStyle}>
        <Box m={2}>
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={rectSortingStrategy}
          >
            {tasks.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No tasks found.
              </Typography>
            ) : (
              tasks.map((task) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                />
              ))
            )}
          </SortableContext>
        </Box>
      </Box>
    </Box>
  );
}
