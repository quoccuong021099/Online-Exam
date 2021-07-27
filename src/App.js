import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { useAxios } from "./hooks/useAxios";
import { makeSelectIsSuccessLogin } from "./redux/selectors/login";

export const contextApp = React.createContext();

function App({ statusFlags }) {

  const [isLoginSuccess, setIsLoginSuccess] = useState(null);

  useEffect(() => {
    setIsLoginSuccess(statusFlags.isLoginSuccess);
  }, [statusFlags.isLoginSuccess]);

  const [reFetch, setReFecth] = useState(null);

  const [charts, setCharts] = useState();
  // Hàm refecth lại khi data thay đổi
  const reset = (data) => {
    setReFecth(data);
  };

  useEffect(() => {}, [reFetch]);

  const { response: responseUser } = useAxios({
    method: "get",
    url: "http://localhost:5000/users",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/charts").then(function (response) {
      setCharts(response.data);
    });
  }, [reFetch]);

  // List context
  const listContextApp = {
    listUsers: responseUser,
    reset: reset,
    charts: charts,
  };

  return (
    <BrowserRouter>
      <div className="app">
        <ExamTheme>
          <contextApp.Provider value={listContextApp}>
            <Header />
            <Switch>
              <Route path="/" exact component={ChooseTopic} />
              <Route
                path="/exam"
                render={() => {
                  return !isLoginSuccess ? <Login /> : <Main />;
                }}
              />
              <Route
                path="/Login"
                render={() => {
                  return !isLoginSuccess ? <Login /> : <Redirect to="/" />;
                }}
              />
              <Route
                path="/SignUp"
                render={() => {
                  return !isLoginSuccess ? <SignUp /> : <Redirect to="/" />;
                }}
              />
            </Switch>
            <Footer />
          </contextApp.Provider>
        </ExamTheme>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  statusFlags: makeSelectIsSuccessLogin(),
});
export default connect(mapStateToProps, null)(App);
