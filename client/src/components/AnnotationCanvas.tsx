/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  imageUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  annotations: any[];
  onSave: (annotations: any) => void;
}

const AnnotationCanvas: React.FC<Props> = ({ imageUrl, annotations, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allAnnotations, setAllAnnotations] = useState<any[]>(annotations);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      drawAnnotations();
    };
  }, [imageUrl, annotations]);

  const drawAnnotations = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    allAnnotations.forEach(annotation => {
      ctx.beginPath();
      annotation.forEach((point: { x: number; y: number }, index: number) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.stroke();
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentAnnotation([{ x: offsetX, y: offsetY }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentAnnotation([...currentAnnotation, { x: offsetX, y: offsetY }]);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    const image = new Image();
    image.src = imageUrl;
    ctx.drawImage(image, 0, 0);
    
    // Draw all previous annotations
    drawAnnotations();
    
    // Draw current annotation
    ctx.beginPath();
    currentAnnotation.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (currentAnnotation.length > 2) {
      const newAnnotations = [...allAnnotations, currentAnnotation];
      setAllAnnotations(newAnnotations);
      onSave(newAnnotations);
    }
    setIsDrawing(false);
    setCurrentAnnotation([]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default AnnotationCanvas;