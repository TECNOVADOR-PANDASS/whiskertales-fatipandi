import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";
import GamePage from "./pages/game";
import CollaborativePage from "./pages/collaborative";
import NotFound from "./pages/not-found";

// Configure application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/game",
    element: <GamePage />
  },
  {
    path: "/collaborative",
    element: <CollaborativePage />
  }
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
