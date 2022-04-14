import React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { ItemsProvider } from "./providers/ItemsProvider";

import { LoginView } from "./views/LoginView";
import { Signup } from "./views/Signup";
import { InventoryList } from "./views/InventoryList";
import { NavBottomBar } from "./navigation/NavBottomBar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { RequestsView } from "./views/RequestsView";
import { AboutView } from "./views/AboutView";
import { PolicyView } from "./views/PolicyView";
import { TermsView } from "./views/TermsView";
const Stack = createStackNavigator();

const App = () => {
  const getHeaderTitle = (route) => {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    //  ignore - testing commit 
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    
    switch (routeName) {
      case "Home":
        return "Home";
      case "Inventory":
        return "Inventory";
      case "Family":
        return "My Household";
      case "Settings":
        return "Settings";
    }
  };

  const getHeaderRight = (route, navigation) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    
    switch(routeName){
      case "Family":
        return(
          <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.navigate("Requests")}>
            <Text style={{color: '#458FF7', fontWeight: 'bold'}}>Requests</Text>
          </TouchableOpacity>
        );
      default:
        return null
    }
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginView"
            component={LoginView}
            options={{ 
              headerShown: false,
             }}
          />
          <Stack.Screen
            name="Sign-up"
            component={Signup}
            options={{ 
              headerShown: false
             }}
          />
          <Stack.Screen
            name="Home"
            component={NavBottomBar}
            options={({ route, navigation }) => ({
              headerTitle: getHeaderTitle(route),
              headerTitleAlign: "center",
              headerRight: () => (
                
                getHeaderRight(route, navigation)
              ),
              // headerStyle: {
              //   backgroundColor: 'royalblue',
              // },
            })
          }
          />

          <Stack.Screen
            name="InventoryList"
            options={({ route }) => ({
              headerTitleAlign: "center",
            })}
          >
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition } = route.params;
              return (
                <ItemsProvider user={user} projectPartition={projectPartition}>
                  <InventoryList navigation={navigation} route={route} />
                </ItemsProvider>
              );
            }}
          </Stack.Screen>

          <Stack.Screen
            name="Requests"
            component={RequestsView}
            options={{ 
              headerTitleAlign: "center",
              title: "Requests"
             }}
          />
          <Stack.Screen
            name="About"
            component={AboutView}
            options={{ 
              headerTitleAlign: "center",
              title: "About"
             }}
          />
          <Stack.Screen
            name="Policy"
            component={PolicyView}
            options={{ 
              headerTitleAlign: "center",
              title: "Policy"
             }}
          />
          <Stack.Screen
            name="Terms"
            component={TermsView}
            options={{ 
              headerTitleAlign: "center",
              title: "Terms and Conditions"
             }}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
