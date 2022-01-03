/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "../redux/reducers/auth";

import Feed from "../views/Feed";
import Account from "../views/Account";
import Portal from "../interface/Portal";
import { Login } from "../views/AuthForm";
import FourOhFour from "../views/FourOhFour";
import Admin from "../views/Admin";
import Keywords from "../views/Keywords";
import Invite from "../views/Invite";
import Forgot from "../views/Forgot";
import ResetPassword from "../views/ResetPassword";
import Home from "../views/Home";
import Authenticate from "../views/Authenticate";
import Dashboard from "../views/Dashboard";
import AgentDashboard from "../views/AgentDashboard";
import AuthSimpleLayout from "../views/AuthSimpleLayout";

const Routes = ({ getMe, isLoggedIn, preCheck, auth }) => {
  useEffect(() => {
    getMe();
  }, [isLoggedIn]);

  const renderer = (Component, props) => (
    <Portal {...{ Component, props, preCheck, auth }} />
  );
  //height: "calc(100vh - 112px)",
  return (
    // <div
    //   className="container-fluid"
    //   style={{
    //     height: "100vh",
    //     backgroundColor: "#c11c24",
    //     overflowY: "scroll",
    //   }}
    // >
    <>
      {isLoggedIn ? (
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => renderer(Authenticate, props)}
          />

          <Route
            exact
            path="/"
            render={(props) => renderer(Dashboard, props)}
          />
          <Route
            exact
            path="/agent-dashboard/:agentId"
            render={(props) => renderer(AgentDashboard, props)}
          />
          <Route
            exact
            path="/keyword"
            render={(props) => renderer(Keywords, props)}
          />
          <Route
            exact
            path="/account"
            render={(props) => renderer(Account, props)}
          />
          <Route
            exact
            path="/admin"
            render={(props) => renderer(Admin, props)}
          />
          <Route
            exact
            path="/registered"
            render={(props) => renderer(Login, props)}
          />
          <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" render={(props) => renderer(Home, props)} />
          <Route
            exact
            path="/login"
            render={(props) => renderer(AuthSimpleLayout, props)}
          />
          <Route
            exact
            path="/forgot-password"
            render={(props) => renderer(Forgot, props)}
          />
          <Route
            exact
            path="/password-reset/:userId/:token"
            render={(props) => renderer(ResetPassword, props)}
          />
          <Route
            exact
            path="/invite/:id"
            render={(props) => renderer(Invite, props)}
          />
        </Switch>
      )}
    </>
    // </div>
  );
};

const mapState = (state) => {
  const { auth, preCheck, validInvitation } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
    auth,
    preCheck,
    validInvitation,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMe() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
