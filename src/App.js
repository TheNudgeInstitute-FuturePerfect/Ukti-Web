import "./App.css";
import Home from "./home";

function App() {
  window.log = function (args) {
    console.log(args);
  };

  return (
    <>
      <Home />
    </>
  );
}

export default App;
