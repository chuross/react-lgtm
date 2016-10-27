import React, { Component } from 'react'

export default class Detail extends Component {

  render() {
    return (
      <p>{this.props.params.id} hello</p>
    );
  }
}
