import React from 'react';
import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ items }) {
  console.log(items);

  return (
    <ul className="gallery">
      {items.map(item => {
        console.log(item);
        return <ImageItem key={item.id} item={item} />;
      })}
    </ul>
  );
}
