import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Login/register";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      {/* <Login /> */}
      <Register />
      <Footer />
    </div>
  );
}

export default App;
