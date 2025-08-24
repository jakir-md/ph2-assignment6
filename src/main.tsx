import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme.providers.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider  router={router}/>
    </ThemeProvider>
  </StrictMode>
);
