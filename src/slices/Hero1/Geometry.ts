import * as THREE from "three";

// ── Default positions ─────────────────────────────────────────────
export const defaultPositions: Record<string, [number, number, number]> = {
  gem: [0, 0, 1],
  donut: [-1, -1, 7],
  pillowSphere: [2.2, 3, -1.5],
  diamond: [-1.5, 2.5, 3],
};

// ── Default scales ───────────────────────────────────────────────
export const defaultScales: Record<string, number> = {
  gem: 1.1,
  donut: 0.95,
  pillowSphere: 1,
  diamond: 1,
};

// ── Geometries ─────────────────────────────────────────────────
export const geometries = {
  gem: (() => {
    const geo = new THREE.IcosahedronGeometry(3, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const normal = new THREE.Vector3(x, y, z).normalize();
      const offset = 0.15 * (Math.random() - 0.5);
      const stretch = 1 + 0.1 * (Math.random() - 0.5);
      pos.setXYZ(i, x * stretch + normal.x * offset, y * stretch + normal.y * offset, z * stretch + normal.z * offset);
    }
    geo.computeVertexNormals();
    return geo;
  })(),

  donut: (() => {
    const geo = new THREE.TorusGeometry(0.8, 0.35, 32, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const normal = new THREE.Vector3(x, y, z).normalize();
      const offset = 0.06 * (Math.random() - 0.5);
      pos.setXYZ(i, x + normal.x * offset, y + normal.y * offset, z + normal.z * offset);
    }
    geo.computeVertexNormals();
    return geo;
  })(),

  pillowSphere: (() => {
    const geo = new THREE.SphereGeometry(1.5, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const normal = new THREE.Vector3(x, y, z).normalize();
      const offset = 0.15 * (Math.random() - 0.5);
      pos.setXYZ(i, x + normal.x * offset, y + normal.y * offset, z + normal.z * offset);
    }
    geo.computeVertexNormals();
    return geo;
  })(),

  diamond: (() => {
    const geo = new THREE.OctahedronGeometry(1.5, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const normal = new THREE.Vector3(x, y, z).normalize();
      const offset = 0.10 * (Math.random() - 0.5);
      pos.setXYZ(i, x + normal.x * offset, y + normal.y * offset, z + normal.z * offset);
    }
    geo.computeVertexNormals();
    return geo;
  })(),
};

// ── Materials ────────────────────────────────────────────────
export const amberMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff2f00,
  roughness: 0.05,
  metalness: 0,
  transmission: 1,
  thickness: 1,
  ior: 2.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1,
  transparent: true,
  side: THREE.DoubleSide,
});

export const cyanMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x00d9ff,
  roughness: 0.05,
  metalness: 0,
  transmission: 1,
  thickness: 1,
  ior: 2.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1,
  transparent: true,
  side: THREE.DoubleSide,
});

export const silverMaterial = new THREE.MeshStandardMaterial({
  color: 0xe8ebf0,
  roughness: 0.28,
  metalness: 1,
});

export const materials = [
  silverMaterial,
  new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.35, metalness: 0.8 }),
  new THREE.MeshStandardMaterial({ color: 0xb0b0b0, roughness: 0.4, metalness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.3, metalness: 0.9 }),
];
