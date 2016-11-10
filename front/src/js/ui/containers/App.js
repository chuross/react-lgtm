import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from 'material-ui/AppBar'
import ForkRibbon from 'react-github-fork-ribbon'
import CircularProgress from 'material-ui/CircularProgress'
import styles from 'app.css'

@connect(state => ({
  isLoading: state.app.loading.isLoading
}))
export default class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <Appbar title="LGTM画像アップローダー(β)" iconElementLeft={<span />} />
        <ForkRibbon
          color='green'
          href='https://github.com/chuross/react-lgtm'>Fork me on GitHub</ForkRibbon>
        <div className={this.props.isLoading ? styles.app__loadingVisible : styles.app__loadingInvisible}>
          <CircularProgress />
        </div>
        {this.props.children}
      </div>
    );
  }
}
