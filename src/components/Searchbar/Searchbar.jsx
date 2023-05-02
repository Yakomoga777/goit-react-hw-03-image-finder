import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import React, { Component } from 'react';
import {
  StyleSearchbar,
  StyleSearchForm,
  StyleButton,
  StyledButtonLable,
  StyleSerchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInputChange = evt => {
    this.setState({ search: evt.target.value });
  };

  onSubmit = evt => {
    const search = this.state.search.trim();

    evt.preventDefault();
    this.props.onSubmit(search);
  };

  onLoadMoreClick = search => {
    search = this.state.search.trim();

    this.props.onLoagMoreClick(search);
  };

  render() {
    const { search } = this.state;

    const { items, showLoadMoreBtn, onPicture } = this.props;

    return (
      <>
        <StyleSearchbar>
          <StyleSearchForm onSubmit={this.onSubmit}>
            <StyleButton type="submit">
              <StyledButtonLable>Search</StyledButtonLable>
            </StyleButton>

            <StyleSerchInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
              value={search}
            />
          </StyleSearchForm>
        </StyleSearchbar>

        <ImageGallery items={items} onPicture={onPicture} />
        {showLoadMoreBtn && <Button onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
