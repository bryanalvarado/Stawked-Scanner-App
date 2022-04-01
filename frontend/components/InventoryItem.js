import React, { useState } from "react";
import { ListItem, Text, Image, StyleSheet, View } from "react-native-elements";
import { useItems } from "../providers/ItemsProvider";
import { ActionSheet } from "./ActionSheet";
import { Item } from "../schemas";

import styles from "../stylesheet";

export function InventoryItem({ item }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const { deleteItem, setItemStatus } = useItems();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteItem(item);
      },
    },
  ];

  const itemStatus = (item) => {

    const status = item.status
    if(status === Item.STATUS_COMPLETE){
      return <Text>Out of Stock</Text>
    } else if (status === Item.STATUS_IN_PROGRESS){
      return <Text>Running Low</Text>
    } else if (status === Item.STATUS_OPEN){
      return <Text>Stocked</Text>
    } else {
      return null
    }
  }

  // For each possible status other than the current status, make an action to
  // move the item into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  if (item.status !== "" && item.status !== Item.STATUS_OPEN) {
    actions.push({
      title: "Fully Stocked",
      action: () => {
        setItemStatus(item, Item.STATUS_OPEN);
      },
    });
  }
  if (item.status !== Item.STATUS_IN_PROGRESS) {
    actions.push({
      title: "Running low",
      action: () => {
        setItemStatus(item, Item.STATUS_IN_PROGRESS);
      },
    });
  }
  if (item.status !== Item.STATUS_COMPLETE) {
    actions.push({
      title: "Out of Stock",
      action: () => {
        setItemStatus(item, Item.STATUS_COMPLETE);
      },
    });
  }

  return (
    <>
    {/* Do not mess with ActionSheet */}
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (item.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />

      
      <ListItem style={{borderWidth:0, padding: 2.5, justifyContent: "space-between"}}
        key={item.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider
      >
        
        <ListItem.Content style = {{borderWidth : 0, padding: 1,flexDirection: 'column', backgroundColor: "white"}}>
          
        {/* <Image source={require("../assets/img/cart.jpg")} style={{width:150,height:150}}/> */}
        <Image source={{uri:`${item.image}`}} style={{width:150,height:150}}/>
          
          <ListItem.Title style={{fontWeight: 'bold', fontSize: 15}}>{item.name}</ListItem.Title>
          
          <Text style = {{fontSize: 12}}> 
            Quantity: {"1"}
          </Text>
          <Text style = {{fontSize: 12}}> 
            Brand: {"The Brand"}
          </Text>
          <Text style = {{fontSize: 12}}> 
            Purchase Date: {"Date"}
          </Text>
        </ListItem.Content>
        {itemStatus(item)}
      </ListItem>
    </>
  );
}

// const itemSytle = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "light-blue"
//   }
// });
