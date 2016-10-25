import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/root'
import Appbar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import UploadBlock from 'ui/components/UploadBlock'
import ImageGridList from 'ui/components/ImageGridList'
import styles from 'root.css'

@connect(state => ({
  files: state.root.files || []
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
        <Appbar title="LGTM画像アップローダー" iconElementLeft={<span />} />
        <UploadBlock onCreateLgtmImage={this.onCreateLgtmImage.bind(this)} />
        <Divider />
        <ImageGridList images={this.props.files} />
        <div className={styles.list_bottom}>●</div>
      </div>
    );
  }
}
