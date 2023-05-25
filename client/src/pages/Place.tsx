import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ColorPicker } from "../components/place";

import "./place.scss";

function Place() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx!.imageSmoothingEnabled = false;

    const div = divRef.current;

    let img = new Image();

    let socket: WebSocket;
    socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "canvas") {
        canvas!.width = data.width;
        canvas!.height = data.height;
        const imageData = ctx?.getImageData(
          0,
          0,
          canvas!.width,
          canvas!.height
        );

        if (imageData) {
          const pixels = imageData.data;
          const pixelData = data.canvas as Uint8ClampedArray;
          for (let i = 0; i < pixels.length; i++) {
            pixels[i] = pixelData[i];
          }
          ctx?.putImageData(imageData, 0, 0);
          img.src = canvas!.toDataURL();
        }
      }

      if (data.type === "pixel") {
        const imageData = ctx?.getImageData(
          0,
          0,
          canvas!.width,
          canvas!.height
        );

        if (imageData) {
          const pixelData = data.pixel as Uint8ClampedArray;
          const index = (data.y * imageData.width + data.x) * 4;
          const pixels = imageData.data;

          pixels[index + 0] = pixelData[0];
          pixels[index + 1] = pixelData[1];
          pixels[index + 2] = pixelData[2];
          pixels[index + 3] = pixelData[3];

          ctx?.putImageData(imageData, 0, 0);
        }

        img.src = canvas!.toDataURL();
      }
    };

    let offsetX = 0;
    let offsetY = 0;

    const start = { x: 0, y: 0 };

    let panning = false;

    const draw = () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx?.drawImage(img, offsetX, offsetY, canvas!.width, canvas!.height);
    };

    const relativeToAbsolute = (x: number, y: number) => {
      return [x + offsetX, y + offsetY];
    };

    const absoluteToRelative = (x: number, y: number) => {
      return [x - offsetX, y - offsetY];
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      const [x, y] = absoluteToRelative(e.clientX, e.clientY);
      start.x = x;
      start.y = y;
      panning = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      panning = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (!panning) return;

      const [x, y] = absoluteToRelative(e.clientX, e.clientY);

      offsetX = offsetX + (x - start.x);
      offsetY = offsetY + (y - start.y);

      draw();
    };

    const handleMouseWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    div?.addEventListener("mousedown", handleMouseDown);
    window?.addEventListener("mouseup", handleMouseUp);
    div?.addEventListener("mousemove", handleMouseMove);
    div?.addEventListener("wheel", handleMouseWheel);

    return () => {
      socket.close();
      div?.removeEventListener("mousedown", handleMouseDown);
      window?.removeEventListener("mouseup", handleMouseUp);
      div?.removeEventListener("mousemove", handleMouseMove);
      div?.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={divRef}
      className="place"
    >
      <canvas ref={canvasRef} className="place-canvas" />

      <ColorPicker colors={["red", "blue"]} />
    </motion.div>
  );
}

export default Place;
