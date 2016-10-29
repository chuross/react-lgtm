import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/images/detail'

@connect(state => ({
  image: state.app.images.detail.image
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Detail extends Component {

  componentDidMount() {
    this.props.actions.fetchImage(this.props.params.id);
  }

  render() {
    return (
      <div>
        {this.props.image ? <div><img src={this.props.image.url} /></div> : ''}
      </div>
    );
  }
}
