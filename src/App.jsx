import "./App.css";
import Tasks from "./pages/Tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Tasks />
      </QueryClientProvider>
    </>
  );
}

export default App;
