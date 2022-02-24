import React, { useState, useEffect } from "react";

import { View, Button } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";
import { useTasks } from "../providers/TasksProvider";
import { TaskItem } from "../components/TaskItem";
import { Barcode } from "./BarcodeView";

export function TasksView({ navigation, route }) {
  const { name } = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const { tasks, createTask } = useTasks();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <Barcode createTask={createTask} />;
      },
      title: `${name}`.charAt(0).toUpperCase() + `${name}`.slice(1),
    });
  }, []);

  return (
    <View>
      {tasks.map((task) =>
        task ? <TaskItem key={`${task._id}`} task={task} /> : null
      )}

      {name === "My Inventory" ? (
        <>
          <View style={styles.manageTeamButtonContainer}>
            <Button
              title="Manage Family"
              onPress={() => setOverlayVisible(true)}
            />
            {/* <Button
              title="Go to Barcode Scanner"
              onPress={() => navigation.navigate("Bar-code")}
            /> */}
          </View>
          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
          >
            <ManageTeam />
          </Overlay>
        </>
      ) : null}

      {/* // ) : (
      //   <Button
      //     title="Go to Barcode Scanner"
      //     onPress={() => navigation.navigate("Bar-code")}
      //   />
      // )} */}
    </View>
  );
}
