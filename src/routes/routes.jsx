import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageSettings from "../pages/Settings";
import Layout from "../Layout/layout";
import ProgressPage from "../pages/Progress";

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
        <ProgressPage />
      </Layout>
    ),
  },
]);
