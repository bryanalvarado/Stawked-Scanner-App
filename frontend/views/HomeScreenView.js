import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";

import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import styles from "../stylesheet";
import { ScrollView } from "react-native-gesture-handler";

export function HomeScreenView() {

  const { user, projectData } = useAuth();
  useEffect(() => {
    updateMemberOf(); //runs when data is manipulated
    //call notification here
  },[projectData])

  

  // the onClickProject navigates to the InventoryList with the project name
  // and project partition value
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
      console.log(err)
    }
  }
  //new stuff pasted above here

  const handleNotifications = (item) => {
      PushNotification.localNotification({
        channelId: "test-channel",
        title: item,//"Fridge Alert, ",
        message: "The milk in here stinks!",  
        bigPictureUrl:"https://cdn-icons-png.flaticon.com/512/291/291893.png",
        color:"black",
        largeIcon:"ic_notification",
        smallIcon:"ic_cart",
      })
  }
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
    {projectData.map((project)=> (
      data = project.name
    ))}
    return data;
  }

  return (
    <TouchableOpacity onPress={()=>{handleNotifications(sendData())}}>
      <Text>hellooooo</Text>
      {projectData.map((project)=> (
        <View key = {project.name}>
            <Text>{project.name}</Text>

        </View>
      ))}
    </TouchableOpacity>
  );
}

const styless = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

/*
return (
    <View style={myStyles.screen}>
      <View>
        <ScrollView>
          {projectData.map((project) => (
            <View key={project.name}>

              <TouchableOpacity onPress={() => onClickProject(project)} style={[myStyles.cardView, styles.navBarShadow]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                  <View>
                    <View >
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {project.name}
                      </Text>
                    </View>

                    <View >
                      <Text style={{color: 'gray'}}>
                        {"5"} items
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={{fontSize: 20, color: 'gray'}}>
                      {'>'}
                    </Text>
                  </View>


                </View>
              </TouchableOpacity>

              {/* <ListItem
                onPress={() => onClickProject(project)}
                bottomDivider
                key={project.name}
              >
                <ListItem.Content>
                  <ListItem.Title>{project.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem> *\/}
              </View>
              ))}
            </ScrollView>
          </View>
        </View>
      );
   */