import React from 'react';
import VirtualList from './VirtualList';
import ItemRenderer from './ItemRenderer';

interface ListItem {
  id: number;
  content: string;
}

const App: React.FC = () => {
  const items: ListItem[] = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    content: `Item ${i + 1}`
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Virtual List Example with Custom Renderer</h1>
      <VirtualList<ListItem>
        items={items}
        itemHeight={50}
        windowHeight={400}
        gapSize={10}
        renderItem={(item) => <ItemRenderer content={item.content} />}
      />
    </div>
  );
};

export default App;