import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import {
  Card,
  Form,
  Badge,
  Divider,
} from 'antd'
import StandardTable from 'components/StandardTable'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import styles from '../TableList.less'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')
const statusMap = ['default', 'processing', 'success', 'error']
const status = ['关闭', '运行中', '已上线', '异常']

@connect(({rule, loading}) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch({
      type: 'rule/fetch',
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props
    const {formValues} = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj}
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    })
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  }

  render () {
    const {
      rule: {data},
      loading,
    } = this.props
    const {selectedRows} = this.state

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '内容',
        dataIndex: 'content',
      },
      {
        title: '创建时间',
        dataIndex: 'created_date',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
    ]

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              rowKey="id"
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}
