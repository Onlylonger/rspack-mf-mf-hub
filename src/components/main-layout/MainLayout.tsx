import { Box } from "@mui/material";

import { useCacheOutlet, usePlugin } from "./hooks";
import { Header } from "./Header";
import { MFProvider } from "./mf";
import { useMemo } from "react";

export const MainLayout = () => {
  const { cacheOutlet, freshOutlet } = useCacheOutlet();
  const { initStatus, pluginRef } = usePlugin();

  const value = useMemo(() => {
    return {
      plugin: pluginRef,
    };
  }, [pluginRef]);

  if (!initStatus) {
    return "loading MF...";
  }

  return (
    <>
      <Header />
      <Box component="main" sx={{ padding: "15px" }}>
        <MFProvider val={value}>
          {cacheOutlet}
          {freshOutlet}
        </MFProvider>
        {/* <Outlet /> */}
      </Box>
    </>
  );
};
