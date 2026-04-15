import { describe, expect, it } from "vitest";
import {
  createDefaultN8AOConfiguration,
  DepthType,
  generateDenoiseSamples,
  generateHemisphereSamples,
  resolveDisplayMode,
} from "./math.js";

describe("n8ao webgpu math", () => {
  it("matches upstream n8ao configuration defaults", () => {
    expect(createDefaultN8AOConfiguration()).toMatchObject({
      aoSamples: 16,
      aoRadius: 5,
      aoTones: 0,
      denoiseSamples: 8,
      denoiseRadius: 12,
      distanceFalloff: 1,
      intensity: 5,
      denoiseIterations: 2,
      renderMode: 0,
      biasOffset: 0,
      biasMultiplier: 0,
      gammaCorrection: true,
      depthBufferType: DepthType.Default,
      screenSpaceRadius: false,
      halfRes: false,
      depthAwareUpsampling: true,
      autoRenderBeauty: true,
      colorMultiply: true,
      transparencyAware: false,
      stencil: false,
      accumulate: false,
    });
  });

  it("generates the same hemisphere sample distribution as upstream n8ao", () => {
    const samples = generateHemisphereSamples(4);

    expect(samples.map((sample) => sample.toArray())).toEqual([
      [0.3535533905932738, 0, 0.9354143466934853],
      [-0.4515442808474507, 0.4136517405184686, 0.7905694150420949],
      [0.06911574220702117, -0.7875423888141976, 0.6123724356957944],
      [0.56914295125945, 0.7423451360598271, 0.3535533905932738],
    ]);
  });

  it("generates the same denoise poisson pattern as upstream n8ao", () => {
    const samples = generateDenoiseSamples(4, 11);

    expect(samples.map((sample) => sample.toArray())).toEqual([
      [0.35355339059327373, 0],
      [-1.4567267349998804e-15, -0.5946035575013605],
      [-0.8059274488676564, 3.948903589373758e-15],
      [7.349737736793884e-15, 1],
    ]);
  });

  it("resolves N8AO display modes to upstream numeric values", () => {
    expect(resolveDisplayMode("Combined")).toBe(0);
    expect(resolveDisplayMode("AO")).toBe(1);
    expect(resolveDisplayMode("No AO")).toBe(2);
    expect(resolveDisplayMode("Split")).toBe(3);
    expect(resolveDisplayMode("Split AO")).toBe(4);
  });
});
