import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { NavigationMenuItem } from "../aside/NavigationMenu";

interface State {
  list: NavigationMenuItem[];

  check: (item: NavigationMenuItem) => void;
  remove: (id: string) => void;
  reset: () => void;
}

export const useTabs = create<State>()(
  persist(
    (set, get) => ({
      list: [],

      check(item) {
        const { id } = item;
        const { list } = get();
        if (list.filter((v) => v.id === id).length > 0) {
          return;
        } else {
          set({
            list: [...list, item],
          });
        }
      },

      remove(id) {
        const { list } = get();
        const index = list.findIndex((v) => v.id === id);
        if (index > -1) {
          const tmp = [...list];
          tmp.splice(index, 1);
          set({
            list: tmp,
          });
        }
      },

      reset() {
        set({
          list: [],
        });
      },
    }),
    {
      name: "nav",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
