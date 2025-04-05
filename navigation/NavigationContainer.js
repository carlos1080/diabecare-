
// navigation/NavigationContainer.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import SOSButton from "../components/SOSButton"; // <-- importar

export const NavigationContainer = () => {
  return (
    <View style={{ flex: 1 }}>
      <RNNavigationContainer>
        <TabNavigator />
      </RNNavigationContainer>
      <SOSButton /> {/* <-- botón SOS sobre todo */}
    </View>
  );
};
