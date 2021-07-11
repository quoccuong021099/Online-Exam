import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/Login/SignUp";
import Footer from "./components/Footer";
import ChooseTopic from "./components/Main/ChooseTopic";
import { Switch, Route, Redirect } from "react-router-dom";

export const contextApp = React.createContext();

function App() {
  const [listUsers, setListUsers] = useState([]);
  const [reFetch, setReFecth] = useState(null);

  // Hàm refecth lại khi data thay đổi
  const reset = (data) => {
    setReFecth(data);
  };

  // Fetch API user
  useEffect(() => {
    const fetchQuestion = async () => {
      const responseJson = await fetch("http://localhost:5000/users");
      const response = await responseJson.json();
      setListUsers(response);
    };
    fetchQuestion();
  }, [reFetch]);

  // List context
  const listContextApp = { listUsers: listUsers, reset: reset };

  // lấy user trong localStorage
  const user = localStorage.getItem("user-info");

  return (
    <div className="app">
      <contextApp.Provider value={listContextApp}>
        <Header />
        <Switch>
          <Route path="/" exact component={ChooseTopic} />
          <Route
            path="/exam"
            render={() => {
              return !user ? <Login /> : <Main to="/exam" />;
            }}
          />
          <Route
            path="/Login"
            render={() => {
              return !user ? <Login /> : <Redirect to="/" />;
            }}
          />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
        <Footer />
      </contextApp.Provider>
    </div>
  );
}

export default App;
