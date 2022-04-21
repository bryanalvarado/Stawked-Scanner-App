import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";
import { ScrollView } from "react-native-gesture-handler";


export function HomeScreenView({ navigation }) {
  const [notifications, setNotifications] = useState();
  const { user, projectData, clearAllNotifications } = useAuth();

  useEffect(() => {
    updateMemberOf();
    getAllNotifications();
  }, [projectData]);

  const updateMemberOf = async () => {
    try {
      const memberOf = await user.functions.updateMemberOf(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllNotifications = async () => {
    try {
      const myNotifications = await user.functions.getAllNotifications(user.id);
      myNotifications.reverse();
      setNotifications(myNotifications);
    } catch (err) {
      console.log(err);
    }
  };

  const clearNotificationsOnClick = () => {
    Alert.alert("Clear All Notifications", null, [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setNotifications([]);
          clearAllNotifications();
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };


  return (
    <View style={myStyles.screen}>
      {notifications ? (
        notifications.length > 0 ? (
          <View
            style={{
              marginVertical: 10,
              alignSelf: "center",
            }}
          >
            <Text onPress={() => clearNotificationsOnClick()}>
              <Text style={{ fontSize: 15, color: "red" }}>
                Clear All Notifications
              </Text>
            </Text>
          </View>
        ) : null
      ) : null}
      <View style={{ marginBottom: 45 }}>
        <ScrollView>
          {notifications ? (
            notifications.length > 0 ? (
              notifications.map((notification) => (
                <View key={notification.id}>
                  <View style={[myStyles.cardView, styles.navBarShadow]}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              justifyContent: "center",
                              marginBottom: 5,
                            }}
                          >
                            {notification.action} on {notification.date}
                          </Text>
                        </View>

                        <View>
                          <Text style={{ color: "white", fontSize: 15 }}>
                            {notification.title}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={{ flex: 1, alignSelf: "center", marginTop: 5 }}>
                <Text style={{ color: "gray" }}>No Notifications</Text>
              </View>
            )
          ) : (
            <View style={{ flex: 1, alignSelf: "center", marginTop: 5 }}>
              <Text style={{ color: "gray" }}>No Notifications</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  cardView: {
    borderWidth: 0,
    backgroundColor: "#4682b4",
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
});
