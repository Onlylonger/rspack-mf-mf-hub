import { useState } from "react";
import { useMenus, type MenuItem } from "./store";
import { useNavigate, useParams } from "react-router";
import { useTabs } from "../tabs/store";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export type NavigationMenuItem = Omit<MenuItem, "children">;

export const NavigationMenu = () => {
  const list = useMenus((state) => state.list);
  const nav = useNavigate();
  const { dynamicRoute: activeKey } = useParams();

  const [colMap, setColMap] = useState(() => {
    const tmp: { [key: string]: boolean } = {};
    list.forEach((v) => {
      if (v.children && Array.isArray(v.children)) {
        tmp[v.id] = true;
      }
    });
    return tmp;
  });

  const handleNavClick = async (v: NavigationMenuItem) => {
    if (v.externalUrl) {
      window.open(v.externalUrl);

      return;
    }

    if (v.url) {
      await nav(v.url);

      useTabs.getState().check({
        id: v.id,
        label: v.label,
        url: v.url,
        peerRouteId: v.peerRouteId,
      });
    }
  };

  return (
    <div>
      <List
        sx={{ width: "100%", minWidth: 180, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {list
          .filter((v) => !v.hidden)
          .map((v) => {
            if (v.children && Array.isArray(v.children)) {
              const groupActive =
                v.children.filter((c) => {
                  return activeKey && c.peerRouteId === activeKey;
                }).length > 0;

              return (
                <List
                  component="div"
                  key={v.id}
                  sx={{ bgcolor: groupActive ? "#eee" : undefined }}
                >
                  <ListItemButton
                    onClick={() => {
                      const tmp = {
                        ...colMap,
                      };
                      tmp[v.id] = !tmp[v.id];
                      setColMap(tmp);
                    }}
                  >
                    {!!v.icon && <ListItemIcon>{v.icon}</ListItemIcon>}
                    <ListItemText primary={v.label} />
                    {colMap[v.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={colMap[v.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {v.children
                        .filter((v) => !v.hidden)
                        .map((v2) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={v2.id}
                              onClick={() => handleNavClick(v2)}
                              selected={
                                !!v2.url && activeKey === v2.peerRouteId
                              }
                            >
                              {!!v2.icon && (
                                <ListItemIcon>{v2.icon}</ListItemIcon>
                              )}
                              <ListItemText primary={v2.label} />
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Collapse>
                </List>
              );
            }
            return (
              <ListItemButton
                key={v.id}
                onClick={() => handleNavClick(v)}
                selected={!!v.url && activeKey === v.peerRouteId}
              >
                {!!v.icon && <ListItemIcon>{v.icon}</ListItemIcon>}

                <ListItemText primary={v.label} />
              </ListItemButton>
            );
          })}
      </List>
    </div>
  );
};
