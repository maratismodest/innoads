import React, { useEffect, useRef, useState } from 'react';

interface Item {
  id: number;
}

interface VirtualListProps<T extends Item> {
  items: T[];
  itemHeight: number;
  windowHeight: number;
  gapSize: number;
  renderItem: (item: T) => React.ReactNode;
}

function VirtualList<T extends Item>({
                                       items,
                                       itemHeight,
                                       windowHeight,
                                       gapSize,
                                       renderItem,
                                     }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemHeightWithGap = itemHeight + gapSize;
  const visibleItemCount = Math.ceil(windowHeight / itemHeightWithGap);
  const startIndex = Math.floor(scrollTop / itemHeightWithGap);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: `${windowHeight}px` }}
    >
      <ul style={{ height: `${items.length * itemHeightWithGap - gapSize}px`, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <li
            key={item.id}
            className="absolute w-full"
            style={{
              height: `${itemHeight}px`,
              top: `${(startIndex + index) * itemHeightWithGap}px`,
            }}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VirtualList;