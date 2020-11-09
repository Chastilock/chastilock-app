import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

const Home = ({ navigation }) => {

  const closeSettings = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Chastilock - Settings' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={closeSettings}>Close Settings</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default Home;