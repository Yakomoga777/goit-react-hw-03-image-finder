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
    evt.preventDefault();
    this.props.onSubmit(search);
  };

  render() {
    const { search } = this.state;
    console.log(this.state);
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
      </>
    );
  }
}
