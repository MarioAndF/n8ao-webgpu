declare module "three/webgpu" {
  import type { DepthTexture, Texture } from "three";

  export class NodeMaterial {
    name: string;
    depthTest: boolean;
    depthWrite: boolean;
    fragmentNode: any;
    depthNode: any;
    needsUpdate: boolean;
    dispose(): void;
  }

  export class QuadMesh {
    material: NodeMaterial | null;
    name: string;
    render(renderer: any): void;
  }

  export class RenderTarget {
    constructor(width?: number, height?: number, options?: any);
    texture: Texture;
    textures: Texture[];
    depthTexture: DepthTexture | null;
    setSize(width: number, height: number): void;
    dispose(): void;
  }

  export class TempNode {
    constructor(type?: string);
  }

  export const RendererUtils: {
    resetRendererState(renderer: any, state: any): any;
    restoreRendererState(renderer: any, state: any): void;
  };
}

declare module "three/tsl" {
  export const Fn: any;
  export const If: any;
  export const Loop: any;
  export const NodeUpdateType: any;
  export const abs: any;
  export const clamp: any;
  export const cross: any;
  export const diffuseColor: any;
  export const directionToColor: any;
  export const distance: any;
  export const dot: any;
  export const exp: any;
  export const float: any;
  export const floor: any;
  export const fwidth: any;
  export const getScreenPosition: any;
  export const getViewPosition: any;
  export const int: any;
  export const ivec2: any;
  export const mat2: any;
  export const max: any;
  export const min: any;
  export const mix: any;
  export const mrt: any;
  export const normalView: any;
  export const normalize: any;
  export const output: any;
  export const pass: any;
  export const passTexture: any;
  export const pow: any;
  export const property: any;
  export const sRGBTransferOETF: any;
  export const smoothstep: any;
  export const step: any;
  export const sub: any;
  export const texture: any;
  export const textureLoad: any;
  export const uniform: any;
  export const uniformArray: any;
  export const uv: any;
  export const vec2: any;
  export const vec3: any;
  export const vec4: any;
}