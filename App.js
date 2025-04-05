import React from 'react';
import { NavigationContainer } from './navigation/NavigationContainer';
import { GlucoseProvider } from './context/GlucoseContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <GlucoseProvider>
      <UserProvider>
        <NavigationContainer />
      </UserProvider>
    </GlucoseProvider>)
}