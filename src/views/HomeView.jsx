import React from 'react';
import { SafeAreaView } from 'react-native';
import { Icon, Button, Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import HomeNavigator from './home/HomeNavigator';

const SettingsIcon = (props) => (
  <Icon {...props} name="settings-outline" />
);

const Home = ({ navigation }) => {
  const navigateSettings = () => {
    navigation.navigate('Settings');
  };

  const SettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} onPress={navigateSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Chastilock"
        alignment="center"
        accessoryRight={SettingsAction}
      />
      <Divider/>
      <HomeNavigator />
    </SafeAreaView>
  );
};

export default Home;