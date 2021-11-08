import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Input } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { Text, TextType, FormGroup, TitleGroup, useTranslation, ButtonSelection, NumberSelection, MaxMinFormGroup, FormButton } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'
import createOriginalLock, { CreateLockRequest } from '@chastilock/api/actions/createOriginalLock'
import { CreatedLock } from '@chastilock/state/sections/createdlock'

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
  min_rating: { min: 1, max: 5 },
  fake_copies: { min: 1, max: 10 }
}

const CardPicker = React.memo((props: { max: number, min: number, setMax: (n: number) => void, setMin: (n: number) => void, name: string, title: string }): React.ReactElement => (
  <MaxMinFormGroup text={props.title}>
    <NumberSelection value={props.min} onChange={props.setMin} min={(boundaries as any)[props.name].min} max={props.max} />
    <NumberSelection value={props.max} onChange={props.setMax} min={(boundaries as any)[props.name].min} max={(boundaries as any)[props.name].max} />
  </MaxMinFormGroup>
))

const lockChanceRegularities = [['24h', 1440], ['12h', 720], ['6h', 360], ['3h', 180], ['1h', 60], ['30m', 30], ['15m', 15], ['1m', 1]].map(regularity => ({
  value: regularity[0] as string,
  text: `createedit.card.chance_regularity.option.${regularity[0]}`,
  time: regularity[1] as number
}))
const ChanceRegularity = React.memo((props: { value: string, set: (a: any) => void }): React.ReactElement => (
  <FormGroup text="createedit.card.chance_regularity.label" centered>
    <ButtonSelection selected={props.value} options={lockChanceRegularities} onSelect={props.set} translate compact />
  </FormGroup>
))

