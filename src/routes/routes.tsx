import { Route, Routes, useNavigate } from "react-router";
import { lazy, Suspense } from "react";
import PrivateRoute from "./private.route";
import { Button, Flex, Spin, Typography } from "antd";
import { ErrorBoundary } from "react-error-boundary";

// Динамический импорт страниц с Lazy
const MainPage = lazy(() => import("../pages/main-page"));
const MyProfile = lazy(() => import("../pages/my-profile"));
const Delivery = lazy(() => import("../pages/delivery"));
const Orders = lazy(() => import("../pages/orders"));
const Settings = lazy(() => import("../pages/settings"));
const Login = lazy(() => import("../pages/login"));
const NoMatchPage = lazy(() => import("../pages/no-match-page"));

interface IFallBack {
  error: Error;
  resetErrorBoundary: () => void;
}

const AppRoutes = () => {
  const navigate = useNavigate();

  const navigationRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/my-profile/:userId", element: <MyProfile /> },
    { path: "/delivery", element: <Delivery /> },
    { path: "/orders", element: <Orders /> },
    {
      path: "/settings",
      element: (
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      )
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NoMatchPage /> }
  ];

  const handleFallBack = ({ error, resetErrorBoundary }: IFallBack) => {
    return (
      <Flex
        vertical
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography.Title level={3}>Что-то пошло не так</Typography.Title>
        <Typography.Text>{error.message}</Typography.Text>
        <Button onClick={resetErrorBoundary}>Попробовать снова</Button>
        <Button
          onClick={() => {
            navigate("/");
            resetErrorBoundary();
          }}
        >
          На главную{" "}
        </Button>
      </Flex>
    );
  };

  return (
    <ErrorBoundary
      FallbackComponent={handleFallBack}
      // onReset={() => window.location.reload()}
      onError={(error, info) => console.log("ошибка:", error, info)}
    >
      <Suspense fallback={<Spin />}>
        <Routes>
          {navigationRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
