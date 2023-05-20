import "./WorksIndicator.scss";
import { FC } from "react";

interface WorksIndicatorProps {
  onNext: () => void;
  onPrev: () => void;
  total: number;
  current: number;
}

const WorksIndicator: FC<WorksIndicatorProps> = ({
  onNext,
  onPrev,
  total,
  current,
}) => {
  return (
    <div className="worksIndicator">
      <button className="prevButton" onClick={onPrev}>
        {"<"}
      </button>
      <div className="worksIndicatorText">
        {current + 1} / {total}
      </div>
      <button className="nextButton" onClick={onNext}>
        {">"}
      </button>
    </div>
  );
};

export default WorksIndicator;
