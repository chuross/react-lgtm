import React, { Component } from 'react'
import Appbar from 'material-ui/Appbar'
import styles from '../../../css/base.css'


export default class Root extends Component {

  render() {
    return (
      <div className={styles.hoge}>
        <Appbar />
      </div>
    );
  }
}
