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

export const contextApp = React.createContext();

function App() {
  const [listUsers, setListUsers] = useState([]);
  const [reFetch, setReFecth] = useState(null);
  // const [ranks, setRanks] = useState(null);
  const [charts, setCharts] = useState(null);

  // lấy user trong localStorage
  const user = JSON.parse(localStorage.getItem("user-info"));

  // Hàm refecth lại khi data thay đổi
  const reset = (data) => {
    setReFecth(data);
  };

  const fetchCharts = async () => {
    try {
      let response = await axios.get("http://localhost:5000/charts");
      setCharts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch API user
  useEffect(() => {
    const fetchQuestion = async () => {
      const responseJson = await fetch("http://localhost:5000/users");
      const response = await responseJson.json();
      setListUsers(response);
    };
    fetchQuestion();
    fetchCharts();
  }, [reFetch]);

  // List context
  const listContextApp = {
    listUsers: listUsers,
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
