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

const addSpacing = (items: React.ReactElement[]): React.ReactElement[] => {
  return items.map((item, i) => <View key={i} style={{ marginLeft: i === 0 ? undefined : 20 }}>{item}</View>)
}

interface FormGroupProps {
  text: string
  centered?: boolean
  horizontal?: boolean
  children?: any
}
export const FormGroup = (props: FormGroupProps): React.ReactElement => (
  <View style={[styles.formGroup, { flexDirection: props.centered === true ? 'column' : 'row', marginBottom: 5 }]}>
    <Text translationKey={props.text} />
    <View style={{ flexDirection: props.horizontal === true ? 'row' : 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.isArray(props.children) ? addSpacing(props.children.flat()) : props.children}</View>
  </View>
)

export const MaxMinFormGroup = (props: FormGroupProps): React.ReactElement => (
  <FormGroup centered horizontal {...props}>
    <Text translationKey="formgroup.min" />
    {props.children}
    <Text translationKey="formgroup.max" />
  </FormGroup>
)

export const FormButton = (props: any): React.ReactElement => (
  <View style={{ marginBottom: 5 }}>
    <Button {...props} />
  </View>
)

interface SettingsGroupProps {
  title: string
  children?: React.ReactNode
}
export const TitleGroup = (props: SettingsGroupProps): React.ReactElement => (
  <View>
    <Text category={TextType.HEADING5} translationKey={props.title} />
    {props.children}
  </View>
)
