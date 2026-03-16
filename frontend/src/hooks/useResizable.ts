import { useState, useCallback, useEffect, RefObject } from 'react';

interface UseResizableOptions {
  initialSize: number;
  minSize: number;
  maxSize: number;
  direction: 'horizontal' | 'vertical';
}

export const useResizable = (
  handleRef: RefObject<HTMLDivElement>,
  options: UseResizableOptions
) => {
  const [size, setSize] = useState(options.initialSize);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = options.direction === 'horizontal' ? e.movementX : -e.movementY;
      setSize((prevSize) => {
        const newSize = prevSize + delta;
        return Math.max(options.minSize, Math.min(options.maxSize, newSize));
      });
    },
    [isDragging, options.direction, options.minSize, options.maxSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    handle.addEventListener('mousedown', handleMouseDown);

    return () => {
      handle.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleRef, handleMouseDown]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { size, isDragging };
};
