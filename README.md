# n8ao-webgpu

Unofficial Three.js WebGPU/TSL adaptation of N8AO.

This package was extracted from an internal project after implementing a reusable WebGPU path based on the behavior, configuration model, and conventions of N8AO by N8python.

Status:

- experimental
- unofficial
- tested against `three@0.182.x`

## What It Provides

`n8ao-webgpu` exposes:

- `N8AONode` as the core AO compositor node
- `createN8AOScenePass()` as a small helper for creating the required beauty/depth/normal scene pass
- upstream-aligned config helpers such as `createDefaultN8AOConfiguration()`, `applyQualityMode()`, and `resolveDisplayMode()`

It does not attempt to wrap React, R3F, or postprocessing libraries directly.

## Compatibility

- `three@^0.182.0`
- Three.js WebGPU/TSL pipeline
- package format: ESM

## Install

```bash
npm install n8ao-webgpu three
```

Peer dependency:

- `three@^0.182.0`

## Why This Exists

Upstream N8AO currently targets WebGL and explicitly notes that WebGPU is not officially supported yet. This package adapts the same AO approach to Three.js WebGPU/TSL so it can be reused in projects that already use the node-based WebGPU pipeline.

## Live Reference

This package was extracted from the WebGPU AO work originally developed for OpenHuman Atlas.

- Live atlas reference: https://atlas.openhumanatlas.com
- Main site: https://www.openhumanatlas.com

Treat OpenHuman Atlas as the public production reference for the original integration lineage behind this package.

## Basic Usage

```ts
import { PostProcessing } from "three/webgpu";
import { N8AONode, createN8AOScenePass } from "n8ao-webgpu";

const scenePass = createN8AOScenePass(scene, camera);

const n8ao = new N8AONode({
  beautyNode: scenePass.getTextureNode("output"),
  beautyTexture: scenePass.getTexture("output"),
  depthNode: scenePass.getTextureNode("depth"),
  depthTexture: scenePass.getTexture("depth"),
  normalNode: scenePass.getTextureNode("normal"),
  normalTexture: scenePass.getTexture("normal"),
  scenePassNode: scenePass,
  scene,
  camera,
});

n8ao.configuration.screenSpaceRadius = true;
n8ao.configuration.aoRadius = 32;
n8ao.configuration.halfRes = true;
n8ao.configuration.depthAwareUpsampling = true;

const post = new PostProcessing(renderer);
post.outputNode = n8ao.getTextureNode();
```

## When To Use It

Use this package if:

- you are already on Three.js WebGPU
- you want an N8AO-like AO pipeline in TSL/node-based rendering
- you are comfortable wiring your own scene pass and post-processing flow

Do not use this package if:

- you need a WebGL drop-in AO pass
- you want a React-only abstraction
- you need a fully stable, upstream-supported API surface

## Notes

- `scenePassNode` is optional, but recommended when the scene pass is not already guaranteed to receive its own `updateBefore()` calls each frame.
- The helper preserves the bandwidth optimization from the original extraction by forcing the diffuse and normal MRT textures to `UnsignedByteType`.
- The config intentionally keeps some upstream fields for parity even if not all of them are currently wired in the WebGPU path.

## Caveats

- This is not an official upstream N8AO package.
- The API is intentionally close to the original extraction, but may still change.
- It assumes familiarity with Three.js WebGPU render-graph style setup.

## Attribution

This package is derived from and inspired by:

- N8AO by N8python: https://github.com/N8python/n8ao

See `NOTICE.md` for attribution and licensing background.

## Validation

This repo is validated with:

- `pnpm test`
- `pnpm build`
