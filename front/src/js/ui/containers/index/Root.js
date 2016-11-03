import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/index/root'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import UploadBlock from 'ui/components/UploadBlock'
import ImageGridList from 'ui/components/ImageGridList'
import styles from 'index/root.css'

@connect(state => ({
  images: state.app.index.images || [],
  isScrollEnd: state.app.index.isScrollEnd
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Root extends Component {

  componentDidMount() {
    this.props.actions.fetchImages();
  }

  onCreateLgtmImage(blob) {
    this.props.actions.uploadImage(blob);
  }

  onAppendImageRequest() {
    this.props.actions.fetchImages(this.props.images.length);
  }

  render() {
    return (
      <div>
        <UploadBlock onCreateLgtmImage={this.onCreateLgtmImage.bind(this)} />
        <Divider />
        <ImageGridList images={this.props.images} />
        <Choose>
          <When condition={this.props.isScrollEnd}>
            <div className={styles.scrollEnd}>●</div>
          </When>
          <Otherwise>
            <div className={styles.appendButton}>
              <Divider />
              <FlatButton className={styles.appendButton__button} label="追加で読み込む" primary={true} onClick={this.onAppendImageRequest.bind(this)} />
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
