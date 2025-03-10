import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OcrImporterProcessedImageProps} from '@/components/ocr/importer/controls/processed/type';


export const OcrImporterProcessedImageCanvas = ({processed}: OcrImporterProcessedImageProps) => {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refCanvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const container = refContainer.current;
    if (!processed || !container) {
      return;
    }

    const context = refCanvas.current?.getContext('2d');
    if (!context) {
      return;
    }

    context.canvas.height = processed.height;
    context.canvas.width = processed.width;

    requestAnimationFrame(() => context.putImageData(processed, 0, 0));
  }, []);

  return (
    <Flex ref={refContainer} noFullWidth className="w-full p-2 sm:w-[60vw]">
      <canvas ref={refCanvas}/>
    </Flex>
  );
};
