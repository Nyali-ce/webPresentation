import { useState } from "react";
import { Work, WorksIndicator } from "../components/works";
import { motion } from "framer-motion";

function Works() {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const works = [
    {
      title: "Github Profile",
      date: "2019/06/03",
      url: "https://github.com/Nyali-ce",
      image: "img/png/pfp.png",
    },
    {
      title: "Jellyfin Server (Private)",
      date: "2023/12/16",
      url: "http://100.117.184.112:8096",
      image: "img/png/jellyfin.png",
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
      <div className="mainContent">
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
