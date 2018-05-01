import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, Icon, message, Modal, Pagination, Spin, Progress, Tabs } from 'antd';
import styles from './index.less';

const TabPane = Tabs.TabPane;
@connect(state => ({

}))
export default class Material extends PureComponent {
  state = {
    nicaiCrx: null,
  }
  hanldSet = () => {
    const nicaiCrx = document.getElementById('nicaiCrx');
    nicaiCrx.addEventListener('setTaobao', this.setTaobao);
		if(!this.state.nicaiCrx) {
			this.setState({nicaiCrx}, () => {
				setTimeout(() => {
					this.handleGetAuction();
				}, 1000)
			})
		}
	}
  handleGetAuction = (params) => {
		const customEvent = document.createEvent('Event');
    customEvent.initEvent('getTaobao', true, true);
    this.state.nicaiCrx.dispatchEvent(customEvent);
	}
	setTaobao = (e) => {
    const data = JSON.parse(e.target.innerText);
    if (!data.error) {
			message.success('淘宝可能已经登陆')
    } else {
      message.destroy();
      message.warn(data.msg);
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <div>
        <Button onClick={this.hanldSet}>检测</Button>
      </div>
    );
  }
}