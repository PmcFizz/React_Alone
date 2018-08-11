import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Card,
  Form,
} from 'antd'
import StandardTable from 'components/StandardTable'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import styles from '../TableList.less'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')
@connect(({bioregis, loading}) => ({
  bioregis,
  loading: loading.models.bioregis,
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
      type: 'bioregis/findAllContacts',
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
      type: 'bioregis/findAllContacts',
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
      bioregis: {data},
      loading,
    } = this.props
    const {selectedRows} = this.state

    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '创建时间',
        dataIndex: 'created_date',
      },
    ]

    return (
      <PageHeaderLayout title="联系列表">
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
