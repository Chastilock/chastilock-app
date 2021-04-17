import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Input } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup, useTranslation, ButtonSelection, NumberSelection, MaxMinFormGroup } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

// Min / max boundaries
const boundaries = {
  red: { min: 0, max: 599 },
  yellow_random: { min: 0, max: 299 },
  yellow_remove: { min: 0, max: 299 },
  yellow_add: { min: 0, max: 299 },
  sticky: { min: 0, max: 100 },
  freeze: { min: 0, max: 100 },
  double: { min: 0, max: 100 },
  reset: { min: 0, max: 100 },
  green: { min: 1, max: 100 },
  auto_reset_regularity: { min: 2, max: 399 },
  auto_reset_max: { min: 1, max: 20 },
  checkin_frequency: { min: 0.5, max: 168 },
  checkin_window: { min: 1, max: 24 },
  max_users: { min: 1, max: 1000 },
  min_rating: { min: 1, max: 5 }
}

const CardPicker = React.memo((props: { max: number, min: number, setMax: (n: number) => void, setMin: (n: number) => void, cardName: string }): React.ReactElement => (
  <MaxMinFormGroup text={`createedit.card.${props.cardName}`}>
    <NumberSelection value={props.max} onChange={props.setMax} min={(boundaries as any)[props.cardName].min} max={(boundaries as any)[props.cardName].max} />
    <NumberSelection value={props.min} onChange={props.setMin} min={(boundaries as any)[props.cardName].min} max={props.max} />
  </MaxMinFormGroup>
))

const lockChanceRegularities = [['24h', 86400], ['12h', 43200], ['6h', 21600], ['3h', 10800], ['1h', 3600], ['30m', 1800], ['15m', 900], ['1m', 60]].map(regularity => ({
  value: regularity[0] as string,
  text: `createedit.card.chance_regularity.option.${regularity[0]}`,
  time: regularity[1]
}))
const ChanceRegularity = React.memo((props: { value: string, set: (a: any) => void }): React.ReactElement => (
  <FormGroup text="createedit.card.chance_regularity.label" centered>
    <ButtonSelection selected={props.value} options={lockChanceRegularities} onSelect={props.set} translate compact />
  </FormGroup>
))

