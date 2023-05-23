import React from "react";
import "./Work.scss";

interface ColorPickerProps {
  colors: string[];
}

const Work: React.FC<ColorPickerProps> = ({ colors }) => {
  return (
    <>
      <div className="colorPicker">
        {colors.map((color, index) => (
          <div
            key={color}
            className="colorPicker__color"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </>
  );
};

export default Work;
