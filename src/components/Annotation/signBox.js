import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import $ from 'jquery';
import styles from './index.less';

export default class SignBox extends PureComponent {
  state = {
    signValue: ''
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      signValue: nextProps.signContent.message || '',
    });
  }

  fnPrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  creatComment = () => {
    const { direction, parentWidth } = this.props;
    const bgColors = ['#1abc9c', '#f39c12', '#3498db', '#e74c3c'];
    let n = 0;
    if (this.props.approve_status === 1) {
      n = 0;
    }
    let nWidth = '';
    if (direction.x > parentWidth / 2) {
      nWidth = `${parentWidth - direction.x}px`;
    }
    let commentMsg = {};
    if (this.state.signValue) {
      commentMsg = {
        message: this.signInput.value,
        left: direction.x,
        top: direction.y,
        background: bgColors[n],
        width: nWidth,
      };
    }
    this.setState({
      signValue: ''
    });
    $(this.signInput).val('');
    this.props.sureChange(commentMsg);
  }
  closeBox = () => {
    this.setState({
      signValue: ''
    });
    this.props.close();
  }
  render() {
    const { signVisible, direction, boxSize } = this.props;
    const { signValue } = this.state;
    return (
      <div
        className={styles.signBox}
        style={{
          display: signVisible ? 'block' : 'none',
          top: direction.y + $(this.signBox).outerHeight() > boxSize ? boxSize - $(this.signBox).outerHeight() : direction.y
        }}
        onContextMenu={this.fnPrevent}
        onClick={this.fnPrevent}
        ref={(el) => { this.signBox = el; }}
      >
        <div className={styles.SignTit}>批注
          <div className={styles.outSignbox} onClick={this.closeBox}>
            <Icon type="close" />
          </div>
        </div>
        <textarea
          placeholder="在这里输入批注"
          onChange={(e) => { this.setState({ signValue: e.target.value }); }}
          className={styles.signInput}
          value={signValue}
          ref={(el) => { this.signInput = el; }}
        />
        <div className={styles.sureSign} onClick={this.creatComment}>确定</div>
      </div>
    );
  }
}
