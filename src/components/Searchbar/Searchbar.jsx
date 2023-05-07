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
    searchQuery: '',
  };

  // componentDidMount() {
  //   console.log('Змонтовано');
  // }

  // componentDidUpdate() {
  //   // console.log('Апдейт');
  // }

  handleInputChange = evt => {
    this.setState({ searchQuery: evt.target.value });
  };

  onSubmit = evt => {
    const searchQuery = this.state.searchQuery.trim();

    evt.preventDefault();
    this.props.onSubmit(searchQuery);
  };

  onLoadMoreClick = searchQuery => {
    searchQuery = this.state.searchQuery;
    console.log(searchQuery);

    this.props.onLoadMoreClick(searchQuery);
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
        {/* <Button type="button" onClick={this.onLoadMoreClick} /> */}
      </>
    );
  }
}
