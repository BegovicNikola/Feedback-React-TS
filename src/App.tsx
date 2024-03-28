import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutIcon from "./components/AboutIcon";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AboutIcon />
      </BrowserRouter>
    </FeedbackProvider>
  );
}

export default App;
