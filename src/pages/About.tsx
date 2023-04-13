import "./about.scss";
import { motion } from "framer-motion";

function About() {
  window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const aboutDescription = document.querySelector(
      ".aboutDescription"
    ) as HTMLParagraphElement;

    canvas.addEventListener("transitionend", () => {
      if (canvas.style.opacity === "1") {
        aboutDescription.setAttribute("data-canvas-opacity", "1");
      } else {
        aboutDescription.removeAttribute("data-canvas-opacity");
      }
    });
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="aboutSection">
        <h1 className="aboutTitle">About Me</h1>
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

export default About;
