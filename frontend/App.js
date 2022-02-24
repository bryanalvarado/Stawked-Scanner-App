import React from "react";
import { Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./providers/AuthProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  UserSettingsNavigator,
  WelcomeViewNavigator,
} from "./navigation/stackNav";

import { InventoryNavigator } from "./navigation/stackNav";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Inventory" component={InventoryNavigator} />
          <Tab.Screen name="Home" component={WelcomeViewNavigator} />
          <Tab.Screen name="Settings" component={UserSettingsNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
