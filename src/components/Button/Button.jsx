import React, { Component } from 'react';
import { StyledButton } from './Button.styled';

export class Button extends Component {
  onBtnClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <StyledButton type="button" onClick={this.onBtnClick}>
        Load more
      </StyledButton>
    );
  }
}
