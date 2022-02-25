import React from "react";
import { Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";

import { WelcomeView } from "./views/WelcomeView";
import { Signup } from "./views/Signup";
import { Barcode } from "./views/BarcodeView";
import { ProjectsView } from "./views/ProjectsView";
import { TasksView } from "./views/TasksView";
import { HomeScreenView } from "./views/HomeScreenView";
import { UserSettingsView } from "./views/UserSettingsView";
import { NavTabs } from "./navigation/navTabs";
import { Logout } from "./components/Logout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{ title: "Stawked App" }}
          />
          <Stack.Screen
            name="Sign-up"
            component={Signup}
            options={{ title: "Sign up" }}
          />

          <Stack.Screen
            name="Home"
            component={NavTabs}
            options={{ title: "Stawked App" }}
          />

          <Stack.Screen
            name="Bar-code"
            component={Barcode}
            options={{ title: "Barcode Scanner" }}
          />
          <Stack.Screen name="Task List">
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition } = route.params;
              return (
                <TasksProvider user={user} projectPartition={projectPartition}>
                  <TasksView navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
