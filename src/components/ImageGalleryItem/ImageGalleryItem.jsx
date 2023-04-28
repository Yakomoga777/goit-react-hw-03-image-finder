import React from 'react';

export function ImageItem({ item }) {
  //   const { id, webformatURL, tags } = item;
  //   console.log(id, webformatURL, tags);
  return (
    <li className="gallery-item">
      <img src={item.webformatURL} alt={item.tags}></img>
    </li>
  );
}
