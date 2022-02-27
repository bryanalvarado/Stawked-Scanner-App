import React from "react";
import { ProjectsView } from "../views/ProjectsView";
import { UserSettingsView } from "../views/UserSettingsView";
import { Barcode, BarcodeView } from "../views/BarcodeView";
import { ManageTeam } from "../components/ManageTeam";
import { HomeScreenView } from "../views/HomeScreenView";
import { TasksProvider } from "../providers/TasksProvider";
import { useAuth } from "../providers/AuthProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../stylesheet";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FamilyView } from "../views/FamilyView";

const Tab = createBottomTabNavigator();
const CustomNavBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.navBarShadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        alignContent: "center",
        borderRadius: 35,
        backgroundColor: "#e32f45",
        ...styles.navBarShadow // camera shadow
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export function NavTabs() {
  const { user } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.navBarShadow,
        },
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={ProjectsView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/inventory.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                INVENTORY
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreenView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        children={() => {
          return (
            user ? (
             <TasksProvider user={user} projectPartition={`project=${user.id}`}>
              <Barcode />
              </TasksProvider>
              
              ) : null
          )
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/camera.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
                
              }}
            />
          ),

          tabBarButton: (props) => <CustomNavBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Family"
        component={FamilyView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/household.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                FAMILY
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserSettingsView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/user.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
