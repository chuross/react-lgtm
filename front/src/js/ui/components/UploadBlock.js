import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload'
import DropZone from 'react-dropzone'
import styles from 'upload-block.css'

const maxImageSize = 400;
const lgtmOffset = 20;
const lgtmFontSize = 50;

export default class UploadBlock extends Component {

  static propTypes = {
    onCreateLgtmImage: React.PropTypes.func
  };

  onUploadButtonClick() {
    this.dropzone.open();
  }

  onImageDrop(acceptedFiles, rejectedFiles) {
    this.createLgtmImage(acceptedFiles[0]);
  }

  createLgtmImage(file) {
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

      canvas.toBlob(blob => this.props.onCreateLgtmImage(blob));
    }
  }

  render() {
    return (
      <div className={styles.uploadBlock}>
          <div className={styles.uploadBlock__description}>
            <DropZone
              className={styles.uploadBlock__description__dropzone}
              ref={(node) => { this.dropzone = node; }}
              accept="image/gif,image/jpeg,image/png,image/jpg"
              disableClick={true}
              onDrop={this.onImageDrop.bind(this)}>
              <div><FileUploadIcon style={{ width: '100px', height: '100px'}} /></div>
              <p className={styles.uploadBlock__description__text}>画像をここにドラッグ&amp;ドロップ</p>
            </DropZone>
            <p className={styles.uploadBlock__description__subtext}>または下のボタンから画像を選択できます</p>
            <RaisedButton
              className={styles.uploadBlock__description__uploadButton}
              label="画像を選択"
              primary={true}
              onClick={this.onUploadButtonClick.bind(this)} />
          </div>
      </div>
    );
  }
}
