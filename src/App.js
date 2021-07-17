import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/Login/SignUp";
import Footer from "./components/Footer";
import ChooseTopic from "./components/Main/ChooseTopic";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import ExamTheme from "./ExamTheme";
import axios from "axios";
import { useAxios } from "./hooks/useAxios";

export const contextApp = React.createContext();

function App() {
  const [reFetch, setReFecth] = useState(null);

  // lấy user trong localStorage
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [charts, setCharts] = useState();
  // Hàm refecth lại khi data thay đổi
  const reset = (data) => {
    setReFecth(data);
  };

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
                  return !user ? <Login /> : <Main />;
                }}
              />
              <Route
                path="/Login"
                render={() => {
                  return !user ? <Login /> : <Redirect to="/" />;
                }}
              />
              <Route
                path="/SignUp"
                render={() => {
                  return !user ? <SignUp /> : <Redirect to="/" />;
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

export default App;
