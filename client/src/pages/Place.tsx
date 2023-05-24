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
    const div = divRef.current;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let cursor = { x: 0, y: 0 };

    const draw = () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx?.drawImage(
        img,
        // drawn so that no matter the scale, the image is centered
        offsetX - (img.width * scale - canvas!.width) / 2,
        offsetY - (img.height * scale - canvas!.height) / 2,
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
        cursor.x = x;
        cursor.y = y;
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
      const zoomFactor = 1.1;
      const delta = e.deltaY;
      if (delta < 0) {
        scale *= zoomFactor;
        offsetX -= (cursor.x - offsetX) * zoomFactor;
        offsetY -= (cursor.y - offsetY) * zoomFactor;
      } else {
        scale /= zoomFactor;
        offsetX += (cursor.x - offsetX) * (1 - 1 / zoomFactor);
        offsetY += (cursor.y - offsetY) * (1 - 1 / zoomFactor);
      }

      draw();
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
