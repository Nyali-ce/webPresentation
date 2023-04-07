import './Background.scss';
import * as THREE from 'three';

function Background() {
    window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas });
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 50);
    const scene = new THREE.Scene();

    const stars: THREE.Mesh[] = [];
    
    for (let i = 0; i < 1000; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
        star.position.set(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
        );
        scene.add(star);
        stars.push(star);
    }

    function render(time: number) {
            time *= 0.001;
        stars.forEach((star, i) => {
                const speed = i * 0.01;
            const rot = time * speed;
            star.position.x = Math.cos(rot);
            star.position.y = Math.sin(rot);
            star.position.z = Math.sin(rot);
        });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    })
    
    return (
    <canvas id='canvas'></canvas>
  )
}

export default Background