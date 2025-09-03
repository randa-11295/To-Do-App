import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TaskCard from "../components/cards/TaskCard";

const Tasks = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "lightgray", p: 4, height: "100vh" }}
    >
      <Grid
        size={{ xs: 12, md: 2, lg: 3 }}
        sx={{
          px: 1,
          height: "100% ",
          overflowY: "scroll",
        }}
      >
       <Typography variant="h4" color="primary.main" mb={1} fontWeight={700}>
        Tasks
       </Typography>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </Grid>
      <Grid size={{ xs: 12, md: 2, lg: 3 }}>
        <Paper>2</Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 2, lg: 3 }}>
        <Paper>3</Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 2, lg: 3 }}>
        <Paper>4</Paper>
      </Grid>
    </Grid>
  );
};

export default Tasks;
