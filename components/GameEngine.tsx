
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { InventoryItem } from '../types';
import { IMAGES } from '../constants';

interface GameEngineProps {
  isPaused: boolean;
  activeItem: InventoryItem | undefined;
  onCoordinatesUpdate: (coords: { x: number; y: number; z: number }) => void;
}

// Improved Fractal Noise for more "textured" land
const noise = (x: number, z: number) => {
  const f1 = (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 5;
  const f2 = (Math.sin(x * 0.03 + z * 0.05) * 10);
  const f3 = (Math.sin(x * 0.5) * Math.cos(z * 0.5)) * 1; // Detail noise
  return f1 + f2 + f3 + 20;
};

const GameEngine: React.FC<GameEngineProps> = ({ isPaused, activeItem, onCoordinatesUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<PointerLockControls | null>(null);
  const activeItemRef = useRef<InventoryItem | undefined>(activeItem);
  
  const worldData = useRef<Map<string, string>>(new Map());
  const worldMeshes = useRef<Map<string, THREE.Mesh>>(new Map());
  const sceneRef = useRef<THREE.Scene | null>(null);
  
  const CHUNK_SIZE = 16;
  const RENDER_RADIUS = 5; 
  const lastChunkCoords = useRef({ x: 999, z: 999 });

  useEffect(() => {
    activeItemRef.current = activeItem;
  }, [activeItem]);

  useEffect(() => {
    if (controlsRef.current) {
      if (isPaused) controlsRef.current.unlock();
    }
  }, [isPaused]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x7ec0ee); // Sky Blue
    scene.fog = new THREE.FogExp2(0x7ec0ee, 0.015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 60, 8); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    // 2. LIGHTING (Cinematic)
    const ambient = new THREE.AmbientLight(0xffffff, 0.6); 
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(100, 200, 100);
    sun.castShadow = true;
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    scene.add(sun);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.3);
    scene.add(hemi);

    const controls = new PointerLockControls(camera, document.body);
    controlsRef.current = controls;

    // 3. ENHANCED TEXTURE LOADING
    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin('anonymous');
    
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const load = (url: string, repeat = false) => {
      const t = texLoader.load(url);
      t.magFilter = THREE.NearestFilter;
      t.minFilter = THREE.NearestMipmapLinearFilter;
      t.anisotropy = maxAnisotropy;
      t.colorSpace = THREE.SRGBColorSpace;
      if (repeat) {
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
      }
      return t;
    };

    const mats: Record<string, any> = {
      stone: new THREE.MeshStandardMaterial({ map: load(IMAGES.STONE), roughness: 0.9, metalness: 0.1 }),
      dirt: new THREE.MeshStandardMaterial({ map: load(IMAGES.DIRT), roughness: 1.0 }),
      grass: [
        new THREE.MeshStandardMaterial({ map: load(IMAGES.GRASS_SIDE), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: load(IMAGES.GRASS_SIDE), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: load(IMAGES.GRASS_TOP), color: 0x85ad4d, roughness: 1.0 }),
        new THREE.MeshStandardMaterial({ map: load(IMAGES.DIRT), roughness: 1.0 }),
        new THREE.MeshStandardMaterial({ map: load(IMAGES.GRASS_SIDE), roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ map: load(IMAGES.GRASS_SIDE), roughness: 0.8 }),
      ],
      planks: new THREE.MeshStandardMaterial({ map: load(IMAGES.PLANKS), roughness: 0.9 }),
      log: new THREE.MeshStandardMaterial({ map: load(IMAGES.LOG), roughness: 0.9 }),
      leaves: new THREE.MeshStandardMaterial({ map: load(IMAGES.LEAVES), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }),
      water: new THREE.MeshStandardMaterial({ color: 0x1c82e3, transparent: true, opacity: 0.7, roughness: 0.2 }),
      brick: new THREE.MeshStandardMaterial({ map: load(IMAGES.BRICK), roughness: 0.7 }),
    };

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // 4. WORLD GENERATION
    const createBlock = (x: number, y: number, z: number, type: string) => {
      const key = `${x},${y},${z}`;
      if (worldMeshes.current.has(key)) return;

      const mat = mats[type.toLowerCase().split(' ')[0]] || mats.stone;
      const mesh = new THREE.Mesh(boxGeo, Array.isArray(mat) ? mat : mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Color variation logic
      if (type === 'Grass Block') {
        const tint = 0.9 + Math.random() * 0.2;
        if (!Array.isArray(mat)) {
           mesh.material = mat.clone();
           (mesh.material as any).color.multiplyScalar(tint);
        }
      }

      scene.add(mesh);
      worldMeshes.current.set(key, mesh);
      worldData.current.set(key, type);
    };

    const generateChunk = (cx: number, cz: number) => {
      for (let x = cx * CHUNK_SIZE; x < (cx + 1) * CHUNK_SIZE; x++) {
        for (let z = cz * CHUNK_SIZE; z < (cz + 1) * CHUNK_SIZE; z++) {
          const height = Math.floor(noise(x, z));
          for (let y = 0; y <= height; y++) {
            let type = 'Stone';
            if (y === height) type = 'Grass Block';
            else if (y > height - 3) type = 'Dirt';
            createBlock(x, y, z, type);
          }
          if (height > 25 && Math.random() > 0.99) {
             // Generate Tree
             for(let ty=1; ty<5; ty++) createBlock(x, height+ty, z, 'Oak Log');
             for(let lx=-1; lx<=1; lx++) 
               for(let lz=-1; lz<=1; lz++) 
                 for(let ly=3; ly<=5; ly++) 
                   createBlock(x+lx, height+ly, z+lz, 'Leaves');
          }
        }
      }
    };

    const updateChunks = (px: number, pz: number) => {
      const cx = Math.floor(px / CHUNK_SIZE);
      const cz = Math.floor(pz / CHUNK_SIZE);
      if (cx === lastChunkCoords.current.x && cz === lastChunkCoords.current.z) return;
      lastChunkCoords.current = { x: cx, z: cz };

      for (let dx = -RENDER_RADIUS; dx <= RENDER_RADIUS; dx++) {
        for (let dz = -RENDER_RADIUS; dz <= RENDER_RADIUS; dz++) {
          generateChunk(cx + dx, cz + dz);
        }
      }
    };

    // 5. CORE LOOP
    const velocity = new THREE.Vector3();
    const keys: Record<string, boolean> = {};
    
    const onKeyDown = (e: KeyboardEvent) => keys[e.code] = true;
    const onKeyUp = (e: KeyboardEvent) => keys[e.code] = false;
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const onMouseDown = (e: MouseEvent) => {
      if (!controls.isLocked) return;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(0,0), camera);
      const hits = ray.intersectObjects(Array.from(worldMeshes.current.values()));
      
      if (hits.length > 0) {
        const hit = hits[0];
        if (e.button === 0) { // Break
          scene.remove(hit.object);
          const p = hit.object.position;
          worldMeshes.current.delete(`${p.x},${p.y},${p.z}`);
          worldData.current.delete(`${p.x},${p.y},${p.z}`);
        } else if (e.button === 2 && activeItemRef.current) { // Place
          const p = hit.object.position.clone().add(hit.face!.normal!);
          createBlock(Math.round(p.x), Math.round(p.y), Math.round(p.z), activeItemRef.current.name);
        }
      }
    };
    window.addEventListener('mousedown', onMouseDown);

    let lastTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now();
      const delta = Math.min((time - lastTime) / 1000, 0.1);

      if (controls.isLocked) {
        velocity.y -= 28 * delta;
        const speed = keys['ShiftLeft'] ? 16 : 8;
        if (keys['KeyW']) controls.moveForward(speed * delta);
        if (keys['KeyS']) controls.moveForward(-speed * delta);
        if (keys['KeyA']) controls.moveRight(-speed * delta);
        if (keys['KeyD']) controls.moveRight(speed * delta);

        const bx = Math.floor(camera.position.x);
        const bz = Math.floor(camera.position.z);
        const by = Math.floor(camera.position.y - 1.6);
        const ground = worldData.current.get(`${bx},${by},${bz}`);

        if (ground) {
          if (velocity.y < 0) {
            velocity.y = 0;
            camera.position.y = by + 1.65;
            if (keys['Space']) velocity.y = 11;
          }
        }
        camera.position.y += velocity.y * delta;
        updateChunks(camera.position.x, camera.position.z);

        onCoordinatesUpdate({
          x: Math.round(camera.position.x),
          y: Math.round(camera.position.y),
          z: Math.round(camera.position.z)
        });
      }

      renderer.render(scene, camera);
      lastTime = time;
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default GameEngine;
