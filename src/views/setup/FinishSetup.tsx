import React from 'react'
import { TopNavigation, Divider, Button } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, useTranslation } from '@chastilock/components'
import { useTrackedState } from '@chastilock/state'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'

interface FinishSetupProps {
  onOk: () => void
  onCkMigrate: () => void
}
export const FinishSetup = (props: FinishSetupProps): React.ReactElement => {
  const [translate] = useTranslation()
  const state = useTrackedState()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: settingsSelectors.getThemeBackground(state.settings) }}>
      <TopNavigation
        title={translate('setup.finish.title')}
        alignment="center"
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.finish.info" center style={{ marginBottom: 20 }} />

        <Button style={{ marginTop: 10 }} onPress={props.onCkMigrate}>{translate('setup.finish.ck_migrate')}</Button>
        <Button style={{ marginTop: 10 }} onPress={props.onOk}>{translate('setup.finish.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default FinishSetup
