import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import TopTabBar from './TopTabBar';

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back" />
);

const BackAction = () => (
  <TopNavigationAction />
);

const TopNavigationComponent = ({ title }) => {
  return (
    <>
      <TopNavigation
        accessoryLeft={BackAction}
        title={title}
      />
      <TopTabBar />
    </>
  )
}

export default TopNavigationComponent;