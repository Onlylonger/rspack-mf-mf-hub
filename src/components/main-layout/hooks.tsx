import {
  useMatches,
  useNavigate,
  useOutlet,
  useParams,
  type NavigateOptions,
  type UIMatch,
} from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMenus } from "../aside/store";
import type { To } from "react-router";
import { loadRemote } from "@module-federation/enhanced/runtime";
import { useTabs } from "../tabs/store";
import { cachedRoute } from "./route-cache";
import { Activity } from "@shilong/react";

export const useCurMatch = () => {
  const match = useMatches() as UIMatch<unknown, { menuKey?: string }>[];
  const curMatch = match[match.length - 1];

  return curMatch;
};

export const useCacheOutlet = () => {
  const outlet = useOutlet();
  const curMatch = useCurMatch();

  if (
    Object.keys(curMatch.params).includes("dynamicRoute") &&
    !cachedRoute.has(curMatch.pathname)
  ) {
    cachedRoute.set(curMatch.pathname, outlet);
  }

  return useMemo(
    () => ({
      cacheOutlet: cachedRoute.getList().map(([pathname, value]) => {
        return (
          <Activity
            key={pathname}
            mode={pathname === curMatch.pathname ? "visible" : "hidden"}
          >
            {value}
          </Activity>
        );
      }),
      freshOutlet: cachedRoute.has(curMatch.pathname) ? null : outlet,
    }),
    [outlet]
  );
};

export const usePrefixNav = () => {
  const { lab, hosp, dynamicRoute } = useParams();
  const nav = useNavigate();

  return useMemo(() => {
    const prefix = `/new/${lab}/${hosp}`;
    return {
      prefix,
      nav: (path: To, options?: NavigateOptions) => {
        return nav(`${prefix}/${path}`, options);
      },
      getComposeUrl(path: string) {
        return `${prefix}/${path}`;
      },
    };
  }, [lab, hosp, dynamicRoute, nav]);
};

export const usePlugin = () => {
  const [loadStatus, setLoadStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);
  const [initStatus, setInitStatus] = useState(false);
  const pluginRef = useRef(new Map());
  const { getComposeUrl, nav, prefix } = usePrefixNav();
  const ctxRef = useRef<any>(null);

  ctxRef.current = {
    getComposeUrl,
    nav(path: To, options?: NavigateOptions) {
      const getItem = () => {
        const menuList = useMenus.getState().list;
        for (const item of menuList) {
          if (item.children && item.children.length > 0) {
            for (const subItem of item.children) {
              if (subItem.peerRouteId === path) {
                return subItem;
              }
            }
          }
          if (item.peerRouteId === path) {
            return item;
          }
        }
      };
      const item = getItem();
      if (item) {
        useTabs.getState().check({
          ...item,
          state: options?.state ?? undefined,
        });
      }
      return nav(path, options);
    },
    close(id: string) {
      const item = useTabs.getState().list.find((v) => v.peerRouteId === id);
      item && useTabs.getState().remove(item.id);
      cachedRoute.delete(getComposeUrl(id));
    },
    prefix,
  };

  useEffect(() => {
    let flag = false;
    setLoadStatus("pending");

    loadRemote("plugin_a/Manifest")
      .then((res: any) => {
        if (!flag) {
          setInitStatus(false);
          setLoadStatus("success");

          const { createRoutes, createMenus } = res.default(ctxRef.current);
          const routes = createRoutes?.();
          pluginRef.current = new Map(Object.entries(routes));
          const menus = createMenus?.().map((v: any) => {
            if (v.children && v.children.length > 0) {
              v.children = v.children.map((v2: any) => {
                return {
                  ...v2,
                  url: v2.peerRouteId
                    ? getComposeUrl(v2.peerRouteId)
                    : undefined,
                };
              });
            }
            return {
              ...v,
              url: v.peerRouteId ? getComposeUrl(v.peerRouteId) : undefined,
            };
          });
          useMenus.getState().concat(menus);

          setInitStatus(true);
        }
      })
      .catch((_) => {
        console.log(_);
        setLoadStatus("error");
      });

    return () => {
      flag = true;
    };
  }, [ctxRef]);

  return { loadStatus, initStatus, pluginRef };
};
