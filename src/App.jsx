import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import Lessons from "./pages/Lessons.jsx";
import LessonDetail from "./pages/LessonDetail.jsx";
import Concepts from "./pages/Concepts.jsx";
import Lab from "./pages/Lab.jsx";
import APILab from "./pages/APILab.jsx";
import UploadLab from "./pages/UploadLab.jsx";
import Login from "./pages/Login.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "lessons",
        element: <Lessons />,
      },
      {
        path: "lessons/:id",
        element: <LessonDetail />,
      },
      {
        path: "concepts",
        element: <Concepts />,
      },
      {
        path: "lab",
        element: <Lab />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "api-lab",
        element: (
          <ProtectedRoute>
            <APILab />
          </ProtectedRoute>
        ),
      },
      {
        path: "upload-lab",
        element: (
          <ProtectedRoute>
            <UploadLab />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}