// import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "./MainLayout.jsx";
import { Aside, Body, loader as photoLoader } from "./routes/bodyComponent.jsx";
import "./index.css";
import ErrorPage from "./routes/error-page.jsx";
import Index from "./routes/index.jsx";
import { Login, action as loginAction } from "./routes/loginPage.jsx";
import { Registro, action as registroAction } from "./routes/registro.jsx";
import { Landing, action as landingAction } from "./routes/userLanding.jsx";
import {
  Fotos,
  loader as userFotoLoader,
  action as userFotoAction,
} from "./routes/userFotos.jsx";
import { Videos, loader as userVideoLoader } from "./routes/userVideos.jsx";
import { ProtectedRoute, PublicRoute } from "./routes/FilteredRoutes.jsx";
import { HomeView, NotfoundView } from "./routes/HomeView.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/page" element={<PublicRoute />}>
          <Route path=":numPage" element={<Body />} loader={photoLoader} />
        </Route>
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} />}
          // loader={valueLoader}
          action={loginAction}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<Registro />} />}
          action={registroAction}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/landing"
          element={<ProtectedRoute element={<Landing />} />}
          // loader={photoLoader}
          action={landingAction}
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute
            // element={<SettingsView />}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
            // element={<Landing />}
            />
          }
        />
        <Route
          path="/photos"
          element={<ProtectedRoute />}
          action={userFotoAction}
        >
          <Route path="" element={<Fotos />} loader={userFotoLoader} />
        </Route>

        <Route path="/videos" element={<ProtectedRoute />}>
          <Route path="" element={<Videos />} loader={userVideoLoader} />
        </Route>

        {/* <Route
            index
            element={<Index />}
            // errorElement={<div>Opción Errónea!!</div>}
          />
          <Route path=":uuid" element={<Index />} /> */}

        <Route path="*" element={<NotfoundView />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={route} />);
