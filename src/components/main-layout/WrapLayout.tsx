import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router";

import { Aside } from "../aside/Aside";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/api";
import { GlobalProvider, type GlobalInfo } from "./global";

export const WrapLayout = () => {
  const [global, setGlobal] = useState<GlobalInfo | null>(null);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getUserInfo().then((res) => {
      setGlobal(res.data as GlobalInfo);
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <GlobalProvider val={global}>
        <Aside />
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </GlobalProvider>
    </Box>
  );
};
