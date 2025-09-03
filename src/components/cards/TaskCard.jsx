
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack , Box} from "@mui/material";


export default function TaskCard() {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
       <Stack>
        <Typography variant="h5" component="div">
          be test tes
        </Typography>
        <Box>

        </Box>

       </Stack>
      
        <Typography variant="body2">
          well meaning and kindly.
          well meaning and kindly.
          well meaning and kindly.    
        </Typography>
      </CardContent>
    </Card>
  );
}
