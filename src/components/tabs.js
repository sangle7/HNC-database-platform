import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'

const TabPane = Tabs.TabPane

const TabWithRoute = props => {
  const { onChange, tabs } = props

  return (
    <Tabs onChange={onChange} type="card" >
      {tabs.map(elem => <TabPane tab={elem.title} key={elem.key}>{elem.content}</TabPane>)}
    </Tabs>)
}

TabWithRoute.propTypes = {
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
}

export default TabWithRoute
