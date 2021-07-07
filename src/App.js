import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Login/register";
import Footer from "./components/Footer";

import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Header />
      {/* <Switch> */}
      {/* <Main />
                <Login />
                  <Register /> */}
      {/* <Switch /> */}
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
