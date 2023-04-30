import React from 'react';
import { StyledImageItem, StyledImageItemImg } from './ImageGalleryItem.styled';

export function ImageItem({ item }) {
  return (
    <StyledImageItem className="gallery-item">
      <StyledImageItemImg
        src={item.webformatURL}
        alt={item.tags}
      ></StyledImageItemImg>
    </StyledImageItem>
  );
}
