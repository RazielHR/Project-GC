import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/start.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      test.scene.add(gltfScene.scene);
    });

    const uvTexture = new THREE.TextureLoader().load('./assets/texture.png');
    const roundedBoxGeometry = new RoundedBoxGeometry(2, 2, 2);
    const roundedBoxMaterial = new THREE.MeshStandardMaterial({
      map: uvTexture,
    });
    const roundedBoxMesh = new THREE.Mesh(roundedBoxGeometry, roundedBoxMaterial);
    roundedBoxMesh.position.set(0.5, -1, 0.5);
    test.scene.add(roundedBoxMesh);

    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.y += 0.02;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;