import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import styles from "../stylesheet";

// The AddInventoryItem is a button for adding items. When the button is pressed, an
// overlay shows up to request user input for the new item name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// item is created in the realm.
export function AddInventoryItem({ createItem }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Input
            placeholder="Manually enter UPC number "
            onChangeText={(text) => setNewItemName(text)}
            autoFocus={true}
          />
          <Button
            title="Add to Inventory"
            onPress={() => {
              setOverlayVisible(false);
              createItem(newItemName);
            }}
          />
        </>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2b;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
