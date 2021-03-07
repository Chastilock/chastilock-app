import React from 'react'
import { TopNavigation, Divider, Button, Input, CheckBox } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { BackButtonAccessory } from '../common/Accessories'

interface CkMigrationProps {
  onOk: () => void
  onBack?: () => void
}
export const CkMigration = (props: CkMigrationProps): React.ReactElement => {
  const [translate] = useTranslation()
  const [username, setUsername] = React.useState('')
  const [transferCode, setTransferCode] = React.useState('')
  const [isShowingSelection, setShowSelection] = React.useState(false)

  const migrate = (): void => {
    // TODO make api call to migrate, and only call this if okay
    setShowSelection(true)
  }

  if (isShowingSelection) {
    return <CkMigrationSelection onBack={() => setShowSelection(false)} onOk={props.onOk} data={{}} />
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

interface CkMigrationSelectionProps {
  onBack?: () => void
  onOk: () => void
  data: any
}
export const CkMigrationSelection = (props: CkMigrationSelectionProps): React.ReactElement => {
  const [translate] = useTranslation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title={translate('setup.ck_migrate.selection.title')}
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={() => props.onBack?.()} />}
      />
      <Divider />
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.ck_migrate.selection.info" center style={{ marginBottom: 20 }} />

        <Text category={TextType.HEADING3} translationKey="setup.ck_migrate.selection.lockee" />
        <CheckBox>My active lock(s) (1 lock active)</CheckBox>
        <Text translationKey="setup.ck_migrate.selection.kh_lock_info" />
        <CheckBox>My lock history (23 past locks)</CheckBox>
        <CheckBox>My ratings (4.8/5, 17 ratings)</CheckBox>

        <Text category={TextType.HEADING3} translationKey="setup.ck_migrate.selection.keyholder" />
        <CheckBox>My active lock(s) (3 locks active)</CheckBox>
        <Text translationKey="setup.ck_migrate.selection.kh_lock_info" />
        <CheckBox>My lock history (87 past locks)</CheckBox>
        <CheckBox>My ratings (4.9/5, 78 ratings)</CheckBox>

        <Button style={{ marginTop: 10 }} onPress={props.onOk}>{translate('setup.ck_migrate.selection.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default CkMigration
