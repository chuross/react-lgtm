import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'
import styles from 'app.css'

@connect(state => ({
  isLoading: state.app.loading.isLoading
}))
export default class App extends Component {

  render() {
    return (
      <div>
        {this.props.children}
        <div className={this.props.isLoading ? styles.loading_visible : styles.loading_invisible}>
          <CircularProgress />
        </div>
      </div>
    );
  }
}
