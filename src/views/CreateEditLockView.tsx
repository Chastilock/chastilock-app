import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Input } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup, useTranslation, ButtonSelection, NumberSelection } from '@chastilock/components'
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
  const [lockName, lockSetName] = React.useState('')
  const [lockIsShared, lockSetIsShared] = React.useState(false)

  // Shared
  const [lockRequireDm, lockSetRequireDm] = React.useState(false)
  const [lockRequireTrusted, lockSetRequireTrusted] = React.useState(false)
  const [lockBlockStatsHidden, lockSetBlockStatsHidden] = React.useState(false)

  // Min / max
  const cardBoundaries = {
    red: { min: 0, max: 599 },
    yellow_random: { min: 0, max: 299 },
    yellow_remove: { min: 0, max: 299 },
    yellow_add: { min: 0, max: 299 }
  }

  const [lockRedMin, lockSetRedMin] = React.useState(0)
  const [lockRedMax, lockSetRedMax] = React.useState(0)
  const [lockYellowRandomMin, lockSetYellowRandomMin] = React.useState(0)
  const [lockYellowRandomMax, lockSetYellowRandomMax] = React.useState(0)
  const [lockYellowRemoveMin, lockSetYellowRemoveMin] = React.useState(0)
  const [lockYellowRemoveMax, lockSetYellowRemoveMax] = React.useState(0)
  const [lockYellowAddMin, lockSetYellowAddMin] = React.useState(0)
  const [lockYellowAddMax, lockSetYellowAddMax] = React.useState(0)

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
          <FormGroup text="createedit.lock_type.name">
            <Input value={lockName} onChange={(e: any) => e.target.value !== '' && lockSetName(e.target.value)} />
          </FormGroup>
          <FormGroup text="createedit.lock_type.test">
            <Toggle checked={lockIsTest} onChange={() => lockSetIsTest(!lockIsTest)} />
          </FormGroup>
          <FormGroup text="createedit.lock_type.shared">
            <Toggle checked={lockIsShared} onChange={() => lockSetIsShared(!lockIsShared)} />
          </FormGroup>
          <FormGroup text="createedit.lock_type.combination_digits">
            <NumberSelection value={lockDigits} onChange={num => lockSetDigits(num)} min={0} max={16} />
          </FormGroup>
        </TitleGroup>
        {lockIsShared && <TitleGroup title="createedit.shared.title">
          <FormGroup text="createedit.shared.require_dm">
            <Toggle checked={lockRequireDm} onChange={() => lockSetRequireDm(!lockRequireDm)} />
          </FormGroup>
          <FormGroup text="createedit.shared.require_trusted">
            <Toggle checked={lockRequireTrusted} onChange={() => lockSetRequireTrusted(!lockRequireTrusted)} />
          </FormGroup>
          <FormGroup text="createedit.shared.block_stats_hidden">
            <Toggle checked={lockBlockStatsHidden} onChange={() => lockSetBlockStatsHidden(!lockBlockStatsHidden)} />
          </FormGroup>
        </TitleGroup>}
        <TitleGroup title="createedit.card.title">
          <FormGroup text="createedit.card.chance_regularity.label" centered>
            <ButtonSelection selected={lockChanceRegularity.value} options={lockChanceRegularities} onSelect={option => lockSetChanceRegularity(option)} translate compact />
          </FormGroup>
          <FormGroup text="createedit.card.cumulative">
            <Toggle checked={lockIsCumulative} onChange={() => lockSetIsCumulative(!lockIsCumulative)} />
          </FormGroup>
          {/* Red */}
          <FormGroup text="createedit.card.red.max">
            <NumberSelection value={lockRedMax} onChange={num => lockSetRedMax(num)} min={cardBoundaries.red.min} max={cardBoundaries.red.max} />
          </FormGroup>
          <FormGroup text="createedit.card.red.min">
            <NumberSelection value={lockRedMin} onChange={num => lockSetRedMin(num)} min={cardBoundaries.red.min} max={lockRedMax} />
          </FormGroup>
          {/* Yellow random */}
          <FormGroup text="createedit.card.yellow_random.max">
            <NumberSelection value={lockYellowRandomMax} onChange={num => lockSetYellowRandomMax(num)} min={cardBoundaries.yellow_random.min} max={cardBoundaries.yellow_random.max} />
          </FormGroup>
          <FormGroup text="createedit.card.yellow_random.min">
            <NumberSelection value={lockYellowRandomMin} onChange={num => lockSetYellowRandomMin(num)} min={cardBoundaries.yellow_random.min} max={lockYellowRandomMax} />
          </FormGroup>
          {/* Yellow remove */}
          <FormGroup text="createedit.card.yellow_remove.max">
            <NumberSelection value={lockYellowRemoveMax} onChange={num => lockSetYellowRemoveMax(num)} min={cardBoundaries.yellow_remove.min} max={cardBoundaries.yellow_remove.max} />
          </FormGroup>
          <FormGroup text="createedit.card.yellow_remove.min">
            <NumberSelection value={lockYellowRemoveMin} onChange={num => lockSetYellowRemoveMin(num)} min={cardBoundaries.yellow_remove.min} max={lockYellowRemoveMax} />
          </FormGroup>
          {/* Yellow add */}
          <FormGroup text="createedit.card.yellow_add.max">
            <NumberSelection value={lockYellowAddMax} onChange={num => lockSetYellowAddMax(num)} min={cardBoundaries.yellow_add.min} max={cardBoundaries.yellow_add.max} />
          </FormGroup>
          <FormGroup text="createedit.card.yellow_add.min">
            <NumberSelection value={lockYellowAddMin} onChange={num => lockSetYellowAddMin(num)} min={cardBoundaries.yellow_add.min} max={lockYellowAddMax} />
          </FormGroup>
        </TitleGroup>
      </Layout>
    </SafeAreaView>
  )
}

export default CreateEditLockView
