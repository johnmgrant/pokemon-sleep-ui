export const getCanvas2dContext =
    (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null =>
      canvas.getContext('2d', {willReadFrequently: true});
