import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, Animated, TouchableHighlight, TouchableOpacity, StatusBar } from "react-native";

//comented out touchable opacity, its needed for the old click to set notification
//import { TouchableOpacity } from "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";

import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import styles from "../stylesheet";
import { FlatList, ScrollView } from "react-native-gesture-handler";
//import hard coded notifcations
import Notifications from "../model/Notifications"; 
import { SwipeListView } from 'react-native-swipe-list-view';
import { render } from "react-dom/cjs/react-dom.production.min";


export function HomeScreenView() {

  const { user, projectData } = useAuth();
  const [newMemberOf] = useState()
  
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

  const handleNotifications = (item) => {

      PushNotification.localNotification({
        channelId: "test-channel",
        title: item,//"Fridge Alert, ",
        message: "The milk in here stinks!",  
        bigPictureUrl:"https://cdn-icons-png.flaticon.com/512/291/291893.png",
        color:"white",
        largeIcon:"ic_cart",
        smallIcon:"ic_cart",
        
      })
  }
  const NotificationsList = [
    
    "2 gallons of milk added to inventory"
    ,
    "Luncheables removed from inventory"
    ,
    "Halal meat added to inventory"
    ,
    "Gatorade removed from inventory"
    ,
    "Water added to inventory"
    ,
    "Eggs added to inventory"
    ,
    "Potatoes removed from inventory"
    ,
    "2 gallons of milk added to inventory"
    ,
    "Luncheables added to inventory"
    ,
    "Halal meat added to inventory"
    ,
    "Gatorade removed from inventory"
    ,
    "Water added to inventory"
    ,
    "Eggs added to inventory"
    ,
    "Potatoes removed from inventory"
];

  var data;
  const sendData = () => {
    {projectData.map((project)=> (
      data = project.name
    ))}
    return data;
  }

  const Item = ({ item }) => (
    <View style={styless.item}>
      <Text style={styless.title}>{item}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

      return (
        <View style = {styless.screen}>
          <FlatList
          data={NotificationsList}
          renderItem={renderItem}
          />
        </View>

        /*
            <SwipeListView
            data={this.state.listViewData}
            renderItem={ (data, rowMap) => (
                <View style={styles.rowFront}>
                    <Text>I am {data.item.text} in a SwipeListView</Text>
                </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            />
            */
      );
  
    
  
/*
      return (
    <View style = {styless.screen}>
        <SwipeListView>
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
        </SwipeListView>
    </View>
  );
*/ 

}


const styless = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e14255',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  item: {
    backgroundColor: '#e1d642',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 11,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#1802a8",
    shadowOffset: {
          width: 0,
          height: 4,
      },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation:  24,
  },
  title: {
    fontSize: 25,
  },
});


