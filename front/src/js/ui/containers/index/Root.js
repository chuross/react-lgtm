import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/index/root'
import Divider from 'material-ui/Divider'
import UploadBlock from 'ui/components/UploadBlock'
import ImageGridList from 'ui/components/ImageGridList'
import styles from 'index/root.css'

@connect(state => ({
  images: state.app.index.images || []
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Root extends Component {

  onCreateLgtmImage(blob) {
    this.props.actions.uploadImage(blob);
  }

  componentDidMount() {
    this.props.actions.fetchImages();
  }

  render() {
    return (
      <div>
        <UploadBlock onCreateLgtmImage={this.onCreateLgtmImage.bind(this)} />
        <Divider />
        <ImageGridList images={this.props.images} />
        <div className={styles.listBottom}>●</div>
      </div>
    );
  }
}
