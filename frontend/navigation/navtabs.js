import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserSettingsView from "../views/UserSettingsView";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={UserSettingsView} />
    </Tab.Navigator>
  );
};

export default Tabs;
