import React from "react";
import { Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";

import { WelcomeView } from "./views/WelcomeView";
import { Signup } from "./views/Signup";
import { TasksView } from "./views/TasksView";
import { NavTabs } from "./navigation/navTabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const App = () => {

  const getHeaderTitle = (route) => {

    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Inventory':
        return 'Inventory'
      case 'Family':
        return 'My Family'
      case 'Settings':
        return 'Settings'
    }
  }


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
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
              headerTitleAlign: "center"
              
            })}
          />
          <Stack.Screen name="Task List" options={({ route }) => ({
              headerTitleAlign: "center"
            })} >
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
