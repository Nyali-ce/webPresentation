import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { NavBar, Networks, Background, MusicPlayer } from "./components/layout";
import Index from "./pages/Index";
import Works from "./pages/Works";
import About from "./pages/About";
import Place from "./pages/Place";
import Files from "./pages/Files";

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
          <Route path="/files" element={<Files />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
