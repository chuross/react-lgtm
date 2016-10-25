import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import Paper from 'material-ui/Paper'
import styles from 'image-grid-list.css'

export default class ImageGridList extends Component {

  static propsType = {
    images: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  render() {
    return (
      <div className={styles.image_grid_wrapper}>
        <GridList cols={5} cellHeight={200} padding={10}>
          {this.props.images.map(file => (
            <GridTile key={file.id}>
              <Paper className={styles.image_wrapper}>
                <img className={styles.image} src={file.url} />
              </Paper>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}
