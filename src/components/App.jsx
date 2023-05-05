import React, { Component } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
// import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './Styles/GlobalStyle/GlobalStyle';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
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
    largeImageURL: '',
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

      // console.log('Відправили пошуковий запит');

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
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    }
  };

  onLoagMoreClick = async search => {
    console.log(search);

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
      console.log(response, this.state.images);
      if (response.data.totalHits > (this.state.page + 1) * perPage) {
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

      console.log(this.state);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
    }
  };

  // onPicture = index => {
  //   const { images } = this.state;
  //   const picture = images.filter(image => image.id === +index);

  //   this.toogleModal();
  //   this.setState({ largeImageURL: picture[0].largeImageURL });
  // };

  // toogleModal = () => {
  //   this.setState(prevState => ({ showModal: !prevState.showModal }));
  // };

  render() {
    const { images, isLoading, showLoadMoreBtn, showModal, largeImageURL } =
      this.state;
    console.log(this.state.images);
    return (
      <StyledApp>
        {showModal && (
          <Modal onCloseModal={this.toogleModal}>
            {<img src={largeImageURL} alt={this.alt}></img>}
          </Modal>
        )}
        <GlobalStyle />
        <Searchbar
          onSubmit={this.fetchImages}
          onLoagMoreClick={this.onLoagMoreClick}
          items={images}
          showLoadMoreBtn={showLoadMoreBtn}
          onPicture={this.onPicture}
        />
        {isLoading && <Loader />}
      </StyledApp>
    );
  }
}
