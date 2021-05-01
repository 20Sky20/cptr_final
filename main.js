import * as THREE from './pkg/three.module.js'; 
import { GLTFLoader } from './pkg/GLTFLoader.js';

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    // INIT
    const render = new THREE.WebGLRenderer({canvas: document.querySelector('canvas')}); 
    render.setClearColor ('#0ff');
    render.shadowMap.enabled = true;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x00FFFF, 0.1);
    const camera = new THREE.PerspectiveCamera(75, render.domElement.clientWidth / render.domElement.clientHeight, 0.1, 1000); 
    camera.position.z = 5;
    const resize = () => {
        camera.aspect = render.domElement.clientWidth / render.domElement.clientHeight;
        camera.updateProjectionMatrix();
        render.setSize(render.domElement.clientWidth * window.devicePixelRatio, render.domElement.clientHeight * window.devicePixelRatio, false);
    }
    resize();
    window.addEventListener('resize', resize);

    // LIGHTING
    const directional_light = new THREE.DirectionalLight(0xFFFFFF, 0.95);
    directional_light.castShadow = true;
    directional_light.position.x = 3;
    directional_light.position.z = 4;
    directional_light.position.y = 5;
    scene.add(directional_light);


    // CUSTOM MODEL
    //let player, head;
    const gltf_loader = new GLTFLoader();
    gltf_loader.load('../assets/MushroomMash.glb', gltf => {
        scene.add(gltf.scene);
        scene.traverse( node => {
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
    }
    //player = scene.getObjectByName('player');
    //head = scene.getObjectByName('player.hat');
    //head.add(camera);    

    // KEYBOARD
    // const input = {w: false, a: false, s: false, d: false, ArrowLeft: false, ArrowRight: false, f: false}
    // window.addEventListener('keydown', keydown => {
    //     if(input.hasOwnProperty(keydown.key)){
    //         input[keydown.key] = true;
    //     }

    // });
    // window.addEventListener('keyup', keyup => {
    //     if(input.hasOwnProperty(keyup.key)){
    //         input[keyup.key] = false;
    //     }

    // });

    // POINTER
    renderer.domElement.addEventListener('click', click => {
        renderer.domElement.requestPointerLock();
    });
    renderer.domElement.addEventListener('mousemove', mousemove => {
        if(document.pointerLockElement ===  renderer.domElement) {

        }
    });


    // ANIMATION LOOP
    const animate = timestamp =>{
        
        // PROJECTILE
        // cube.material.color.set(0x0000FF);
        // if(input.f){
        //     player_raycast.setFromCamera(new THREE.Vector2(0, 0), camera);
        //     const intersects = player_raycast.intersectObjects(scene.children, true);
        //     intersects?.forEach(hit_object => {
        //     if(hit_object.object.name === 'hittable'){
        //         hit_object.object.material.color.set(0xFF0000);
        //     }
        //     });

        // }

        // COLLISION CHECK
        // collision_check.set(new THREE.Vector3(camera.position.x + dx, camera.position.y, camera.position.z + dz), new THREE.Vector3(0, 0, -1));
        // const collisions =  collision_check.intersectObjects(scene.children, true);
        // if(collisions[0]?.distance < 0.1){
        //     dx = 0;
        //     dz = 0;
        // }

        // RENDER
        render.render(scene, camera);
        window.requestAnimationFrame(animate);

    };
    window.requestAnimationFrame(animate);

}); 
