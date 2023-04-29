import React from 'react';
import { StyledImageItem, StyledImageItemImg } from './ImageGalleryItem.styled';

export function ImageItem({ item }) {
  //   const { id, webformatURL, tags } = item;
  //   console.log(id, webformatURL, tags);
  return (
    <StyledImageItem className="gallery-item">
      <StyledImageItemImg
        src={item.webformatURL}
        alt={item.tags}
      ></StyledImageItemImg>
    </StyledImageItem>
  );
}
