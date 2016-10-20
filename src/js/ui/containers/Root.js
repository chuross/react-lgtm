import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/root'
import Appbar from 'material-ui/Appbar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar } from 'material-ui/Toolbar'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/SubHeader'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload'
import DropZone from 'react-dropzone'
import styles from 'root.css'

const maxImageSize = 400;
const lgtmRelativeX = 0.9;
const lgtmRelativeY = 0.98;
const lgtmFontSize = 40;

@connect(state => ({
  file: state.root.file
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Root extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.file) {
      this.updateImageCanvas(nextProps);
    }
  }

  onUploadButtonClick() {
    this.dropzone.open();
  }

  onImageDrop(acceptedFiles, rejectedFiles) {
    this.props.actions.uploadFileAction(acceptedFiles[0]);
  }

  updateImageCanvas(props) {
    const canvas = this.refs.canvas;
    const image = new Image();
    image.src = props.file.preview;
    image.onload = () => {
      const scale = maxImageSize / Math.max(image.width, image.height);
      const width = scale < 1 ? image.width * scale : image.width;
      const height = scale < 1 ? image.height * scale : image.height;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, width, height);
      context.font = `${lgtmFontSize}px Arial`;
      context.fillStyle = 'white';
      context.textAlign = 'right';
      context.textBaseline = 'bottom';
      context.fillText('LGTM', width * lgtmRelativeX, height * lgtmRelativeY, width);
      context.strokeText('LGTM', width * lgtmRelativeX, height * lgtmRelativeY, width);
    }
  }

  render() {
    return (
      <div>
        <Appbar title="LGTM画像アップローダー" iconElementLeft={<span />} />
        <div className={styles.upload_container}>
          <Paper className={styles.description_paper}>
            <Subheader>画像のアップロード</Subheader>
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
          </Paper>
          <canvas ref="canvas" className="image" />
        </div>
        <Divider />
        <div className={styles.image_grid_wrapper}>
          <GridList cols={5} cellHeight={200} padding={10}>
            <GridTile>
              <img className={styles.image} src="http://image.rakuten.co.jp/art298/cabinet/panel/fukusima/227sawa1145x75.jpg" />
            </GridTile>
          </GridList>
        </div>
      </div>
    );
  }
}
