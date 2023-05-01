import React, { Component } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
// import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './Styles/GlobalStyle/GlobalStyle';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
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
    error: null,
    showLoadMoreBtn: false,
    showModal: false,
  };

  async componentDidMount() {
    console.log('Змонтовано');
  }

  async componentDidUpdate() {
    console.log('Апдейт');
  }

  fetchImages = async search => {
    if (this.state.error) {
      this.setState({ error: null });
    }
    try {
      this.setState({ isLoading: true });
      let response = await axios.get(
        `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}&page=1`
      );

      console.log('Відправили пошуковий запит');

      console.log('Отримали відповідь -', response.data);

      console.log(Math.floor(response.data.totalHits / perPage));
      if (
        response.data.totalHits < (this.state.page + 1) * perPage ||
        response.data.hits === []
      ) {
        this.setState({ page: 1, showLoadMoreBtn: false });
      } else {
        this.setState({ page: 1, showLoadMoreBtn: true });
      }

      this.setState({
        images: response.data.hits,
        // page: this.state.page,
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

  onLoagMoreClick = async search => {
    if (this.state.error) {
      this.setState({ error: null });
    }
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}&page=${
          this.state.page + 1
        }`
      );

      if (response.data.totalHits > (this.state.page + 1) * perPage) {
        console.log(this.state.page);
        this.setState({
          showLoadMoreBtn: true,
        });
      } else {
        this.setState({
          showLoadMoreBtn: false,
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        page: prevState.page + 1,
      }));
      // this.setState({ page: this.state.page + 1 });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    }
  };

  onPicture = index => {
    console.log(index);
    const { images } = this.state;
    const picture = images.filter(image => image.id === +index);
    console.log(picture[0].largeImageURL);
    this.toogleModal();
    return toString(picture[0].largeImageURL);
  };

  toogleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    console.log(this.state);
    const { images, isLoading, showLoadMoreBtn, showModal } = this.state;
    return (
      <StyledApp>
        <Modal showModal={showModal}>
          {<img src={this.onPicture} alt={this.alt}></img>}
          {/* <p>Привіт</p> */}
        </Modal>
        <GlobalStyle />
        <Searchbar
          onSubmit={this.fetchImages}
          onLoagMoreClick={this.onLoagMoreClick}
          items={images}
          showLoadMoreBtn={showLoadMoreBtn}
          onPicture={this.onPicture}
        />
        {isLoading && <Loader />}
        {/* <Button onClick={this.onLoadMoreClick} /> */}
      </StyledApp>
    );
  }
}
