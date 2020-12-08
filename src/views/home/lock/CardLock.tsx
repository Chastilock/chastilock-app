import { Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

const CardLock = (): React.ReactElement => {
  return (
    <View style={{ backgroundColor: 'green', borderWidth: 1, borderColor: 'grey', padding: 5 }}>
      <Text>CardLock</Text>
    </View>
  )
}

export default CardLock
