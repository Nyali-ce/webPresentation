import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { NavBar, Networks, Background, MusicPlayer } from "./components/layout";
import Index from "./pages/Index";
import Works from "./pages/Works";
import About from "./pages/About";
import Place from "./pages/Place";

import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Background />
      <NavBar />
      <MusicPlayer />
      <Networks />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/place" element={<Place />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
