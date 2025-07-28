import { registerRemotes } from "@module-federation/enhanced/runtime";

const isDev = process.env.NODE_ENV === "development";

registerRemotes([
  {
    name: "plugin_a",
    entry:
      isDev || sessionStorage.getItem("debug")
        ? "http://localhost:3001/mf-manifest.json"
        : "https://onlylonger.github.io/rspack-mf-mf-plugin/mf-manifest.json",
  },
]);
