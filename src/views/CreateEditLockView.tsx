import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup, useTranslation, ButtonSelection } from '@chastilock/components'
import { useTracked } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

const CreateEditLockView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const [state, dispatch] = useTracked()
  const [translate] = useTranslation()

  // Lock state
  const lockChanceRegularities = [['24h', 86400], ['12h', 43200], ['6h', 21600], ['3h', 10800], ['1h', 3600], ['30m', 1800], ['15m', 900], ['1m', 60]].map(regularity => ({
    value: regularity[0] as string,
    text: `createedit.card.chance_regularity.option.${regularity[0]}`,
    time: regularity[1]
  }))
  const [lockChanceRegularity/*, lockSetChanceRegularity */] = React.useState(lockChanceRegularities[0])

  const closeSettings = (): void => {
    dispatch(confirmationActions.showConfirmation({
      title: translate('createedit.warning_unsaved.title'),
      text: translate('createedit.warning_unsaved.text'),
      onOk: () => navigation.goBack()
    }))
  }

  const CloseAction = (): React.ReactElement => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey='createedit.create_title' />}
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <TitleGroup title="createedit.lock_type.title">
          <FormGroup text="createedit.lock_type.label">
            <Text translationKey="createedit.lock_type.type_info" />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="createedit.card.title">
          <FormGroup text="createedit.card.chance_regularity.label" centered>
            <ButtonSelection selected={lockChanceRegularity.value} options={lockChanceRegularities} translate compact />
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

export default CreateEditLockView
