import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Box } from "@mui/material";

export default function TaskCard({ task }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Box></Box>
        </Stack>

        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
    </Card>
  );
}
