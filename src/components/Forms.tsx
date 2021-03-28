import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'

import { Text, TextType } from '@chastilock/components/Text'

const styles = StyleSheet.create({
  formGroup: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

interface FormGroupProps {
  text: string
  centered?: boolean
  children?: React.ReactElement
}
export const FormGroup = (props: FormGroupProps): React.ReactElement => (
  <View style={[styles.formGroup, { flexDirection: props.centered === true ? 'column' : 'row', marginBottom: 5 }]}>
    <Text translationKey={props.text} />
    <View>{props.children}</View>
  </View>
)

export const FormButton = (props: any): React.ReactElement => (
  <View style={{ marginBottom: 5 }}>
    <Button {...props} />
  </View>
)

interface SettingsGroupProps {
  title: string
  children?: React.ReactElement | React.ReactElement[]
}
export const TitleGroup = (props: SettingsGroupProps): React.ReactElement => (
  <View>
    <Text category={TextType.HEADING5} translationKey={props.title} />
    {props.children}
  </View>
)
