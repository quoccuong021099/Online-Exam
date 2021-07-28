import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/Login/SignUp";
import Main from "./components/Main";
import ChooseTopic from "./components/Main/ChooseTopic";
import ExamTheme from "./ExamTheme";
import { getChart } from "./redux/actions/charts";
import { makeSelectIsSuccessLogin } from "./redux/selectors/login";

export const contextApp = React.createContext();

function App({ statusFlags, triggerChart }) {
  useEffect(() => {
    triggerChart();
  }, [triggerChart]);
  return (
    <BrowserRouter>
      <div className="app">
        <ExamTheme>
          <Header />
          <Switch>
            <Route path="/" exact component={ChooseTopic} />
            <Route
              path="/exam"
              render={() => {
                return !statusFlags.isLoginSuccess ? <Login /> : <Main />;
              }}
            />
            <Route
              path="/Login"
              render={() => {
                return !statusFlags.isLoginSuccess ? (
                  <Login />
                ) : (
                  <Redirect to="/" />
                );
              }}
            />
            <Route
              path="/SignUp"
              render={() => {
                return !statusFlags.isLoginSuccess ? (
                  <SignUp />
                ) : (
                  <Redirect to="/" />
                );
              }}
            />
          </Switch>
          <Footer />
        </ExamTheme>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  statusFlags: makeSelectIsSuccessLogin(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    triggerChart: () => dispatch(getChart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
