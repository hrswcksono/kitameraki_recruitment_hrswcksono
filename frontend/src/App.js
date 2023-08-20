import "./App.css";
import MainContent from "./MainContent";
import Navbar from "./components/Navbar";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

function App() {
  return (
    <div className="">
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
