import { Box } from "@mui/material";
import { useGlobal } from "../components/main-layout/global";

export const DashboardPage = () => {
  const val = useGlobal();
  return (
    <Box>
      Welcome {val?.userName} - {val?.userId} - {val?.roles}!
    </Box>
  );
};
