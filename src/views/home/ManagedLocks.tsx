import React from 'react'
import { SafeAreaView } from 'react-native'
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

const Home = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const navigateDetails = (): void => {
    navigation.navigate('Details')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Chastilock - Managed Locks' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>
    </SafeAreaView>
  )
}

export default Home
