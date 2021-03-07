import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, useTranslation } from '@chastilock/components'
import { BackButtonAccessory } from '../common/Accessories'

interface CkMigrateProps {
  onOk: () => void
  onBack?: () => void
}
export const FinishSetup = (props: CkMigrateProps): React.ReactElement => {
  const [translate] = useTranslation()
  const [username, setUsername] = React.useState('')
  const [transferCode, setTransferCode] = React.useState('')

  const migrate = (): void => {
    // TODO make api call to migrate, and only call this if okay
    props.onOk()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title={translate('setup.ck_migrate.title')}
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={() => props.onBack?.()} />}
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.ck_migrate.info" center style={{ marginBottom: 20 }} />

        <Input value={username} onChange={e => setUsername((e.target as any).value)} placeholder={translate('setup.ck_migrate.ck_username')} />
        <Input value={transferCode} onChange={e => setTransferCode((e.target as any).value)} textContentType="oneTimeCode" placeholder={translate('setup.ck_migrate.transfer_code')} />

        <Button style={{ marginTop: 10 }} onPress={migrate}>{translate('setup.ck_migrate')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default FinishSetup
