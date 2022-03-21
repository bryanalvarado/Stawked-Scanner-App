import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";

export function InventoryView({ navigation }) {
  const { user, projectData } = useAuth();

  useEffect(() => {
    updateMemberOf();
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
