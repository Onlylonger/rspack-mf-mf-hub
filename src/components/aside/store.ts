import { create } from "zustand";

interface State {
  list: MenuItem[];

  concat: (item: MenuItem[]) => void;
  reset: () => void;
}

export interface MenuItem {
  id: string;
  label: string;
  url?: string;
  children?: MenuItem[];
  externalUrl?: string;
  peerRouteId?: string;
  state?: any;
  hidden?: boolean;
  icon?: React.ReactNode;
}

export const useMenus = create<State>()((set, get) => ({
  list: [],

  concat(ary) {
    const { list } = get();
    set({
      list: [...list, ...ary],
    });
  },

  reset() {
    set({
      list: [],
    });
  },
}));
