import './Background.scss';
import * as THREE from 'three';

function Background() {
    window.addEventListener('load', () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.style.opacity='0';
        const pointer = document.querySelector('.pointer') as HTMLDivElement;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let previousRAF: number | null = null;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 50);
        const scene = new THREE.Scene();

        const stars: THREE.Mesh[] = [];

        // shader material that makes the stars glow and a gradient from #00d8ff to #f0b2d8 based on the screen position
        const material = new THREE.ShaderMaterial({
            uniforms: {
                "color1": { value: new THREE.Color("rgb(0, 216, 255)") },
                "color2": { value: new THREE.Color("rgb(240, 178, 216)") },
                "color3": { value: new THREE.Color("rgb(238,210,2)")},
                "resolution": { value: new THREE.Vector2() },
                "time": { value: 0 }
              },
            
              vertexShader: `
              uniform float time;
              attribute float size;

              void main() {
              vec3 pos = position;

              // Create a wavy effect based on time
              pos.x += sin(pos.y * 10.0 + time) * 0.1;
              pos.y += cos(pos.x * 10.0 + time) * 0.1;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

              gl_PointSize = size * ( 300.0 / -mvPosition.z );
              gl_Position = projectionMatrix * mvPosition;
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
              
                  if (distanceFromTopLeft < 0.5) {
                      starColor = mix(color1, color3, smoothstep(0.0, 1.5, distanceFromTopLeft * 2.0));
                  } else {
                      starColor = mix(color3, color2, smoothstep(-0.5, 1.0, (distanceFromTopLeft - 0.5) * 2.0));
                  }
              
                  gl_FragColor = vec4(starColor, 1.0);
              }
              `
        });

        material.uniforms.resolution.value.x = renderer.domElement.width;
        material.uniforms.resolution.value.y = renderer.domElement.height;

        // create 1000 stars and add them to the scene
        for (let i = 0; i < 1500; i++) {
            const geometry = new THREE.SphereGeometry(0.25, 24, 24);
            const star = new THREE.Mesh(geometry, material);

            star.position.set(
                Math.random() * 500 - 250,
                Math.random() * 250 - 125,
                Math.random() * 400 - 200
            );
            scene.add(star);
            stars.push(star);
        }


        const render = (time: number) => {
            material.uniforms.time.value = time * 0.001;
            time *= 0.001;

            previousRAF === null && (previousRAF = time);

            const deltaTime = time - previousRAF;
            previousRAF = time;

            const cameraSpeed = 3 * deltaTime;

            const offsetLeft = parseInt(pointer.style.left.split('px')[0]);
            const offsetTop = -parseInt(pointer.style.top.split('px')[0]);

            if(!isNaN(offsetLeft) && !isNaN(offsetTop)) {
                const moveX = (offsetLeft / 100 - camera.position.x) * cameraSpeed;
                const moveY = (offsetTop / 100 - camera.position.y) * cameraSpeed;

                if (Math.abs(moveX) <= 10 && Math.abs(moveY) <= 10) {
                    camera.position.x += moveX;
                    camera.position.y += moveY;

                    camera.rotation.x = moveY * -0.1;
                    camera.rotation.y = moveX * 0.1;
                }
            }

            for (const star of stars) {
                star.position.z += 2 * deltaTime;
                if (star.position.z > 200) {
                    star.position.z -= 400;
                }
            }


            renderer.render(scene, camera);

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        setTimeout(() => {
            canvas.style.transition = 'opacity 1s';
            canvas.style.opacity = '1';
        },1200);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            material.uniforms.resolution.value.x = renderer.domElement.width;
            material.uniforms.resolution.value.y = renderer.domElement.height;
        });

        window.addEventListener('mousemove', (e) => {
            const pointer = document.querySelector('.pointer') as HTMLDivElement;
            pointer.style.left = `${e.clientX - window.innerWidth / 2}px`;
            pointer.style.top = `${e.clientY - window.innerHeight / 2}px`;
        });
    })
    
    return (
    <>
        <canvas id='canvas'></canvas>
        <div className='pointer'></div>
    </>
  )
}

export default Background