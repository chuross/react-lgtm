import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'ui/actions/images/detail'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import ClipBoardButton from 'react-clipboard.js'
import styles from 'images/detail.css'

@connect(state => ({
  image: state.app.images.detail.image,
  isConfirmDialogOpen: state.app.images.detail.isConfirmDialogOpen
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class Detail extends Component {

  componentDidMount() {
    this.props.actions.fetchImage(this.props.params.id);
  }

  getMarkdownText() {
    return this.props.image ? `![LGTM](${this.props.image.url})` : '';
  }

  onRequestOpenDeleteImage() {
    this.props.actions.confirmDeleteImage(true);
  }

  onRequestCloseDeleteImage() {
    this.props.actions.confirmDeleteImage(false);
  }

  onDeleteImage() {
    this.props.actions.deleteImage(this.props.image.id);
    this.props.actions.confirmDeleteImage(false);
  }

  render() {
    const actions = [
      <FlatButton
        label="キャンセル"
        onClick={this.onRequestCloseDeleteImage.bind(this)} />,
      <RaisedButton
        label="削除"
        secondary={true}
        onClick={this.onDeleteImage.bind(this)} />
    ];

    return (
      <div className={styles.detail}>
        <div className={styles.detail__image}>
          <If condition={this.props.image}>
            <div><img src={this.props.image.url} /></div>
          </If>
        </div>
        <div className={styles.detail__markdown}>
          <If condition={this.props.image}>
            <TextField name="markdown_text" fullWidth={true} multiLine={true} value={this.getMarkdownText()} />
            <ClipBoardButton
              className={styles.detail__markdown__copyButton}
              data-clipboard-text={this.getMarkdownText()}
              component="div">
                <RaisedButton className={styles.detail__markdown__button} label="コピーする" primary={true} />
                <RaisedButton className={styles.detail__markdown__button} label="削除する" onClick={this.onRequestOpenDeleteImage.bind(this)} />
                <Dialog title="画像の削除"
                  modal={false}
                  actions={actions}
                  open={this.props.isConfirmDialogOpen}
                  onRequestClose={this.onRequestCloseDeleteImage.bind(this)}>
                  この画像を削除しますか？(削除した画像は戻りません)
                </Dialog>
            </ClipBoardButton>
          </If>
        </div>
      </div>
    );
  }
}
