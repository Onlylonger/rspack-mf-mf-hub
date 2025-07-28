const createCacheMap = () => {
  const all = new Map();
  return {
    set(key: any, value: any) {
      return all.set(key, value);
    },
    delete(key: any) {
      return all.delete(key);
    },
    clear() {
      return all.clear();
    },
    has(key: any) {
      return all.has(key);
    },
    getList() {
      return [...all];
    },
  };
};

export const cachedRoute = createCacheMap();
