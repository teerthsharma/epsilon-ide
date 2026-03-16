import React, { useRef, useCallback, useState, useEffect } from 'react';
import './ResizeHandle.css';

interface ResizeHandleProps {
  direction: 'horizontal' | 'vertical';
  onResize: (size: number) => void;
  minSize?: number;
  maxSize?: number;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction,
  onResize,
  minSize = 160,
  maxSize = 500,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
  }, [direction]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = direction === 'horizontal'
        ? e.clientX - startPosRef.current
        : startPosRef.current - e.clientY;
      
      const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta));
      onResize(newSize);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, minSize, maxSize, onResize]);

  return (
    <div
      className={`resize-handle resize-handle-${direction} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
    />
  );
};
