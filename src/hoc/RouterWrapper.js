//This is HOC to wrap views and layouts without verification.
import React from "react";
import { Route } from "react-browser-router";

const RouteWrapper = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout {...rest}>
            <Component {...rest} />
          </Layout>
        );
      }}
    />
  );
};

export default RouteWrapper;