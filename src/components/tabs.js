import React from 'react'

import classNames from 'classnames/bind'
import { Tabs } from 'antd'
import style from './tabs.less'

const TabPane = Tabs.TabPane

const cx = classNames.bind(style)

const TabWithRoute = props => {
  const { onChange, tabs, transform } = props

  return (
    <Tabs type="card" className={cx({ tabs: true, tabsTransform: transform })} onChange={onChange} >
      {tabs.map(elem => <TabPane tab={elem.title} key={elem.key}>{elem.content}</TabPane>)}
    </Tabs>)
}

export default TabWithRoute
