import React, { Component } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY_API = '34395621-a4ae5341feaa95111ecdda581';
// const search = 'yellow+flower';
const perPage = '5';

export class App extends Component {
  state = {
    images: [],
  };

  fetchImages = async search => {
    try {
      const response = await axios.get(
        `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}`
      );
      console.log('пошуковий запит');

      this.setState({
        images: response.data.hits,
      });
      console.log(response.data.hits);
      console.log(this.state);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log(this.state);
    const { images } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.fetchImages} />
        <ImageGallery items={images} />
      </StyledApp>
    );
  }
}
