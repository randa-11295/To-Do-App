import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";
import IconBtn from "../Inputs/IconBtn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TaskCard({ task, handleDeleteTask, handleUpdateTask }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={1}
          alignItems="flex-start"
        >
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Box>
            <IconBtn title="Edit" handleClick={() => handleUpdateTask(task)}>
              <EditIcon sx={{ fontSize: "18px" }} />
            </IconBtn>
            <IconBtn
              color="error"
              title="Delete"
              handleClick={() => handleDeleteTask(task.id)}
            >
              <DeleteIcon sx={{ fontSize: "18px" }} />
            </IconBtn>
          </Box>
        </Stack>

        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
    </Card>
  );
}
