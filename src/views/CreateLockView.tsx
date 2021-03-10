import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup } from '@chastilock/components'
import { useTracked } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
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
        <TitleGroup title="Appearance">
          <FormGroup text="Dark mode">
            <Toggle checked={state.settings.theme === 'dark'} />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="Account">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="Notifications">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="Security">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="Privacy">
          <FormGroup text="Show public stats on my profile">
            <Toggle checked={state.settings.publicStats} />
          </FormGroup>
        </TitleGroup>
      </Layout>
    </SafeAreaView>
  )
}

export default CreateLockView
