import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/root'
import Appbar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import { GridList, GridTile } from 'material-ui/GridList'
import UploadBlock from 'ui/components/UploadBlock'
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
        <div className={styles.image_grid_wrapper}>
          <GridList cols={5} cellHeight={200} padding={10}>
            {this.props.files.map(file => (
              <GridTile key={file.id}>
                <img className={styles.image} src={file.url} />
              </GridTile>
            ))}
          </GridList>
          <div className={styles.list_bottom}>●</div>
        </div>
      </div>
    );
  }
}
