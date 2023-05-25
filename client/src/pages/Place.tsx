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

    let scaleX = 1;
    let scaleY = 1;

    let panning = false;

    const draw = () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);

      const [x, y] = relativeToAbsolute(0, 0);
      console.log(offsetX, canvas!.width, canvas!.clientWidth, scaleX);

      ctx?.drawImage(
        img,
        -x,
        -y,
        canvas!.width * scaleX,
        canvas!.height * scaleY
      );
    };

    const relativeToAbsolute = (x: number, y: number) => {
      return [
        x - (offsetX / canvas!.clientWidth) * canvas!.width * scaleX,
        y - (offsetY / canvas!.clientHeight) * canvas!.height * scaleY,
      ];
    };

    const absoluteToRelative = (x: number, y: number) => {
      return [
        x / scaleX + (offsetX / canvas!.width) * canvas!.clientWidth,
        y / scaleY + (offsetY / canvas!.height) * canvas!.clientHeight,
      ];
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      const [x, y] = [e.clientX, e.clientY];
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

      const [x, y] = [e.clientX, e.clientY];

      offsetX += (x - start.x) / scaleX;
      offsetY += (y - start.y) / scaleY;

      start.x = x;
      start.y = y;

      draw();
    };

    const handleMouseWheel = (e: WheelEvent) => {
      e.preventDefault();

      const canvasRect = canvas!.getBoundingClientRect();
      const [canvasX, canvasY] = [canvasRect.left, canvasRect.top];

      const [mouseX, mouseY] = absoluteToRelative(
        e.clientX - canvasX,
        e.clientY - canvasY
      );

      const delta = e.deltaY;
      if (delta < 0) {
        scaleX = scaleX * 1.1;
        scaleY = scaleY * 1.1;
      } else {
        scaleX = scaleX / 1.1;
        scaleY = scaleY / 1.1;
      }

      if (scaleX < 1) scaleX = 1;
      if (scaleY < 1) scaleY = 1;
      if (scaleX > 20) scaleX = 20;
      if (scaleY > 20) scaleY = 20;

      const [newMouseX, newMouseY] = absoluteToRelative(
        e.clientX - canvasX,
        e.clientY - canvasY
      );

      offsetX += newMouseX - mouseX;
      offsetY += newMouseY - mouseY;

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
