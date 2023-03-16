import { Outlet } from "react-router-dom";
import "./AppWrapper.css";
import React, { Suspense, useEffect } from "react";
import Footer from "../Footer/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import Loading from "../Loading/Loading";
import NavBarTop from "./NavBar";
import AlertDismissibleNotification from "./Alert";

function AppWrapper() {

  return (
    <>
      <NavBarTop />
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
