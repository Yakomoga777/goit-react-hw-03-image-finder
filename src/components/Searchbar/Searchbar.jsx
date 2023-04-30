import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { StyledImageGallery } from 'components/ImageGallery/ImageGallery.styled';
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
    const { search } = this.state;
    console.log('search -', search);
    evt.preventDefault();
    this.props.onSubmit(search);
  };

  onLoadMoreClick = search => {
    search = this.state.search;
    console.log(search);
    this.props.onLoagMoreClick(search);
    // this.fetchImages(search);
    // this.setState({ page: 2 });
    console.log('Load more');
  };

  render() {
    const { search } = this.state;
    // console.log(this.state);
    const { items } = this.props;
    console.log(items);
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

        <ImageGallery items={items} />
        <Button onClick={this.onLoadMoreClick} />
      </>
    );
  }
}
