import { useTabs } from "./store";
import { Tabs as MTabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { NavigationMenuItem } from "../aside/NavigationMenu";
import { useNavigate, useParams } from "react-router";
import { cachedRoute } from "../main-layout/route-cache";

export const Tabs = () => {
  const { dynamicRoute } = useParams();
  const nav = useNavigate();

  const list = useTabs((state) => state.list);

  if (!list.length) {
    return null;
  }

  const have = list.find((v) => v.peerRouteId === dynamicRoute);

  return (
    <MTabs value={have ? dynamicRoute : false}>
      {list.map((v, i) => {
        return (
          <Tab
            onClick={() => {
              if (v?.id === dynamicRoute) return;
              if (v?.url) {
                nav(v.url, {
                  state: v.state,
                });
              }
            }}
            label={
              <span>
                {v.label}
                <CloseIcon
                  fontSize="small"
                  sx={{
                    position: "relative",
                    // top: "-5px",
                    borderRadius: "50%",
                    ":hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();

                    let next: NavigationMenuItem | undefined;
                    if (i === 0) {
                      // first
                      next = Object.assign({}, list[1]);
                    } else if (i > 0 && i < list.length - 1) {
                      next = Object.assign({}, list[i - 1]);
                      // middle
                    } else {
                      next = Object.assign({}, list[list.length - 2]);
                      // last
                    }

                    if (v?.id) {
                      useTabs.getState().remove(v.id);
                      cachedRoute.delete(v.url);
                    }
                    // When remove tab is equal to current route
                    if (v?.peerRouteId === dynamicRoute) {
                      if (next?.url) {
                        nav(next.url, {
                          state: v.state,
                          replace: true,
                        });
                      } else {
                        nav(".", {
                          replace: true,
                        });
                      }
                    }
                  }}
                />
              </span>
            }
            key={v.id}
            value={v.peerRouteId}
          />
        );
      })}
    </MTabs>
  );
};
