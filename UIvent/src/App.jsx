// src/App.jsx
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import InHeader from "./components/InHeader";
import ScrollIndicator from "./components/ScrollIndicator";

function App() {
  return (
    <div className="relative text-white bg-black">
      <InHeader />
      <ScrollIndicator />
      <Outlet />
    </div>
  );
}

export default App;
