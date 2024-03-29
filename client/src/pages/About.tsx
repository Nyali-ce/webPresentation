import "./about.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    const canvas = document.getElementById("background") as HTMLCanvasElement;
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
      <h1 className="header">About Me</h1>
      <div className="mainContent">
        <p
          className="aboutDescription"
          data-canvas-opacity={
            (document.getElementById("background") as HTMLCanvasElement)?.style
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
