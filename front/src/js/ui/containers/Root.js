import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/root'
import Appbar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar } from 'material-ui/Toolbar'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload'
import DropZone from 'react-dropzone'
import styles from 'root.css'

const maxImageSize = 400;
const lgtmOffset = 20;
const lgtmFontSize = 50;

@connect(state => ({
  files: state.root.files || []
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Root extends Component {

  onUploadButtonClick() {
    this.dropzone.open();
  }

  onImageDrop(acceptedFiles, rejectedFiles) {
    this.uploadImageFile(acceptedFiles[0]);
  }

  uploadImageFile(file) {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = file.preview;
    image.onload = () => {
      const scale = maxImageSize / Math.max(image.width, image.height);
      const width = scale < 1 ? image.width * scale : image.width;
      const height = scale < 1 ? image.height * scale : image.height;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, width, height);
      context.font = `${lgtmFontSize}px Arial Black`;
      context.lineWidth = 5;
      context.fillStyle = 'white';
      context.textAlign = 'right';
      context.textBaseline = 'bottom';

      context.strokeText('LGTM', width - lgtmOffset, height - lgtmOffset, width - lgtmOffset);
      context.fillText('LGTM', width - lgtmOffset, height - lgtmOffset, width  - lgtmOffset);

      canvas.toBlob(blob => this.props.actions.uploadImage(blob));
    }
  }

  componentDidMount() {
    this.props.actions.fetchImages();
  }

  render() {
    return (
      <div>
        <Appbar title="LGTM画像アップローダー" iconElementLeft={<span />} />
        <div className={styles.upload_container}>
            <div className={styles.description_upload}>
              <DropZone
                className={styles.description_upload_dropzone}
                ref={(node) => { this.dropzone = node; }}
                accept="image/gif,image/jpeg,image/png,image/jpg"
                disableClick={true}
                onDrop={this.onImageDrop.bind(this)}>
                <div><FileUploadIcon style={{ width: '100px', height: '100px'}} /></div>
                <p className={styles.description_upload_text}>画像をここにドラッグ&amp;ドロップ</p>
              </DropZone>
              <p className={styles.description_upload_subtext}>または下のボタンから画像を選択できます</p>
              <RaisedButton
                className={styles.description_upload_button}
                label="画像を選択"
                primary={true}
                onClick={this.onUploadButtonClick.bind(this)} />
            </div>
        </div>
        <Divider />
        <div className={styles.image_grid_wrapper}>
          <GridList cols={5} cellHeight={200} padding={10}>
            {this.props.files.map(file => (
              <GridTile key={file.id}>
                <img className={styles.image} src={file.url} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
