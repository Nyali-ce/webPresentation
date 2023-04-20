import "./Background.scss";
import * as THREE from "three";
import { useEffect } from "react";

function Background() {
  // only use useEffect once

  useEffect(() => {
    console.log("load");
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.style.opacity = "0";
    const pointer = document.querySelector(".pointer") as HTMLDivElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let previousRAF: number | null = null;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 50);
    const scene = new THREE.Scene();

    const stars: THREE.Mesh[] = [];

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("rgb(0, 216, 255)") },
        color2: { value: new THREE.Color("rgb(240, 178, 216)") },
        color3: { value: new THREE.Color("rgb(238,210,2)") },
        resolution: { value: new THREE.Vector2() },
        time: { value: 0 },
        amplitude: { value: 0 },
        frequency: { value: 0 },
      },

      vertexShader: `
          uniform float amplitude;
          uniform float frequency;
        
          void main() {
            vec3 newPosition = position + normal * amplitude * 0.2 * sin(frequency * position.y);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
                  `,
      fragmentShader: `
                  uniform vec3 color1;
                  uniform vec3 color2;
                  uniform vec3 color3;
                  uniform vec2 resolution;
                  
                  varying vec2 vUv;
                  
                  void main() {
                      vec2 screenPos = gl_FragCoord.xy;
                      float scalingFactor = 1.0; // adjust this to control the steepness of the gradient
                      float distanceFromTopLeft = distance(vec2(0.0), screenPos * scalingFactor) / length(resolution);
                  
                      vec3 starColor;
                  
                      if (distanceFromTopLeft < 0.33) {
                        starColor = mix(color1, color2, smoothstep(0.0, 1.0, distanceFromTopLeft * 3.0));
                      } else if (distanceFromTopLeft < 0.67) {
                        starColor = mix(color2, color3, smoothstep(0.0, 1.0, (distanceFromTopLeft - 0.33) * 3.0));
                      } else {
                        starColor = mix(color3, color1, smoothstep(0.0, 1.0, (distanceFromTopLeft - 0.67) * 3.0));
                      }
                  
                      gl_FragColor = vec4(starColor, 1.0);
                  }
                  `,
    });

    material.uniforms.resolution.value.x = renderer.domElement.width;
    material.uniforms.resolution.value.y = renderer.domElement.height;

    // create stars
    for (let i = 0; i < 1500; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 24, 24),
        material
      );

      star.position.set(
        Math.random() * 300 - 150,
        Math.random() * 200 - 100,
        Math.random() * 400 - 200
      );
      scene.add(star);
      stars.push(star);
    }

    const audio = document.querySelector("audio") as HTMLAudioElement;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    let frames = 0;

    const render = (time: number) => {
      requestAnimationFrame(render);

      analyser.getFloatTimeDomainData(dataArray);
      const amplitude = Math.max(...dataArray);
      const frequency = getFrequency(dataArray, audioContext.sampleRate);

      material.uniforms.amplitude.value = amplitude * 10;
      material.uniforms.frequency.value = frequency / 1000;

      time *= 0.001;
      material.uniforms.time.value = time;

      previousRAF === null && (previousRAF = time);

      const deltaTime = time - previousRAF;
      previousRAF = time;

      const cameraSpeed = 3 * deltaTime;
      const panSpeed = 0.0001 * deltaTime;

      const offsetLeft = parseInt(pointer.style.left.split("px")[0]);
      const offsetTop = -parseInt(pointer.style.top.split("px")[0]);

      if (!isNaN(offsetLeft) && !isNaN(offsetTop)) {
        const moveX = (offsetLeft / 100 - camera.position.x) * cameraSpeed;
        const moveY = (offsetTop / 100 - camera.position.y) * cameraSpeed;

        if (Math.abs(moveX) <= 10 && Math.abs(moveY) <= 10) {
          // position
          camera.position.x += moveX;
          camera.position.y += moveY;

          // rotation
          const target = new THREE.Vector3(
            offsetLeft / 500 - moveX * panSpeed,
            offsetTop / 500 - moveY * panSpeed,
            0
          );
          camera.lookAt(target);
        }
      }

      // move stars
      for (const star of stars) {
        star.position.z += 2 * deltaTime;
        if (star.position.z > 200) {
          star.position.z -= 400;
        }
      }

      renderer.render(scene, camera);

      frames++;
      if (frames == 30) {
        canvas.style.transition = "opacity 1s";
        canvas.style.opacity = "1";
      }
    };

    function getFrequency(dataArray: Float32Array, sampleRate: number) {
      const peak = Math.max(...dataArray);
      const index = dataArray.indexOf(peak);
      const frequency = (index / dataArray.length) * sampleRate;
      return frequency;
    }

    requestAnimationFrame(render);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      material.uniforms.resolution.value.x = renderer.domElement.width;
      material.uniforms.resolution.value.y = renderer.domElement.height;
    });

    window.addEventListener("mousemove", (e) => {
      const pointer = document.querySelector(".pointer") as HTMLDivElement;
      pointer.style.left = `${e.clientX - window.innerWidth / 2}px`;
      pointer.style.top = `${e.clientY - window.innerHeight / 2}px`;
    });
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="pointer"></div>
    </>
  );
}

export default Background;
