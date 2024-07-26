import React from 'react';

interface ItemProps {
  content: string;
}

const ItemRenderer: React.FC<ItemProps> = ({ content }) => (
  <div className="px-4 py-2 bg-white rounded-lg shadow">
    {content}
  </div>
);

export default ItemRenderer;