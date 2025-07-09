import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Converter from "./Pages/Converter";
import Result from "./Pages/Result";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Converter />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;