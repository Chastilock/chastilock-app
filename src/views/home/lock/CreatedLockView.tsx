import React from 'react'
import { Text } from '@ui-kitten/components'
import { TouchableOpacity, View } from 'react-native'

import { CreatedLock } from '@chastilock/state/sections/createdlock'

interface CreatedLockViewProps {
  createdLock: CreatedLock
  editLock: (lock: CreatedLock) => void
}
const CreatedLockView = (props: CreatedLockViewProps): React.ReactElement => {
  return (
    <TouchableOpacity onPress={() => props.editLock(props.createdLock)} style={{ marginBottom: 5 }}>
      <View style={{ borderWidth: 1, borderColor: 'grey', padding: 5 }}>
        <Text>{props.createdLock.Lock_Name === '' ? 'Unnamed lock' : props.createdLock.Lock_Name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CreatedLockView
