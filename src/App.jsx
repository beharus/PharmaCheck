import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
