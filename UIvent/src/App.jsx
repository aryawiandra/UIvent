// src/App.jsx
import Header from "./components/Header";
import ScrollIndicator from "./components/ScrollIndicator";
import Home from "./pages/Home";

function App() {
  return (
    <div className="relative text-white bg-black">
      <Header />
      <ScrollIndicator />
      <Home />
    </div>
  );
}

export default App;
