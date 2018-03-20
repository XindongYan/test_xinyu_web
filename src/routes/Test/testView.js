import Router, { PureComponent } from 'react';
import { connect } from 'dva';
import querystring from 'querystring';
import { Card, Table } from 'antd';

// models返回数据
@connect(state => {
    console.log(state.search)
    return {
    // values: state.search.data,
  }
})

export default class testView extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props
        const id = querystring.parse(this.props.location.search.substr(1))
        console.log(id._id)
        dispatch({
            type: 'search/value',
            payload: {
                _id: id._id
            }
        })
    }

    render() {
        const { values } = this.props
        console.log('hello')
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
        }]
        return (
            <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>
                    {/* <Table
                        columns={cloumn}
                        rowKey={record => record._id}
                        dataSource={search.list}
                    // pagination={{
                    //   ...data.pagination
                    // }}
                    /> */}
                </p>234567890
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
}