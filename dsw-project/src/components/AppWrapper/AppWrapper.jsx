import { Outlet } from "react-router-dom";
import "./AppWrapper.css";
import React, { Suspense } from "react";
import Footer from "../Footer/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import Loading from "../Loading/Loading";
import NavBarOffCanvas from "./NavBar";
import AlertDismissibleNotification from "./Alert";

function AppWrapper() {

  return (
    <>
      <NavBarOffCanvas />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
      <AlertDismissibleNotification />
      <GlobalStyle />
    </>
  );
}

export default AppWrapper;
