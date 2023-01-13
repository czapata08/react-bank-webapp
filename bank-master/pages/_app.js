import React, { useState, useContext } from "react";

import { AuthProvider } from "../context/user.context";
import Layout from "../components/layout";

//styles
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
