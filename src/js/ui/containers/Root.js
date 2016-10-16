import React, { Component } from 'react'
import Appbar from 'material-ui/Appbar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { Toolbar } from 'material-ui/Toolbar'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/SubHeader'
import styles from 'root.css'


export default class Root extends Component {

  render() {
    return (
      <div>
        <Appbar title="LGTM画像アップローダー" />
        <Paper className={styles.description_wrapper}>
          <Subheader>画像のアップロード</Subheader>
          <div className={styles.description_text}>
            ここで画像アップロードできるようにする
          </div>
        </Paper>
        <Divider />
        <div className={styles.image_grid_wrapper}>
          <GridList cols={6} cellHeight={200} padding={10}>
            <Subheader>LGTM一覧</Subheader>
            <GridTile>
              <img src="http://image.rakuten.co.jp/art298/cabinet/panel/fukusima/227sawa1145x75.jpg" />
            </GridTile>
            <GridTile>
              <img src="http://image.rakuten.co.jp/art298/cabinet/panel/fukusima/227sawa1145x75.jpg" />
            </GridTile>
          </GridList>
        </div>
      </div>
    );
  }
}
