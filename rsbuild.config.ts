import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  html: {
    title: "Hub",
  },
  output: {
    // 请将 <REPO_NAME> 替换为仓库的名称。
    // 比如 "/my-project/"
    assetPrefix: "https://onlylonger.github.io/rspack-mf-mf-hub/",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "hub",
      shared: {
        "@emotion/react": {
          singleton: true,
        },
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        "react-router": {
          singleton: true,
        },
      },
    }),
  ],
});
