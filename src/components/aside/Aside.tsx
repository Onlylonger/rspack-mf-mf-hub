import { Box, Button, Drawer, Tooltip } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import ExtensionIcon from "@mui/icons-material/Extension";
import { NavigationMenu } from "./NavigationMenu";
import { useTabs } from "../tabs/store";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMenus } from "./store";
import { cachedRoute } from "../main-layout/route-cache";

export const Aside = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nav = useNavigate();
  const params = useParams();
  const { lab, hosp } = params;

  const handleLogout = () => {
    localStorage.removeItem("token");
    useTabs.getState().reset();
    useMenus.getState().reset();
    cachedRoute.clear();
    nav("/login");
  };

  return (
    <>
      <Box
        component="aside"
        sx={{
          flexShrink: 0,
          width: "60px",
          bgcolor: "primary.main",
          height: "100svh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          position: "relative",
          paddingTop: "10px",
        }}
      >
        {!!lab && !!hosp && (
          <>
            <Tooltip title="Find more menu" placement="right" arrow>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <AppsIcon />
              </Button>
            </Tooltip>
          </>
        )}

        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Tooltip title="Plugin List" placement="right" arrow>
            <Button
              variant="outlined"
              sx={{
                color: "white",
              }}
              onClick={() => nav("/")}
            >
              <ExtensionIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Log out" placement="right" arrow>
            <Button
              variant="outlined"
              sx={{
                color: "white",
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="temporary"
      >
        <NavigationMenu />
      </Drawer>
    </>
  );
};
