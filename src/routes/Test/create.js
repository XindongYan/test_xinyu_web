import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, message, Anchor, Affix } from 'antd';
import styles from './TaskOption.less';
import { CHANNELS } from '../../constants/taobao';

const { Link } = Anchor;

@connect(state => ({

}))

export default class TaskOption extends PureComponent {
  state = {
    version: '',
    channel_list: [],
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {

  }
  handleGetVersion = () => {
  }
  handleGetChannel = () => {
  }
  setVersion = (e) => {
    const data = JSON.parse(e.target.innerText);
    if (data.version) {
      this.setState({
        version: data.version,
      });
      this.state.nicaiCrx.removeEventListener('setVersion', this.setVersion);
    }
    if (data.error) {
      message.destroy();
      message.warn(data.msg, 60 * 60);
      this.setState({
        actsLoading: false,
      });
    } else {
      this.handleGetChannel();
    }
  }
  setChannel = (e) => {
    const data = JSON.parse(e.target.innerText);
    if (data.itemList) {
      this.setState({
        channel_list: data.itemList,
      });
    }
  }
  handleDeliver = (channelId, activityId) => {
    this.props.dispatch(routerRedux.push(`/writer/task/channel?channelId=${channelId}&activityId=${activityId}`));
  }
  handleGetRemainCount = (id) => {
    const { channel_list } = this.state;
    if (channel_list && channel_list.length > 0) {
      let remainCount = '';
      channel_list.forEach(item => {
        item.activityList.find(item1 => {
          if (item1.id === id) {
            remainCount = item1.remainCount;
          }
        });
      });
      return remainCount ? `今天还可投 ${remainCount} 篇` : '';
    }
    return '';
  }
  render() {
    return (
      <div>
        <Affix offsetTop={65} style={{position: 'absolute', top: 65, right: 0, zIndex: 2}}>
          <Anchor className={styles.AnchorBox} style={{ width: 120, paddingLeft: 5 }}>
            <div>
              {
                CHANNELS.map((item, index) => <Link key={index} href={`#/creation/writer-create#CHANNELS${index}`} title={item.name} />)
              }
            </div>
          </Anchor>
        </Affix>
        {
          CHANNELS.map( (item, index) =>
            <Card key={index} id={`/creation/writer-create#CHANNELS${index}`} bodyStyle={{ background: '#fff', padding: 20 }} style={{ marginBottom: 20 }}>
              <div className={styles.option_box_top}>
                <div className={styles.option_box_img}>
                  <img src={item.logo} alt={item.name} />
                </div>
                <div className={styles.option_box_detail}>
                  <h3>{item.name}</h3>
                  <div className={styles.option_desc}>{item.desc}</div>
                </div>
              </div>
              <div className={styles.option_children_title}>
                投稿到子频道
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {item.activityList.map((item1, index1) => <div key={index1} className={styles.option_choose_box} onClick={() => this.handleDeliver(item.id, item1.id)}>
                  <p>{item1.name}</p>
                  <p style={{ fontSize: 12 }}>{this.handleGetRemainCount(item1.id)}</p>
                </div>)}
              </div>
            </Card>
          )
        }
      </div>
    );
  }
}
