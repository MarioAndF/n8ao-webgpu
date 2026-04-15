import { Object3D, UnsignedByteType } from "three";
import {
  diffuseColor,
  directionToColor,
  mrt,
  normalView,
  output,
  pass,
} from "three/tsl";

export type N8AOScenePass = ReturnType<typeof pass>;

/**
 * Create a minimal scene pass with the beauty, depth, diffuse, and encoded
 * normal outputs needed by N8AONode.
 */
export function createN8AOScenePass(
  scene: Object3D,
  camera: object,
): N8AOScenePass {
  const scenePass = pass(scene as any, camera as any) as N8AOScenePass & {
    getTexture(name: string): { type?: number };
    setMRT(node: unknown): void;
  };

  scenePass.setMRT(
    mrt({
      output,
      diffuseColor,
      normal: directionToColor(normalView),
    }),
  );

  // Match the bandwidth optimization used by the original integration.
  scenePass.getTexture("diffuseColor").type = UnsignedByteType;
  scenePass.getTexture("normal").type = UnsignedByteType;

  return scenePass;
}
