import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/images/detail'
import TextField from 'material-ui/TextField'
import ClipBoardButton from 'react-clipboard.js'
import styles from 'images/detail.css'

@connect(state => ({
  image: state.app.images.detail.image
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Detail extends Component {

  getMarkdownText() {
    return this.props.image ? `![LGTM](${this.props.image.url})` : '';
  }

  componentDidMount() {
    this.props.actions.fetchImage(this.props.params.id);
  }

  render() {
    return (
      <div className={styles.detail}>
        <div className={styles.detail__image}>
          <If condition={this.props.image}>
            {this.props.image ? <div><img src={this.props.image.url} /></div> : ''}
          </If>
        </div>
        <div className={styles.detail__markdown}>
          <If condition={this.props.image}>
            <TextField fullWidth={true} multiLine={true} value={this.getMarkdownText()} />
            <ClipBoardButton data-clipboard-text={this.getMarkdownText()}>コピーする</ClipBoardButton>
          </If>
        </div>
      </div>
    );
  }
}
