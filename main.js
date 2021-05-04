import * as THREE from './pkg/three.module.js'; 
import { GLTFLoader } from './pkg/GLTFLoader.js';

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    // INIT
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('canvas')});
    renderer.shadowMap.enabled = true;
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    const camera = new THREE.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000); 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88CCFF);
    scene.fog = new THREE.FogExp2(scene.background, 0.1);
    
    

    // LIGHTING
    const directional_light = new THREE.DirectionalLight(0xFFFFFF, 1);
    directional_light.position.set(3,4,5);
    directional_light.castShadow = true;
    scene.add(directional_light);
    const hemi_light = new THREE.HemisphereLight(0xFFFFFF, 0.5);
    scene.add(hemi_light);


    // LOAD MODEL
    let player, face;
    const loader = new GLTFLoader();
    loader.load('./assets/MushroomMash.glb', gltf => {
        scene.add(gltf.scene);
        scene.traverse( node => {
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        player = scene.getObjectByName('player');
        face =  scene.getObjectByName('face');
        face.add(camera);
        camera.position.y = 1;
        camera.position.z = 1;
        requestAnimationFrame(animation);
        
    });

    // KEYBOARD
    const keyboard = {
        w: false,
        a: false,
        s: false,
        d: false,
        f: false,
        space: false,
    }
    document.addEventListener('keydown', keydown => {
        if(keyboard.hasOwnProperty(keydown.key)) {
            keyboard[keydown.key] = true;
        }
    });
    document.addEventListener('keyup', keyup => {
        if(keyboard.hasOwnProperty(keyup.key)) {
            keyboard[keyup.key] = false;
        }
    });

    // POINTER
    renderer.domElement.addEventListener('click', click => {
        renderer.domElement.requestPointerLock();
    });
    renderer.domElement.addEventListener('mousemove', mousemove => {
        if(document.pointerLockElement === renderer.domElement) {
            const HEAD_ROTATION_SPEED = 1/256;
            eye.rotation.x -= mousemove.movementY * HEAD_ROTATION_SPEED;
            player.rotation.y -= mousemove.movementX * HEAD_ROTATION_SPEED;
        }
    });

    //ANIMATE
    const animation = timestamp => {

        // MOVEMENT
        const movement = new THREE.Vector3(keyboard.d - keyboard.a, 0, keyboard.s - keyboard.w);
        movement.normalize();
        movement.multiplyScalar(1 / 8);
        movement.applyAxisAngle(new THREE.Vector3(0, 1, 1), player.rotation.y);
        player.position.add(movement);


        // RENDER
        renderer.render(scene, camera);
        window.requestAnimationFrame(animation);

    };

}); 
