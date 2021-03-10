import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'

import { Text, TextType } from '@chastilock/components'

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  }
})

interface FormGroupProps {
  text: string
  children?: React.ReactElement
}
export const FormGroup = (props: FormGroupProps): React.ReactElement => (
  <View style={styles.formGroup}>
    <Text translationKey={props.text} />
    <View>{props.children}</View>
  </View>
)

export const FormButton = (props: any): React.ReactElement => (
  <View style={{ ...styles.formGroup, marginBottom: 5 }}>
    <Button {...props} style={{ flex: 1 }} />
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
