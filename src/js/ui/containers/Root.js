import React, { Component } from 'react'
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


export default class Root extends Component {

  render() {
    return (
      <div>
        <Appbar title="LGTM画像アップローダー" iconElementLeft={<span />} />
        <div className={styles.upload_container}>
          <Paper className={styles.description_paper}>
            <Subheader>画像のアップロード</Subheader>
            <div className={styles.description_upload}>
              <DropZone className={styles.description_upload_dropzone} multiple={true}>
                <div><Icon name="upload" size="5x" /></div>
                <p className={styles.description_upload_text}>画像をここにドラッグ&amp;ドロップ</p>
              </DropZone>
              <p className={styles.description_upload_subtext}>または下のボタンから画像を選択できます</p>
              <RaisedButton className={styles.description_upload_button} label="画像を選択" primary={true} />
            </div>
          </Paper>
        </div>
        <Divider />
        <div className={styles.image_grid_wrapper}>
          <GridList cols={5} cellHeight={200} padding={10}>
            <Subheader>LGTM一覧</Subheader>
            <GridTile>
              <img className={styles.image} src="http://image.rakuten.co.jp/art298/cabinet/panel/fukusima/227sawa1145x75.jpg" />
            </GridTile>
          </GridList>
        </div>
      </div>
    );
  }
}
