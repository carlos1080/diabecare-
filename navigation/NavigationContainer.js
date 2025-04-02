


import React from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

export const NavigationContainer = () => {
  return (
    <RNNavigationContainer>
      <TabNavigator />
    </RNNavigationContainer>
  );
};