const CreateEditLockView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translate] = useTranslation()

  // Lock state
  const [lockChanceRegularity, lockSetChanceRegularity] = React.useState(lockChanceRegularities[0])
  // const [lockDigits, lockSetDigits] = React.useState(4)

  // const [lockIsTest, lockSetIsTest] = React.useState(false)
  const [lockIsCumulative, lockSetIsCumulative] = React.useState(true)
  const [lockName, lockSetName] = React.useState('')
  const [lockIsShared, lockSetIsShared] = React.useState(false)

  const [lockBlockStatsHidden, lockSetBlockStatsHidden] = React.useState(false)
  const [lockRequireTrusted, lockSetRequireTrusted] = React.useState(false)
  const [lockRequireDm, lockSetRequireDm] = React.useState(false)
  const [lockRedMin, lockSetRedMin] = React.useState(0)
  const [lockRedMax, lockSetRedMax] = React.useState(0)
  const [lockYellowRandomMin, lockSetYellowRandomMin] = React.useState(0)
  const [lockYellowRandomMax, lockSetYellowRandomMax] = React.useState(0)
  const [lockYellowRemoveMin, lockSetYellowRemoveMin] = React.useState(0)
  const [lockYellowRemoveMax, lockSetYellowRemoveMax] = React.useState(0)
  const [lockYellowAddMin, lockSetYellowAddMin] = React.useState(0)
  const [lockYellowAddMax, lockSetYellowAddMax] = React.useState(0)
  const [lockStickyMin, lockSetStickyMin] = React.useState(0)
  const [lockStickyMax, lockSetStickyMax] = React.useState(0)
  const [lockFreezeMin, lockSetFreezeMin] = React.useState(0)
  const [lockFreezeMax, lockSetFreezeMax] = React.useState(0)
  const [lockDoubleMin, lockSetDoubleMin] = React.useState(0)
  const [lockDoubleMax, lockSetDoubleMax] = React.useState(0)
  const [lockResetMin, lockSetResetMin] = React.useState(0)
  const [lockResetMax, lockSetResetMax] = React.useState(0)
  const [lockGreenMin, lockSetGreenMin] = React.useState(1)
  const [lockGreenMax, lockSetGreenMax] = React.useState(1)
  const [lockMultipleGreensRequired, lockSetMultipleGreensRequired] = React.useState(false)
  /* const [lockHideCardInformation, lockSetHideCardInformation] = React.useState(false)
  const [lockAllowFakeCopies, lockSetAllowFakeCopies] = React.useState(false)
  const [lockFakeCopiesMin, lockSetFakeCopiesMin] = React.useState(0)
  const [lockFakeCopiesMax, lockSetFakeCopiesMax] = React.useState(0)
  const [lockAutoResets, lockSetAutoResets] = React.useState(false)
  const [lockAutoResetEveryXDays, lockSetAutoResetEveryXDays] = React.useState(2)
  const [lockAutoResetMax, lockSetAutoResetMax] = React.useState(1)
  const [lockRequireCheckins, lockSetRequireCheckins] = React.useState(false)
  const [lockCheckinFrequency, lockSetCheckinFrequency] = React.useState(1)
  const [lockCheckinWindow, lockSetCheckinWindow] = React.useState(1)
  const [lockEnableBuyout, lockSetEnableBuyout] = React.useState(true)
  const [lockStartFrozen, lockSetStartFrozen] = React.useState(false)
  const [lockDisableKHDecision, lockSetDisableKHDecision] = React.useState(false)
  const [lockLimitUsers, lockSetLimitUsers] = React.useState(false)
  const [lockMaxUsers, lockSetMaxUsers] = React.useState(5)
  const [lockBlockTest, lockSetBlockTest] = React.useState(false)
  const [lockBlockLowRating, lockSetBlockLowRating] = React.useState(false)
  const [lockMinRatingRequired, lockSetMinRatingRequired] = React.useState(1)
  const [lockBlockAlreadyLocked, lockSetBlockAlreadyLocked] = React.useState(false) */

  const closeSettings = (): void => {
    dispatch(confirmationActions.showConfirmation({
      title: translate('createedit.warning_unsaved.title'),
      text: translate('createedit.warning_unsaved.text'),
      onOk: () => navigation.goBack(),
      onCancel: () => {}
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
      <ScrollView>
        <Layout style={{ flex: 1, padding: 20 }}>
          <TitleGroup title="createedit.lock_type.title">
            <FormGroup text="createedit.lock_type.label">
              <Text translationKey="createedit.lock_type.type_info" category={TextType.SUBTITLE1} />
            </FormGroup>
            <FormGroup text="createedit.lock_type.name">
              <Input value={lockName} onChange={(e: any) => e.target.value !== '' && lockSetName(e.target.value)} />
            </FormGroup>
            {/* <FormGroup text="createedit.lock_type.test">
              <Toggle checked={lockIsTest} onChange={() => lockSetIsTest(!lockIsTest)} />
    </FormGroup> */}
            <FormGroup text="createedit.lock_type.shared">
              <Toggle checked={lockIsShared} onChange={() => lockSetIsShared(!lockIsShared)} />
            </FormGroup>
            {/* <FormGroup text="createedit.lock_type.combination_digits">
              <NumberSelection value={lockDigits} onChange={num => lockSetDigits(num)} min={0} max={16} />
  </FormGroup> */}
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
            <ChanceRegularity value={lockChanceRegularity.value} set={lockSetChanceRegularity} />
            <FormGroup text="createedit.card.cumulative">
              <Toggle checked={lockIsCumulative} onChange={() => lockSetIsCumulative(!lockIsCumulative)} />
            </FormGroup>
            {/* Red */}
            <CardPicker max={lockRedMax} min={lockRedMin} setMax={lockSetRedMax} setMin={lockSetRedMin} cardName='red' />
            {/* Yellow random */}
            <CardPicker max={lockYellowRandomMax} min={lockYellowRandomMin} setMax={lockSetYellowRandomMax} setMin={lockSetYellowRandomMin} cardName='yellow_random' />
            {/* Yellow remove */}
            <CardPicker max={lockYellowRemoveMax} min={lockYellowRemoveMin} setMax={lockSetYellowRemoveMax} setMin={lockSetYellowRemoveMin} cardName='yellow_remove' />
            {/* Yellow add */}
            <CardPicker max={lockYellowAddMax} min={lockYellowAddMin} setMax={lockSetYellowAddMax} setMin={lockSetYellowAddMin} cardName='yellow_add' />
            {/* Sticky */}
            <CardPicker max={lockStickyMax} min={lockStickyMin} setMax={lockSetStickyMax} setMin={lockSetStickyMin} cardName='sticky' />
            {/* Freeze */}
            <CardPicker max={lockFreezeMax} min={lockFreezeMin} setMax={lockSetFreezeMax} setMin={lockSetFreezeMin} cardName='freeze' />
            {/* Double */}
            <CardPicker max={lockDoubleMax} min={lockDoubleMin} setMax={lockSetDoubleMax} setMin={lockSetDoubleMin} cardName='double' />
            {/* Reset */}
            <CardPicker max={lockResetMax} min={lockResetMin} setMax={lockSetResetMax} setMin={lockSetResetMin} cardName='reset' />
            {/* Green */}
            <FormGroup text="createedit.card.multiple_greens_required">
              <Toggle checked={lockMultipleGreensRequired} onChange={() => lockSetMultipleGreensRequired(!lockMultipleGreensRequired)} />
            </FormGroup>
            <CardPicker max={lockGreenMax} min={lockGreenMin} setMax={lockSetGreenMax} setMin={lockSetGreenMin} cardName='green' />
          </TitleGroup>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateEditLockView
