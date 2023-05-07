import React, { Component } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';

import { fetchImages } from 'services/api';
import { GlobalStyle } from './Styles/GlobalStyle/GlobalStyle';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

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
    searchQuery: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true });

        const response = await fetchImages(searchQuery, page, perPage);
        this.setState({ images: response.data.hits });

        // Перевірка на кнопку
        if (response.data.totalHits > perPage) {
          this.setState({
            showLoadMoreBtn: true,
          });
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      }
    }
    if (prevState.searchQuery === searchQuery && prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const response = await fetchImages(searchQuery, page, perPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: this.state.page,
        }));
        console.log(response);

        // Перевірка на кнопку
        if (response.data.totalHits > this.state.page * perPage) {
          this.setState({
            showLoadMoreBtn: true,
          });
        } else {
          this.setState({
            showLoadMoreBtn: false,
          });
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      }

      console.log('Апдейт PAGE');
    } else if (
      prevState.searchQuery !== searchQuery &&
      prevState.page !== page
    ) {
      console.log('Привіт');
    }
  }

  onSubmit = search => {
    this.setState({ searchQuery: search, page: 1 });
  };

  onLoadMoreClick = async search => {
    console.log(search);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onPicture = index => {
    const { images } = this.state;
    const picture = images.filter(image => image.id === +index);

    this.toogleModal();
    this.setState({ largeImageURL: picture[0].largeImageURL });
  };

  toogleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { images, isLoading, showLoadMoreBtn, showModal, largeImageURL } =
      this.state;

    return (
      <StyledApp>
        {showModal && (
          <Modal onCloseModal={this.toogleModal}>
            {<img src={largeImageURL} alt={this.alt}></img>}
          </Modal>
        )}
        <GlobalStyle />
        <Searchbar
          onSubmit={this.onSubmit}
          onLoadMoreClick={this.onLoadMoreClick}
          items={images}
          showLoadMoreBtn={showLoadMoreBtn}
          onPicture={this.onPicture}
        />
        {isLoading && <Loader />}
      </StyledApp>
    );
  }
}
