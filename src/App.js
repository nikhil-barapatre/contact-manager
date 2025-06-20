import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme/theme";
import ContactsPage from "./pages/ContactsPage";

const queryClient = new QueryClient();

function App() {
    return ( <
        QueryClientProvider client = { queryClient } >
        <
        ThemeProvider theme = { theme } >
        <
        CssBaseline / >
        <
        BrowserRouter >
        <
        ContactsPage / >
        <
        /BrowserRouter>{" "} <
        /ThemeProvider>{" "} <
        /QueryClientProvider>
    );
}

export default App;