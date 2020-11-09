import React from 'react';
import { View, SafeAreaView, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

import TopNavigation from './components/TopNavigation';
import Home from './views/home/MyLocks';
// import { ApolloProvider, useQuery, gql } from '@apollo/client';

// import { apolloClient } from './apollo';

/* const GET_TWEET = gql`
  query {
    twitter {
      tweet(id: "1261034643710775299") {
        text
        user {
          name
          screen_name
          profile_image_url
        }
      }
    }
  }
` */

const App = () => {
  return (
    <Home />
  );
}

export default App;