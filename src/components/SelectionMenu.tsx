import React from 'react'
import { View } from 'react-native'

import useTranslation from './useTranslation'
import Text from './Text'

export interface SelectionMenuProps {
  options: any[]
  selected: string
  translate?: boolean
  compact?: boolean
  fullWidth?: boolean
}
export const SelectionMenu = (props: SelectionMenuProps): React.ReactElement => {
  const [translate] = useTranslation()

  return (
    <View>
      {
        props.options.map(option => <Text>{props.translate === true ? translate(option.text) : option.text}</Text>)
      }
    </View>
  )
}

export default SelectionMenu
