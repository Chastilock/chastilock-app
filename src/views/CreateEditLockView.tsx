import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Input } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup, useTranslation, ButtonSelection } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

const CreateEditLockView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translate] = useTranslation()

  // Lock state
  const lockChanceRegularities = [['24h', 86400], ['12h', 43200], ['6h', 21600], ['3h', 10800], ['1h', 3600], ['30m', 1800], ['15m', 900], ['1m', 60]].map(regularity => ({
    value: regularity[0] as string,
    text: `createedit.card.chance_regularity.option.${regularity[0]}`,
    time: regularity[1]
  }))
  const [lockChanceRegularity, lockSetChanceRegularity] = React.useState(lockChanceRegularities[0])
  const [lockDigits, lockSetDigits] = React.useState(4)

  const [lockIsTest, lockSetIsTest] = React.useState(false)
  const [lockIsCumulative, lockSetIsCumulative] = React.useState(true)

  const [lockRedMin, lockSetRedMin] = React.useState(0)
  const [lockRedMax, lockSetRedMax] = React.useState(0)

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
            <Text translationKey="createedit.lock_type.type_info" category={TextType.SUBTITLE1} />
          </FormGroup>
          <FormGroup text="createedit.lock_type.test">
            <Toggle checked={lockIsTest} onChange={() => lockSetIsTest(!lockIsTest)} />
          </FormGroup>
          <FormGroup text="createedit.lock_type.combination_digits">
            <Input keyboardType="numeric" value={lockDigits.toString()} onChange={(e: any) => e.target.value !== '' && lockSetDigits(parseInt(e.target.value))} />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="createedit.card.title">
          <FormGroup text="createedit.card.chance_regularity.label" centered>
            <ButtonSelection selected={lockChanceRegularity.value} options={lockChanceRegularities} onSelect={option => lockSetChanceRegularity(option)} translate compact />
          </FormGroup>
          <FormGroup text="createedit.card.cumulative">
            <Toggle checked={lockIsCumulative} onChange={() => lockSetIsCumulative(!lockIsCumulative)} />
          </FormGroup>
          <FormGroup text="createedit.card.red.min">
            <Input keyboardType="numeric" value={lockRedMin.toString()} onChange={(e: any) => e.target.value !== '' && lockSetRedMin(parseInt(e.target.value))} />
          </FormGroup>
          <FormGroup text="createedit.card.red.max">
            <Input keyboardType="numeric" value={lockRedMax.toString()} onChange={(e: any) => e.target.value !== '' && lockSetRedMax(parseInt(e.target.value))} />
          </FormGroup>
        </TitleGroup>
      </Layout>
    </SafeAreaView>
  )
}

export default CreateEditLockView
