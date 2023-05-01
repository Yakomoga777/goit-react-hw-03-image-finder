import React, { Component } from 'react';
import { StyleBackdrop, StyleModal } from './Modal.styled';
export default class Modal extends Component {
  render() {
    const { showModal } = this.props;
    return (
      <>
        {showModal && (
          <StyleBackdrop>
            <StyleModal>{this.props.children}</StyleModal>
          </StyleBackdrop>
        )}
      </>
    );
  }
}
