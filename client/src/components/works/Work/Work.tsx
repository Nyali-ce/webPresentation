import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Work.scss";
import * as THREE from "three";

interface WorkProps {
  title: string;
  date: string;
  url: string;
  image: string;
}

const Work: React.FC<WorkProps> = ({ title, date, url, image }) => {

  // useEffect(() => {
  //   const canvas = document.getElementById("background") as HTMLCanvasElement;
  //   const renderer = new THREE.WebGLRenderer({ canvas });
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  //   const texture = new THREE.TextureLoader().load(image);

  //   // make rectangle with the image texture, and add it to the scene
  //   const geometry = new THREE.PlaneGeometry(1, 1);
  //   const material = new THREE.MeshBasicMaterial({ map: texture });
  //   const rectangle = new THREE.Mesh(geometry, material);
  //   scene.add(rectangle);

  //   camera.position.z = 1;

  //   const animate = function () {
  //     requestAnimationFrame(animate);
  //     renderer.render(scene, camera);
  //   };

  //   animate();
  // }, [image]);

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