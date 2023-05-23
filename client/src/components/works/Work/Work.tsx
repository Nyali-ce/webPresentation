import React from "react";
import "./Work.scss";

interface WorkProps {
  title: string;
  date: string;
  url: string;
  image: string;
}

const Work: React.FC<WorkProps> = ({ title, date, url, image }) => {
  return (
    <>
      <div className="work">
        <div className="workImage">
          <a href={url} target="blank_">
            <img src={image} alt={title} />
          </a>
          <div className="workDescription">
            <h2 className="workTitle">{title}</h2>
            <p className="workDate">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
