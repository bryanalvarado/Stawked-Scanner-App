import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";

export function InventoryView({ navigation }) {
  const { projectData } = useAuth();

  // the onClickProject navigates to the InventoryList with the project name
  // and project partition value
  const onClickProject = async (project) => {
    navigation.navigate("InventoryList", {
      name: project.name,
      projectPartition: project.partition,
    });
  };

  return (
    <View>
      {projectData.map((project) => (
        <View key={project.name}>
          <ListItem
            onPress={() => onClickProject(project)}
            bottomDivider
            key={project.name}
          >
            <ListItem.Content>
              <ListItem.Title>{project.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      ))}
    </View>
  );
}
