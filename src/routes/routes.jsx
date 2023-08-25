import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageSettings from "../pages/Settings";
import UserProgress from "../pages/Progress";
import Layout from "../Layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <PageSettings />
      </Layout>
    ),
  },
  {
    path: "/progress",
    element: (
      <Layout>
        <UserProgress />
      </Layout>
    ),
  },
]);
