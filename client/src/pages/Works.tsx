import { useState } from "react";
import "./works.scss";
import { Work, WorksIndicator } from "../components/works";
import { motion } from "framer-motion";

function Works() {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const works = [
    {
      title: "r/place Clone",
      date: "2023/05/20",
      url: "place",
      image: "img/png/place.png",
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
      <div className="worksSection">
        <h1 className="worksTitle">Works (WIP!!!)</h1>
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
      />
    </motion.div>
  );
}

export default Works;
