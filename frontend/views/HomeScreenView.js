import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import styles from "../stylesheet";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { AddInventoryItem } from "../components/AddInventoryItem";

export function HomeScreenView({ navigation }) {
  const [notifications, setNotifications] = useState();
  const [keys, setKeys] = useState();
  const { user, projectData, clearAllNotifications } = useAuth();
  const [inviteUserModalVisible, setInviteUserModalVisible] = useState(false);

  useEffect(() => {
    updateMemberOf();
    getAllNotifications();
  }, [projectData]);

  const onClickProject = async (project) => {
    navigation.navigate("InventoryList", {
      name: project.name,
      projectPartition: project.partition,
    });
  };

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

  const handleNotifications = (item) => {
    PushNotification.localNotification({
      channelId: "test-channel",
      title: item, //"Fridge Alert, ",
      message: "The milk in here stinks!",
      bigPictureUrl: "https://cdn-icons-png.flaticon.com/512/291/291893.png",
      color: "white",
      largeIcon: "ic_cart",
      smallIcon: "ic_cart",
    });
  };
  // this notification type is scheduled. Not currently used but might be usefull
  // const informUser = (item) => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: "test-channel",
  //       title: item,//"Fridge Alert, ",
  //       message: "The milk in here stinks!",
  //       bigPictureUrl:"https://cdn-icons-png.flaticon.com/512/1198/1198284.png",
  //       color:"black",
  //       largeIcon:"ic_notification",
  //       smallIcon:"ic_cart",
  //       date: new Date(Date.now() + 5 * 1000),
  //   })
  // }

  var data;
  const sendData = () => {
    {
      projectData.map((project) => (data = project.name));
    }
    return data;
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
      <View>
        <ScrollView>
          {notifications ? (
            notifications.length > 0 ? (
              notifications.map((notification) => (
                <View key={notification.id}>
                  <TouchableOpacity
                    onPress={() => {
                      handleNotifications(sendData());
                    }}
                    style={[myStyles.cardView, styles.navBarShadow]}
                  >
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
                  </TouchableOpacity>
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

const styless = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

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
