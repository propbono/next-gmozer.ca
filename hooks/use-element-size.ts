import { useEffect, useRef, useState } from "react";

export const useElementSize = <T extends HTMLElement = HTMLDivElement>() => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [elementRef, size] as const;
};
