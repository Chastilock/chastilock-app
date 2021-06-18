import React from 'react'
import { View } from 'react-native'
import { TopNavigation as KittenTopNavigation, Divider } from '@ui-kitten/components'

import { Text, TextType } from './Text'

interface TopNavigationProps {
  title: string
}
export const TopNavigation = (props: TopNavigationProps): React.ReactElement => {
  return (
    <View>
      <KittenTopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey={props.title} />}
        alignment="center"
        style={{ }}
      />
      <Divider/>
    </View>
  )
}

export default TopNavigation
