import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/Login/SignUp";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { Switch, Route } from "react-router-dom";

export const contextApp = React.createContext();

function App() {
  const [listUsers, setListUsers] = useState([]);
  const [reFetch, setReFecth] = useState(null);

  const reset = (data) => {
    setReFecth(data);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const responseJson = await fetch("http://localhost:5000/users");
      const response = await responseJson.json();
      setListUsers(response);
    };
    fetchQuestion();
  }, [reFetch]);

  const listContextApp = { listUsers: listUsers, reset: reset };

  const user = localStorage.getItem("user-info");

  return (
    <div className="app">
      <contextApp.Provider value={listContextApp}>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          {!user ? <Route path="/Login" component={Login} /> : <NotFound />}
          <Route path="/SignUp" component={SignUp} />
        </Switch>
        <Footer />
      </contextApp.Provider>
    </div>
  );
}

export default App;
