import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Card, Input, Select, Icon, Button, Checkbox, message, Radio, Popconfirm, DatePicker,
  Tooltip, Divider, Form, Modal, Popover, Pagination, Tabs, Breadcrumb
} from 'antd';
import { Link } from 'dva/router'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Forms/style.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// 数据模型获得初始值
@connect(state => ({
  data: state.form.data,
}))

// @connect(({ loading }) => ({
//   submitting: loading.effects['form/submitRegularForm'],

// }))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'form/find',
      // 发送参数
      payload: {
        currentPage: 1,
        pageSize: 5,
      }
    })
  }

  handlSave = () => {
    this.props.dispatch({
      type: 'form/testPage',
      payload: { title: this.props.form.getFieldValue('mubiao'), content: this.props.form.getFieldValue('miaoshu') },
      callback: (response) => {
        if (response.error) {
          message.error(response.msg)
        } else {
          message.success(response.msg);
        }
      }
    })
  }

  handlDel = (record) => {
    this.props.dispatch({
      type: 'form/delete',
      payload: { _id: record },
      callback: (response) => {
        if (response.error) {
          message.error(response.msg)
        } else {
          message.success(response.msg);
          this.componentDidMount()
        }
      },
    })
    // componentDidMount()    
  }

  render() {
    const { submitting, data } = this.props;
    console.log(data.list)
    const { getFieldDecorator, getFieldValue, getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const cloumn = [{
      title: 'Title',
      dataIndex: 'title',
      // key: '_id',
    }, {
      title: 'Content',
      dataIndex: 'content',
      // key: '_id'
    }, {
      title: 'Date',
      dataIndex: 'date',
      // key: '_id'
    }, {
      title: '操作',
      render: (record) => {
        return (
          <p>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`/task/details?_id=${record._id}`}>详情</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Popconfirm placement="left" title={`确认删除?`} onConfirm={() => this.handlDel(record._id)} okText="确认" cancelText="取消">
                  <Tooltip placement="top" title="删除">
                    <a>删除</a>
                  </Tooltip>
                </Popconfirm>
              </Breadcrumb.Item>
            </Breadcrumb>
          </p>
        )
      }
    }]

    function callback(key) {
      console.log(key);
    }

    // 删除需获取_id
    // 查看详细的时候链接需带参数
    // Table 之后自动分页
    return (
      <div>
        <PageHeaderLayout >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Tab 1" key="1">
              <Table
                columns={cloumn}
                rowKey={record => record._id}
                dataSource={data.list}
              // pagination={{
              //   ...data.pagination
              // }}
              />
            </TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>


          </Tabs>
          <Card bordered={false}>
            <Form
              onSubmit={this.handleSubmit}
              hideRequiredMark
              style={{ marginTop: 8 }}
            >
              <FormItem
                {...formItemLayout}
                label="标题"
              >
                {getFieldDecorator('title', {
                  rules: [{
                    required: true, message: '请输入标题',
                  }],
                })(
                  <Input {...getFieldProps('mubiao')} placeholder="给目标起个名字" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="目标描述"
              >
                {getFieldDecorator('goal', {
                  rules: [{
                    required: true, message: '目标描述',
                  }],
                })(
                  <TextArea {...getFieldProps('miaoshu')} style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
                )}
              </FormItem>

              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" onClick={() => this.handlvalue()} loading={submitting}>
                  提交
              </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.handlSave()}>保存</Button>
              </FormItem>
            </Form>
          </Card>
          {/* <Pagination defaultCurrent={1} total={50} /> */}
        </PageHeaderLayout>

      </div>
    );
  }
}
