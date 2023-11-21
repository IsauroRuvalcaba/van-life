import {
  Link,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import "../server";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail";
import HostDetailLayout from "./components/HostDetailLayout";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />
      {/*not nested because not sharing UI */}

      <Route
        path="host"
        element={<HostLayout />}
        loader={async () => {
          const isLoggedIn = true;
          if (!isLoggedIn) {
            throw redirect("/login");
          }
          return null;
        }}
      >
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            const isLoggedIn = true;
            if (!isLoggedIn) {
              throw redirect("/login");
            }
            return null;
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            const isLoggedIn = true;
            if (!isLoggedIn) {
              throw redirect("/login");
            }
            return null;
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
            const isLoggedIn = true;
            if (!isLoggedIn) {
              throw redirect("/login");
            }
            return null;
          }}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => {
              const isLoggedIn = true;
              if (!isLoggedIn) {
                throw redirect("/login");
              }
              return null;
            }}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async () => {
              const isLoggedIn = true;
              if (!isLoggedIn) {
                throw redirect("/login");
              }
              return null;
            }}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async () => {
              const isLoggedIn = true;
              if (!isLoggedIn) {
                throw redirect("/login");
              }
              return null;
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//https://youtu.be/nDGA3km5He4?t=17252

// https://phenomenal-sunshine-94a254.netlify.app/

/* 

01 - Introduction to React Router
02 - Nested Routes
03 - Search Params and Links
04 - Loaders and Erros
05 - Actions and Protected Routes
06 - Deferred Data

*/
