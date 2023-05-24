import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={url}>
            <img src={image} alt={title} />
          </Link>
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
