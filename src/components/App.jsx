import React, { Component } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './Styles/GlobalStyle/GlobalStyle';
import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY_API = '34395621-a4ae5341feaa95111ecdda581';
// const search = 'yellow+flower';
const perPage = 12;

//* render > didMount > getItem > setState > update > render > didUpdate > setItem

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
  };

  async componentDidMount() {
    console.log('Змонтовано');
    // this.fetchImages();
  }

  async componentDidUpdate() {
    console.log('Апдейт');
    // this.fetchImages();
  }

  fetchImages = async (search, page = this.state.page) => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}&page=${this.state.page}`
      );
      console.log('Відправили пошуковий запит');

      console.log('Отримали відповідь -', response.data.hits);
      this.setState({
        images: response.data.hits,
      });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    }
  };

  onLoagMoreClick = search => {
    const page = this.setState(prevState => ({ page: prevState.page + 1 }));

    this.fetchImages(search, page);
    // console.log('Load more 2 ', search);
    // console.log();
  };

  render() {
    console.log(this.state);
    const { images, isLoading } = this.state;
    return (
      <StyledApp>
        <GlobalStyle />
        <Searchbar
          onSubmit={this.fetchImages}
          onLoagMoreClick={this.onLoagMoreClick}
        />
        {isLoading && <Loader />}
        <ImageGallery items={images} />
        {/* <Button onClick={this.onLoadMoreClick} /> */}
      </StyledApp>
    );
  }
}
