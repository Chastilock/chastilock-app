import React from 'react'
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components'

import TopTabBar from './TopTabBar'

const BackAction = (): React.ReactElement => (
  <TopNavigationAction />
)

interface TopNavigationComponentProps { title: string }
const TopNavigationComponent = (props: TopNavigationComponentProps): React.ReactElement => {
  return (
    <>
      <TopNavigation
        accessoryLeft={BackAction}
        title={props.title}
      />
      <TopTabBar />
    </>
  )
}

export default TopNavigationComponent
