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
import { Icon } from 'react-fa'
import DropZone from 'react-dropzone'
import styles from 'root.css'

@connect(state => ({
  file: state.root.file
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Root extends Component {

  onUploadButtonClick() {
    this.dropzone.open();
  }

  onImageDrop(acceptedFiles, rejectedFiles) {
    this.props.actions.uploadFileAction(acceptedFiles[0]);
  }

  drawLgtmImage() {
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
                <div><Icon name="upload" size="5x" /></div>
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
          { (() => { if (this.props.file != null) return <img src={this.props.file.preview} /> })() }
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
