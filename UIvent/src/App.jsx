// src/App.jsx
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import ScrollIndicator from "./components/ScrollIndicator";

function App() {
  return (
    <div className="relative text-white bg-black">
      <Header />
      <ScrollIndicator />
      <Outlet />
    </div>
  );
}

export default App;
