import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { ProjectsView } from "../views/ProjectsView";
import { UserSettingsView } from "../views/UserSettingsView";
import { TasksView } from "../views/TasksView";
import { WelcomeView } from "../views/WelcomeView";
import { TasksProvider } from "../providers/TasksProvider";
import { Logout } from "../components/Logout";
import { Signup } from "../views/Signup";
import { Barcode } from "../views/BarcodeView";

const Stack = createStackNavigator();

const WelcomeViewNavigator = () => {
  return (
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
    </Stack.Navigator>
  );
};

export { WelcomeViewNavigator };

const UserSettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={UserSettingsView}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
};
export { UserSettingsNavigator };

const InventoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inventory"
        component={ProjectsView}
        title="ProjectsView"
        headerBackTitle="log out"
        options={{
          headerLeft: function Header() {
            return <Logout />;
          },
        }}
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
      <Stack.Screen
        name="Bar-code"
        component={Barcode}
        options={{ title: "Barcode Scanner" }}
      />
    </Stack.Navigator>
  );
};
export { InventoryNavigator };
