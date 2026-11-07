export function addBoundaryPoints(
  landmarks: [number, number][],
  width: number,
  height: number,
): [number, number][] {
  const boundary: [number, number][] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
    [0, height / 2],
    [width / 4, 0],
    [(width * 3) / 4, 0],
    [width, height / 4],
    [width, (height * 3) / 4],
    [width / 4, height],
    [(width * 3) / 4, height],
    [0, height / 4],
    [0, (height * 3) / 4],
  ];
  return [...landmarks, ...boundary];
}

export async function computeTriangulation(
  _points: [number, number][],
): Promise<number[]> {
  return [];
}

export function warpImage(
  targetCanvas: HTMLCanvasElement,
  sourceCanvas: HTMLCanvasElement,
  _srcPoints: [number, number][],
  _dstPoints: [number, number][],
  _triangles: number[],
): void {
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;
  targetCanvas.width = sourceCanvas.width;
  targetCanvas.height = sourceCanvas.height;
  ctx.drawImage(sourceCanvas, 0, 0);
}

