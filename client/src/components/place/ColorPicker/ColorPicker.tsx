import React from "react";
import "./ColorPicker.scss";

interface ColorPickerProps {
  colors: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors }) => {
  return (
    <>
      <div className="colorPicker">
        {colors.map((color) => (
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

export default ColorPicker;
