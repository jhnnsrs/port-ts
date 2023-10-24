import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],

  server: {
    host: "127.0.0.1",
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/port/index.tsx",
      name: "port",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@apollo/client",
        "@apollo/client/link/ws",
        "@apollo/client/utilities",
        "subscriptions-transport-ws ",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@apollo/client/link/ws": "WebSocketLinkGlobalVar",
          "@apollo/client/utilities": "ApolloClientUtilities",
        },
      },
    },
  },
});
