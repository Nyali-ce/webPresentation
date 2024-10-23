import './works.scss';

import { useState } from "react";
import { Work, WorksIndicator } from "../components/works";
import { motion } from "framer-motion";

function Works() {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const works = [
    // {
    //   title: "dsc_selfbot.ce",
    //   date: "2019/06/03",
    //   url: "https://github.com/Nyali-ce/dsc_selfbot",
    //   image: "img/png/dsc_selfbot.png",
    // },
    {
      title: "Github Profile",
      date: "2019/06/03",
      url: "https://github.com/Nyali-ce",
      image: "img/png/pfp.png",
    },
    // Add more works to the array as needed

  ];

  const handleNextWork = () => {
    setCurrentWorkIndex((prevIndex) => (prevIndex + 1) % works.length);
  };

  const handlePrevWork = () => {
    setCurrentWorkIndex((prevIndex) =>
      prevIndex === 0 ? works.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="header">My stuff</h1>
      {/* <div className="mainContent">
        <div id="id">

        </div>
        <Work
          title={works[currentWorkIndex].title}
          date={works[currentWorkIndex].date}
          url={works[currentWorkIndex].url}
          image={works[currentWorkIndex].image}
        />
      </div>
      <WorksIndicator
        onNext={handleNextWork}
        onPrev={handlePrevWork}
        total={works.length}
        current={currentWorkIndex}
      /> */}
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
          🤓☝️ Umm Actually I'd get sued by my clients if I show source code on here but a few things on my github are public
        </p>
        <Work
          title={works[currentWorkIndex].title}
          date={works[currentWorkIndex].date}
          url={works[currentWorkIndex].url}
          image={works[currentWorkIndex].image}
        />
      </div>
    </motion.div>
  );
}

export default Works;