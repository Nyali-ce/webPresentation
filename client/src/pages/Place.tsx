import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ColorPicker } from "../components/place";

import "./place.scss";

function Place() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  let img = new Image();
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const draw = () => {
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx?.drawImage(
      img,
      offsetX,
      offsetY,
      img.width * scale,
      img.height * scale
    );
  };

  const handleMouseDown = (e: MouseEvent) => {
    lastX = e.clientX - (canvas?.offsetLeft || 0);
    lastY = e.clientY - (canvas?.offsetTop || 0);
    dragging = true;
  };

  const handleMouseUp = () => {
    dragging = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const x = e.clientX - (canvas?.offsetLeft || 0);
      const y = e.clientY - (canvas?.offsetTop || 0);
      const dx = x - lastX;
      const dy = y - lastY;
      offsetX += dx;
      offsetY += dy;
      lastX = x;
      lastY = y;

      draw();
    }
  };

  const handleMouseWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta > 0) {
      scale *= 1.1;
    } else {
      scale /= 1.1;
    }

    draw();
  };

  useEffect(() => {
    let socket: WebSocket;
    socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "canvas") {
        const canvas = canvasRef.current;
        canvas!.width = data.width;
        canvas!.height = data.height;
        const ctx = canvas?.getContext("2d");
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
        }
      }

      if (data.type === "pixel") {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
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
      }
    };

    canvas?.addEventListener("mousedown", handleMouseDown);
    canvas?.addEventListener("mouseup", handleMouseUp);
    canvas?.addEventListener("mousemove", handleMouseMove);
    canvas?.addEventListener("wheel", handleMouseWheel);

    return () => {
      socket.close();
      canvas?.removeEventListener("mousedown", handleMouseDown);
      canvas?.removeEventListener("mouseup", handleMouseUp);
      canvas?.removeEventListener("mousemove", handleMouseMove);
      canvas?.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="place"
    >
      <canvas ref={canvasRef} className="place-canvas" />

      <ColorPicker colors={["red", "blue"]} />
    </motion.div>
  );
}

export default Place;
