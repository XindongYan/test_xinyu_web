import React, { PureComponent } from 'react';
import { Button, Popconfirm, Popover } from 'antd';
import $ from 'jquery';
import styles from './index.less';
import SignBox from './signBox.js';

export default class Annotation extends PureComponent {
  state = {
    action: [],
    direction: {
      x: 0,
      y: 0,
      visible: 'none',
    },
    signVisible: false,
    editIndex: -1,
    signContent: '',
    status: '',
  }

  fnPrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  fnClickDefult = () => {
    this.setState({
      direction: {
        ...this.state.direction,
        visible: 'none',
      },
    });
  }
  fnContextMenu = (e) => {
    e.preventDefault();
    const oX = e.pageX - $(e.target).offset().left - 1;
    const oY = e.pageY - $(e.target).offset().top - 1;
    this.setState({
      action: [
        { name: '添加', value: 'add' },
      ],
      direction: {
        x: oX,
        y: oY,
        visible: 'block',
      },
      signVisible: false,
    });
  }
  operation = (e, value) => {
    e.stopPropagation();
    this.setState({
      status: value
    });
    if (value === 'add') {
      this.setState({
        direction: { ...this.state.direction, visible: 'none' },
        signContent: {},
      }, () => {
        this.setState({ signVisible: true });
      });
    } else if (value === 'edit') {
      const { editIndex } = this.state;
      this.setState({
        direction: { ...this.state.direction, visible: 'none' },
        signVisible: true,
        signContent: this.props.value[editIndex]
      });
    } else if (value === 'delete') {
      const { editIndex } = this.state;
      const newCommentList = [...this.props.value];
      newCommentList.splice(editIndex, 1);
      if (this.props.onChange) this.props.onChange([...newCommentList]);
      this.setState({
        direction: { ...this.state.direction, visible: 'none' },
      });
    }
  }
  creatBox = (key) => {
    return (
      <Button
        key={key.value}
        size="small"
        style={{ width: '100%', zIndex: '2333' }}
        onClick={(e) => { this.operation(e, key.value); }}
        onContextMenu={this.fnPrevent}
      >
        {key.name}
      </Button>
    );
  }
  hideSignBox = () => {
    this.setState({
      signVisible: false
    });
  }
  sureChange = (commentMsg) => {
    const { status, editIndex } = this.state;
    if (commentMsg.message) {
      if (status === 'add') {
        if (this.props.onChange) {
          this.props.onChange([...this.props.value, commentMsg]);
        }
      } else if (status === 'edit') {
        const newCommentList = [...this.props.value];
        const newComment = { ...this.props.value[editIndex], message: commentMsg.message };
        newCommentList.splice(editIndex, 1, newComment);
        if (this.props.onChange) {
          this.props.onChange([...newCommentList]);
        }
      }
    }
    this.setState({
      signVisible: false,
    });
  }
  handleClear = () => {
    if (this.props.onChange) this.props.onChange([]);
  }
  editComment = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      action: [
        { name: '编辑', value: 'edit' },
        { name: '删除', value: 'delete' },
      ],
      direction: {
        x: (e.pageX - $(this.annotationBox).offset().left),
        y: (e.pageY - $(this.annotationBox).offset().top),
        visible: 'block',
      },
      editIndex: index,
    });
  }
  renderCommentBox = (item, index) => {
    return (
      <div
        key={index}
        className={styles.commentBox}
        style={{
          left: Number(item.left),
          top: Number(item.top),
          background: item.background,
          maxWidth: item.width,
        }}
        alte={item.message}
        onContextMenu={(e) => this.editComment(e, index)}
      >
        {/*
          <div className={styles.commentMiddle} onMouseDown={(e) => this.handleCommentBoxMouseDown(e, index)} />
          <div className={styles.commentLeft} />
          <div className={styles.commentRight} />
        */}
        {item.message}
      </div>
    );
  }
  // handleCommentBoxMouseDown = (e, index) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // const comment = this.props.value[index];
  //   const commentBox = $(e.target).parent();
  //   const w = $(e.target).width();
  //   const h = $(e.target).height();
  //   const outerWidth = $(this.annotationBox).outerWidth();
  //   const outerHeight = $(this.annotationBox).outerHeight();
  //   const x = e.pageX;
  //   const y = e.pageY;
  //   window.onmouseup = (e) => this.handleAnchorMouseUp(e, index);
  //   window.onmousemove = (e) => this.handleAnchorMouseMove(commentBox, w, h, outerWidth, outerHeight);
  // }
  // handleAnchorMouseUp = (e) => {
  //   this.fnPrevent(e);
  //   window.onmouseup = null;
  //   window.onmousemove = null;
  // }
  // handleAnchorMouseMove = (dom, w, h, outerWidth, outerHeight) => {
  // }
  render() {
    const { viewStatus, value, approve_status, approve_note } = this.props;
    const { action, direction, signVisible, signContent } = this.state;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div className={styles.commentTitle}>
          批注
          <Popover placement="bottom" title="商家批注" content={<div style={{ width: 340 }}>{approve_note}</div>} trigger="click">
            <a style={{ marginLeft: 160, color: '#00b395' }}>商家批注</a>
          </Popover>
          { viewStatus !== 'view' &&
            <Popconfirm placement="top" title="确认清空批注?" onConfirm={this.handleClear} okText="确认" cancelText="取消">
              <a style={{ float: 'right', marginRight: 10, color: '#00b395' }}>清空批注</a>
            </Popconfirm>
          }
        </div>
        <div
          ref={(el) => { this.annotationBox = el; }}
          className={styles.AnnotationBox}
          onContextMenu={this.fnContextMenu}
          onClick={this.fnClickDefult}
        >
          <div
            className={styles.selectBox}
            style={{
              left: direction.x + 100 > $(this.annotationBox).outerWidth() ? ($(this.annotationBox).outerWidth() - 100 || 0) : direction.x,
              top: direction.y,
              display: direction.visible
            }}
          >
            {action.map(this.creatBox)}
          </div>
          <SignBox
            direction={direction}
            sureChange={this.sureChange}
            close={this.hideSignBox}
            signVisible={signVisible}
            parentWidth={$(this.annotationBox).outerWidth()}
            signContent={signContent}
            boxSize={$(this.annotationBox).outerHeight()}
            approve_status={approve_status}
          />
          { value.map((item, index) => this.renderCommentBox(item, index)) }
          { viewStatus === 'view' &&
            <div
              className={styles.viewBox}
              onContextMenu={this.fnPrevent}
            />
          }
        </div>
      </div>
    );
  }
}
