import React, { useState } from "react";
import { ListItem, Text } from "react-native-elements";
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
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (item.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem
        key={item.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        {item.status === Item.STATUS_COMPLETE ? (
          <Text>Out of stock</Text>
        ) : item.status === Item.STATUS_IN_PROGRESS ? (
          <Text>Running low</Text>
        ) : item.status === Item.STATUS_OPEN ? (
          <Text>Stocked</Text>
        ) : null}
      </ListItem>
    </>
  );
}
