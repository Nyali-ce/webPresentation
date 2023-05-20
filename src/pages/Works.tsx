import "./works.scss";
import { motion } from "framer-motion";

function Works() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="worksSection">
        <h1 className="worksTitle">Works</h1>
        <p
          className="aboutDescription"
          data-canvas-opacity={
            (document.getElementById("canvas") as HTMLCanvasElement)?.style
              ?.opacity == "1"
              ? "1"
              : "0"
          }
        >
          I code things and stuff 😎
        </p>
      </div>
    </motion.div>
  );
}

export default Works;
