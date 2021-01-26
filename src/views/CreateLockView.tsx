import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType } from '@chastilock/components'
import { useTracked } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

interface FormGroupProps {
  text: string
  children?: React.ReactElement
}
const FormGroup = (props: FormGroupProps): React.ReactElement => (
  <View style={styles.formGroup}>
    <Text>{props.text}</Text>
    <View>{props.children}</View>
  </View>
)

interface SettingsGroupProps {
  title: string
  children?: React.ReactElement
}
const CreateLockGroup = (props: SettingsGroupProps): React.ReactElement => (
  <View>
    <Text category={TextType.HEADING4} translationKey={props.title} />
    {props.children}
  </View>
)

const CreateLockView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const [state, dispatch] = useTracked()

  const closeSettings = (): void => {
    dispatch(confirmationActions.showConfirmation({
      title: 'You have unsaved changes!',
      text: 'You have not yet saved this lock. If you close it now without saving, you may loose the settings.',
      onOk: () => navigation.goBack()
    }))
  }

  const CloseAction = (): React.ReactElement => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey='create.title' />}
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <CreateLockGroup title="Appearance">
          <FormGroup text="Dark mode">
            <Toggle checked={state.settings.theme === 'dark'} />
          </FormGroup>
        </CreateLockGroup>
        <CreateLockGroup title="Account">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </CreateLockGroup>
        <CreateLockGroup title="Notifications">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </CreateLockGroup>
        <CreateLockGroup title="Security">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </CreateLockGroup>
        <CreateLockGroup title="Privacy">
          <FormGroup text="Show public stats on my profile">
            <Toggle checked={state.settings.publicStats} />
          </FormGroup>
        </CreateLockGroup>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  }
})

export default CreateLockView
