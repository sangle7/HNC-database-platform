import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Tabs } from 'antd'
import style from './tabs.less'

const TabPane = Tabs.TabPane

const TabWithRoute = props => {
  const { onChange, tabs } = props

  return (
    <Tabs className={classnames({ [style.tabs]: true })} onChange={onChange} type="card" >
      {tabs.map(elem => <TabPane tab={elem.title} key={elem.key}>{elem.content}</TabPane>)}
    </Tabs>)
}

TabWithRoute.propTypes = {
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
}

export default TabWithRoute
