import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import { useItems } from "../providers/ItemsProvider";
import { InventoryItem } from "../components/InventoryItem";
// import { AddInventoryItem } from "../components/AddInventoryItem";

export function InventoryList({ navigation, route }) {
  const { name } = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const { items, createItem } = useItems();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        //  return <AddInventoryItem createItem={createItem} />
      },
      title: `${name}`.charAt(0).toUpperCase() + `${name}`.slice(1),
    });
  }, []);

  const renderItem = ({ item }) => {
    <InventoryItem item={item} />;
  };

  return (
    <SafeAreaView style={myStyles.screen}>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <InventoryItem item={item} />}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={{ alignSelf: "center", marginTop: 5 }}>
          <Text style={{ color: "gray" }}> No Items</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
