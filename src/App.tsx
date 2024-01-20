import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Films from "./pages/Films/Films";
import Navbar from "./components/Navbar";
import Film from "./pages/Film/Film";
import Species from "./pages/Species/Species";
import People from "./pages/People/People";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:id" element={<Film />} />
        <Route path="/species" element={<Species />} />
        <Route path="/people" element={<People />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
