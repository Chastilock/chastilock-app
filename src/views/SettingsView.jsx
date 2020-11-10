import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Text } from '@ui-kitten/components';

import { actions } from '../state/sections/settings';
import { useTracked } from '../state';

const CloseIcon = (props) => (
  <Icon {...props} name="close-outline" />
);

const FormGroup = ({ text, children }) => (
  <View style={styles.formGroup}>
    <Text>{text}</Text>
    <View category="s2">{children}</View>
  </View>
)

const SettingsGroup = ({ title, children }) => (
  <View style={styles.settingsGroup}>
    <Text category="s1">{title}</Text>
    {children}
  </View>
)

const SettingsView = ({ navigation }) => {
  const updateTheme = isDark => {
    dispatch(actions.changeTheme(isDark ? 'dark' : 'light'));
  }
  const updateShowPublicStats = showPublicStats => {
    dispatch(actions.setPublicStats(showPublicStats));
  }

  const [state, dispatch] = useTracked();

  const closeSettings = () => {
    navigation.goBack();
  };

  const CloseAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Chastilock - Settings'
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <SettingsGroup title="Appearance">
          <FormGroup text="Dark mode">
            <Toggle checked={state.settings.theme === 'dark'} onChange={updateTheme} />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="Account">
          
        </SettingsGroup>
        <SettingsGroup title="Notifications">

        </SettingsGroup>
        <SettingsGroup title="Security">

        </SettingsGroup>
        <SettingsGroup title="Privacy">
          <FormGroup text="Show public stats on my profile">
            <Toggle checked={state.settings.publicStats} onChange={updateShowPublicStats} />
          </FormGroup>
        </SettingsGroup>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  }
})

export default SettingsView;