import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import { ListItem, Text, Image} from "react-native-elements";
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
      return <Text style={myStyles.subText}>Status: Out of Stock</Text>
    } else if (status === Item.STATUS_IN_PROGRESS){
      return <Text style={myStyles.subText}>Status: Running Low</Text>
    } else if (status === Item.STATUS_OPEN){
      return <Text style={myStyles.subText}>Status: Stocked</Text>
    } else {
      return null
    }
  }

  const itemImage = (item) => {
    if(item.image !== ""){
      return <Image source={{uri:`${item.image}`}} style={{width:100, height:100}}/>
    } else {
      return <Image source={require("../assets/img/cart.jpg")} style={{width:100,height:100}}/>
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

      
      
        {/* <Image source={require("../assets/img/cart.jpg")} style={{width:150,height:150}}/> */}
          <TouchableOpacity style={[myStyles.item, styles.navBarShadow]}
            onPress={() => {setActionSheetVisible(true);}}
          
          >
            <View >
              {/* <Image source={{uri:`${item.image}`}} style={{width:100,height:100}}/> */}
              {itemImage(item)}
            </View>

            <View style={{flex: 2}}>
              <View style={{marginLeft:10}}>
                <Text style={myStyles.itemName}>{item.name}</Text>
                
                <Text style = {myStyles.subText}> 
                  Quantity: {item.quantity}
                </Text>
                <Text style = {myStyles.subText}> 
                  Brand: {item.brand}
                </Text>
                <Text style = {myStyles.subText}> 
                  Purchase Date: {item.date}
                </Text>

                {itemStatus(item)}

              </View>
            </View>

            {/* <View>
              {itemStatus(item)}
            </View> */}
          </TouchableOpacity>
        
        
      
    </>
  );
}

const myStyles = StyleSheet.create({
  item : {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 3,
    padding: 10,
    alignContent:'space-around'
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15
  },
  subText: {
    fontSize: 12
  }
});