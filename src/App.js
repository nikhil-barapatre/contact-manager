import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import ContactsPage from "./pages/ContactsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalSpinner from "./components/GlobalSpinner/GlobalSpinner";
import ErrorSnackbar from "./components/ErrorSnackbar/ErrorSnackbar";

const queryClient = new QueryClient();

function App() {
    return ( <
        QueryClientProvider client = { queryClient } >
        <
        ThemeProvider theme = { theme } >
        <
        CssBaseline / >
        <
        GlobalSpinner / >
        <
        ErrorSnackbar / >
        <
        BrowserRouter >
        <
        ContactsPage / >
        <
        /BrowserRouter> < /
        ThemeProvider > <
        /QueryClientProvider>
    );
}

export default App;