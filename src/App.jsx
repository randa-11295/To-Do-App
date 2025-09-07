import "./App.css";
import Tasks from "./pages/Tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Tasks />
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