const CreateEditLockView = ({ route, navigation }: { navigation: MaterialTopTabBarProps['navigation'], route: any }): React.ReactElement => {
  const dispatch = useDispatch()
  const [translate] = useTranslation()

  const isEdit = route.params?.lock !== undefined

  const lock = route.params?.lock as CreatedLock

  // General
  const [lockName, lockSetName] = React.useState(isEdit ? lock.Lock_Name : '')
  const [lockIsShared, lockSetIsShared] = React.useState(isEdit ? lock.Shared : false)

  // General shared
  const [lockBlockStatsHidden, lockSetBlockStatsHidden] = React.useState(isEdit ? lock.Block_Stats_Hidden : false)
  const [lockRequireTrusted, lockSetRequireTrusted] = React.useState(isEdit ? lock.Only_Accept_Trusted : false)
  const [lockRequireDm, lockSetRequireDm] = React.useState(isEdit ? lock.Require_DM : false)
  const [lockAllowFakeCopies, lockSetAllowFakeCopies] = React.useState(isEdit ? lock.Allow_Fakes : false)
  const [lockFakeCopiesMin, lockSetFakeCopiesMin] = React.useState(isEdit ? lock.Min_Fakes : 0)
  const [lockFakeCopiesMax, lockSetFakeCopiesMax] = React.useState(isEdit ? lock.Max_Fakes : 0)
  const [lockBlockTest, lockSetBlockTest] = React.useState(isEdit ? lock.Block_Test_Locks : false)
  const [lockBlockAlreadyLocked, lockSetBlockAlreadyLocked] = React.useState(isEdit ? lock.Block_Already_Locked : false)

  const [lockRequireCheckins, lockSetRequireCheckins] = React.useState(isEdit ? lock.Checkins_Enabled : false)
  const [lockCheckinFrequency, lockSetCheckinFrequency] = React.useState(isEdit ? lock.Checkins_Frequency : 1)
  const [lockCheckinWindow, lockSetCheckinWindow] = React.useState(isEdit ? lock.Checkins_Window : 1)

  const [lockLimitUsers, lockSetLimitUsers] = React.useState(isEdit ? lock.Limit_Users : false)
  const [lockMaxUsers, lockSetMaxUsers] = React.useState(isEdit ? lock.User_Limit_Amount : 5)

  const [lockBlockLowRating, lockSetBlockLowRating] = React.useState(isEdit ? lock.Block_User_Rating_Enabled : false)
  const [lockMinRatingRequired, lockSetMinRatingRequired] = React.useState(isEdit ? lock.Block_User_Rating : 1)

  // Card specific
  // TODO
  const [lockChanceRegularity, lockSetChanceRegularity] = React.useState(isEdit ? lockChanceRegularities.filter(reg => reg.time === lock.OriginalLockType.Chance_Period)[0] : lockChanceRegularities[0])
  const [lockIsCumulative, lockSetIsCumulative] = React.useState(isEdit ? lock.OriginalLockType.Cumulative : false)

  const [lockRedMin, lockSetRedMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Reds : 0)
  const [lockRedMax, lockSetRedMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Reds : 0)
  const [lockYellowRandomMin, lockSetYellowRandomMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_RandomRed : 0)
  const [lockYellowRandomMax, lockSetYellowRandomMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_RandomRed : 0)
  const [lockYellowRemoveMin, lockSetYellowRemoveMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_RemoveRed : 0)
  const [lockYellowRemoveMax, lockSetYellowRemoveMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_RemoveRed : 0)
  const [lockYellowAddMin, lockSetYellowAddMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_AddRed : 0)
  const [lockYellowAddMax, lockSetYellowAddMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_AddRed : 0)
  const [lockStickyMin, lockSetStickyMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Stickies : 0)
  const [lockStickyMax, lockSetStickyMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Stickies : 0)
  const [lockFreezeMin, lockSetFreezeMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Freezes : 0)
  const [lockFreezeMax, lockSetFreezeMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Freezes : 0)
  const [lockDoubleMin, lockSetDoubleMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Doubles : 0)
  const [lockDoubleMax, lockSetDoubleMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Doubles : 0)
  const [lockResetMin, lockSetResetMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Resets : 0)
  const [lockResetMax, lockSetResetMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Resets : 0)
  const [lockGreenMin, lockSetGreenMin] = React.useState(isEdit ? lock.OriginalLockType.Variable_Min_Greens : 1)
  const [lockGreenMax, lockSetGreenMax] = React.useState(isEdit ? lock.OriginalLockType.Variable_Max_Greens : 1)
  const [lockMultipleGreensRequired, lockSetMultipleGreensRequired] = React.useState(isEdit ? lock.OriginalLockType.Multiple_Greens_Required : false)
  const [lockHideCardInformation, lockSetHideCardInformation] = React.useState(isEdit ? lock.OriginalLockType.Hide_Card_Info : false)
  const [lockStartFrozen, lockSetStartFrozen] = React.useState(isEdit ? lock.Start_Lock_Frozen : false)
  /*
  const [lockAutoResets, lockSetAutoResets] = React.useState(false)
  const [lockAutoResetEveryXDays, lockSetAutoResetEveryXDays] = React.useState(2)
  const [lockAutoResetMax, lockSetAutoResetMax] = React.useState(1)
  const [lockDisableKHDecision, lockSetDisableKHDecision] = React.useState(false)

  const [lockEnableBuyout, lockSetEnableBuyout] = React.useState(true) */

  const closeSettings = (): void => {
    dispatch(confirmationActions.showConfirmation({
      title: translate('createedit.warning_unsaved.title'),
      text: translate('createedit.warning_unsaved.text'),
      onOk: () => navigation.goBack()
    }))
  }

  const createOrEditLock = (): void => {
    const lockRequest: CreateLockRequest = {
      LockName: lockName,
      Shared: lockIsShared,
      Variable_Max_Greens: lockGreenMax,
      Variable_Max_Reds: lockRedMax,
      Variable_Max_Freezes: lockFreezeMax,
      Variable_Max_Doubles: lockDoubleMax,
      Variable_Max_Resets: lockResetMax,
      Variable_Max_Stickies: lockStickyMax,
      Variable_Max_AddRed: lockYellowAddMax,
      Variable_Max_RemoveRed: lockYellowRemoveMax,
      Variable_Max_RandomRed: lockYellowRandomMax,
      Variable_Min_Greens: lockGreenMin,
      Variable_Min_Reds: lockRedMin,
      Variable_Min_Freezes: lockFreezeMin,
      Variable_Min_Doubles: lockDoubleMin,
      Variable_Min_Resets: lockResetMin,
      Variable_Min_Stickies: lockStickyMin,
      Variable_Min_AddRed: lockYellowAddMin,
      Variable_Min_RemoveRed: lockYellowRemoveMin,
      Variable_Min_RandomRed: lockYellowRandomMin,
      Chance_Period: lockChanceRegularity.time,
      Cumulative: lockIsCumulative,
      Multiple_Greens_Required: lockMultipleGreensRequired,
      Hide_Card_Info: lockHideCardInformation,
      Allow_Fakes: lockAllowFakeCopies,
      Min_Fakes: lockFakeCopiesMin,
      Max_Fakes: lockFakeCopiesMax,
      Auto_Resets_Enabled: false,
      Reset_Frequency: 0,
      Max_Resets: 0,
      Checkins_Enabled: lockRequireCheckins,
      Checkins_Frequency: lockCheckinFrequency,
      Checkins_Window: lockCheckinWindow,
      Allow_Buyout: false,
      Start_Lock_Frozen: lockStartFrozen,
      Disable_Keyholder_Decision: false,
      Limit_Users: lockLimitUsers,
      User_Limit_Amount: lockMaxUsers,
      Block_Test_Locks: lockBlockTest,
      Block_User_Rating_Enabled: lockBlockLowRating,
      Block_User_Rating: lockMinRatingRequired,
      Block_Already_Locked: lockBlockAlreadyLocked,
      Block_Stats_Hidden: lockBlockStatsHidden,
      Only_Accept_Trusted: lockRequireTrusted,
      Require_DM: lockRequireDm
    }

    if (isEdit) {
      // TODO make update request
      dispatch(createOriginalLock(lockRequest).execute).then(() => {
        // close and navigate to my locks screen
        navigation.goBack()
        navigation.navigate('MyLocks')
      }).catch((e: Error) => {
        dispatch(confirmationActions.showConfirmation({
          title: translate('createedit.error.title'),
          text: e.message,
          onOk: () => {}
        }))
      })
    } else {
      dispatch(createOriginalLock(lockRequest).execute).then(() => {
        // close and navigate to my locks screen
        navigation.goBack()
        navigation.navigate('MyLocks')
      }).catch((e: Error) => {
        dispatch(confirmationActions.showConfirmation({
          title: translate('createedit.error.title'),
          text: e.message,
          onOk: () => {}
        }))
      })
    }
  }

  const CloseAction = (): React.ReactElement => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey={isEdit ? 'createedit.edit_title' : 'createedit.create_title'} />}
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
            <FormGroup text="createedit.lock_type.shared">
              <Toggle checked={lockIsShared} onChange={() => lockSetIsShared(!lockIsShared)} />
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
            <FormGroup text="createedit.shared.block_test">
              <Toggle checked={lockBlockTest} onChange={() => lockSetBlockTest(!lockBlockTest)} />
            </FormGroup>
            <FormGroup text="createedit.shared.block_already_locked">
              <Toggle checked={lockBlockAlreadyLocked} onChange={() => lockSetBlockAlreadyLocked(!lockBlockAlreadyLocked)} />
            </FormGroup>
            <FormGroup text="createedit.shared.fake_copies">
              <Toggle checked={lockAllowFakeCopies} onChange={() => lockSetAllowFakeCopies(!lockAllowFakeCopies)} />
            </FormGroup>
            {lockAllowFakeCopies && <>
              <CardPicker title="createedit.shared.fake_copies.number" max={lockFakeCopiesMax} min={lockFakeCopiesMin} setMax={lockSetFakeCopiesMax} setMin={lockSetFakeCopiesMin} name='fake_copies' />
            </>}
            <FormGroup text="createedit.shared.require_checkins">
              <Toggle checked={lockRequireCheckins} onChange={() => lockSetRequireCheckins(!lockRequireCheckins)} />
            </FormGroup>
            {lockRequireCheckins && <>
              <FormGroup text="createedit.shared.checkins.frequency">
                <NumberSelection value={lockCheckinFrequency} onChange={lockSetCheckinFrequency} />
              </FormGroup>
              <FormGroup text="createedit.shared.checkins.window">
                <NumberSelection value={lockCheckinWindow} onChange={lockSetCheckinWindow} />
              </FormGroup>
            </>}
            <FormGroup text="createedit.shared.limit_users">
              <Toggle checked={lockLimitUsers} onChange={() => lockSetLimitUsers(!lockLimitUsers)} />
            </FormGroup>
            {lockLimitUsers && <>
              <FormGroup text="createedit.shared.limit_users_num">
                <NumberSelection value={lockMaxUsers} onChange={lockSetMaxUsers} min={boundaries.max_users.min} max={boundaries.max_users.max} />
              </FormGroup>
            </>}
            <FormGroup text="createedit.shared.block_low_rating">
              <Toggle checked={lockBlockLowRating} onChange={() => lockSetBlockLowRating(!lockBlockLowRating)} />
            </FormGroup>
            {lockBlockLowRating && <>
              <FormGroup text="createedit.shared.block_low_rating.min">
                <NumberSelection value={lockMinRatingRequired} onChange={lockSetMinRatingRequired} min={boundaries.min_rating.min} max={boundaries.min_rating.max} />
              </FormGroup>
            </>}
          </TitleGroup>}
          <TitleGroup title="createedit.card.title">
            <ChanceRegularity value={lockChanceRegularity.value} set={lockSetChanceRegularity} />
            <FormGroup text="createedit.card.cumulative">
              <Toggle checked={lockIsCumulative} onChange={() => lockSetIsCumulative(!lockIsCumulative)} />
            </FormGroup>
            {/* Red */}
            <CardPicker title='createedit.card.red' max={lockRedMax} min={lockRedMin} setMax={lockSetRedMax} setMin={lockSetRedMin} name='red' />
            {/* Yellow random */}
            <CardPicker title='createedit.card.yellow_random' max={lockYellowRandomMax} min={lockYellowRandomMin} setMax={lockSetYellowRandomMax} setMin={lockSetYellowRandomMin} name='yellow_random' />
            {/* Yellow remove */}
            <CardPicker title='createedit.card.yellow_remove' max={lockYellowRemoveMax} min={lockYellowRemoveMin} setMax={lockSetYellowRemoveMax} setMin={lockSetYellowRemoveMin} name='yellow_remove' />
            {/* Yellow add */}
            <CardPicker title='createedit.card.yellow_add' max={lockYellowAddMax} min={lockYellowAddMin} setMax={lockSetYellowAddMax} setMin={lockSetYellowAddMin} name='yellow_add' />
            {/* Sticky */}
            <CardPicker title='createedit.card.sticky' max={lockStickyMax} min={lockStickyMin} setMax={lockSetStickyMax} setMin={lockSetStickyMin} name='sticky' />
            {/* Freeze */}
            <CardPicker title='createedit.card.freeze' max={lockFreezeMax} min={lockFreezeMin} setMax={lockSetFreezeMax} setMin={lockSetFreezeMin} name='freeze' />
            {/* Double */}
            <CardPicker title='createedit.card.double' max={lockDoubleMax} min={lockDoubleMin} setMax={lockSetDoubleMax} setMin={lockSetDoubleMin} name='double' />
            {/* Reset */}
            <CardPicker title='createedit.card.reset' max={lockResetMax} min={lockResetMin} setMax={lockSetResetMax} setMin={lockSetResetMin} name='reset' />
            {/* Green */}
            <FormGroup text="createedit.card.multiple_greens_required">
              <Toggle checked={lockMultipleGreensRequired} onChange={() => lockSetMultipleGreensRequired(!lockMultipleGreensRequired)} />
            </FormGroup>
            <CardPicker title='createedit.card.green' max={lockGreenMax} min={lockGreenMin} setMax={lockSetGreenMax} setMin={lockSetGreenMin} name='green' />
            <FormGroup text="createedit.card.hide_info">
              <Toggle checked={lockHideCardInformation} onChange={() => lockSetHideCardInformation(!lockHideCardInformation)} />
            </FormGroup>
            <FormGroup text="createedit.card.start_frozen">
              <Toggle checked={lockStartFrozen} onChange={() => lockSetStartFrozen(!lockStartFrozen)} />
            </FormGroup>
          </TitleGroup>
          <FormButton onPress={createOrEditLock}>{translate(isEdit ? 'createedit.edit' : 'createedit.create')}</FormButton>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateEditLockView
