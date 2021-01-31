import React from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

const BackIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="arrow-back-outline" />
)

export interface ButtonProps {
  onPress: () => void
}

export const CloseButtonAccessory = (props: ButtonProps): React.ReactElement => (
  <TopNavigationAction icon={CloseIcon} onPress={props.onPress} />
)

export const BackButtonAccessory = (props: ButtonProps): React.ReactElement => (
  <TopNavigationAction icon={BackIcon} onPress={props.onPress} />
)
