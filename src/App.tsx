import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./components/theme";
import { ToastProvider } from "./components/Toast";
import { Outlet } from "react-router";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Box>
          <Outlet />
        </Box>
      </ToastProvider>
    </ThemeProvider>
  );
};
