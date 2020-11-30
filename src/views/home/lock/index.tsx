import React from 'react'
import { View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'

import LockModel from './LockModel'

const renderHeader = (headerProps: any, lock: LockModel): React.ReactElement => {
  return (
    <View {...headerProps}>
      <Text category="h6">
        {lock.name}
      </Text>
    </View>
  )
}

interface LockProps {
  lock: LockModel
}
const Lock = (props: LockProps): React.ReactElement => {
  return (
    <View>
      <Card
        header={headerProps => renderHeader(headerProps, props.lock)}>
        <Text>My Lock</Text>
      </Card>
    </View>
  )
}

export default Lock
