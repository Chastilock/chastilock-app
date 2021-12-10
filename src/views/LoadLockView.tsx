import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { Text, TextType, useTranslation, FormButton } from '@chastilock/components'
import { CreatedLock } from '@chastilock/state/sections/createdlock'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

const LoadLockView = ({ route, navigation }: { navigation: MaterialTopTabBarProps['navigation'], route: any }): React.ReactElement => {
  // const dispatch = useDispatch()
  const [translate] = useTranslation()

  const lock = route.params?.lock as CreatedLock
  console.log(lock)

  const closeSettings = (): void => {
    navigation.goBack()
  }

  const loadLock = (): void => {
    /* const lockRequest: CreateLockRequest = {
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

    const reopenInEdit = (lock: CreatedLock): void => {
      navigation.goBack()
      navigation.navigate('CreateLock', {
        lock
      })
    }

    if (isEdit) {
      const editLockRequest: EditLockRequest = {
        Lock_ID: parseInt(lock.Lock_ID, 10),
        ...lockRequest
      }
      dispatch(editOriginalLock(editLockRequest).execute).then(() => {
        setDirty(false)
      }).catch((e: Error) => {
        dispatch(confirmationActions.showConfirmation({
          title: translate('createedit.error.title'),
          text: e.message,
          onOk: () => {}
        }))
      })
    } else {
      dispatch(createOriginalLock(lockRequest).execute).then((response: { data: { createOriginalLock: CreatedLock}}) => {
        console.log(response)
        // display popup if want to load
        dispatch(confirmationActions.showConfirmation({
          title: translate('createedit.question_load.title'),
          text: translate('createedit.question_load.text'),
          onYes: () => {
            loadLock()
          },
          onDismiss: () => reopenInEdit(response.data.createOriginalLock),
          onNo: () => reopenInEdit(response.data.createOriginalLock)
        }))
      }).catch((e: Error) => {
        dispatch(confirmationActions.showConfirmation({
          title: translate('createedit.error.title'),
          text: e.message,
          onOk: () => {}
        }))
      })
    } */
  }

  const CloseAction = (): React.ReactElement => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey={'load.title'} />}
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <ScrollView>
        <Layout style={{ flex: 1, padding: 20 }}>
          <FormButton onPress={loadLock}>{translate('load.load')}</FormButton>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoadLockView
