import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, RefreshControl, Image } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export function InventoryView({ navigation }) {
  const { user, projectData } = useAuth();
  const [newMemberOf, setNewMemberOf] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const refreshScreen = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

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
      setNewMemberOf(memberOf);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateMemberOf();
    return function cleanup() {
      updateMemberOf();
    };
  }, [projectData]);

  return (
    <View style={myStyles.screen}>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshScreen()}
            />
          }
        >
          {newMemberOf ? (
            newMemberOf.map((project) => (
              <View key={project.partition}>
                <TouchableOpacity
                  onPress={() => onClickProject(project)}
                  style={[myStyles.cardView, styles.navBarShadow]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                          {project.name}
                        </Text>
                      </View>

                      <View>
                        <Text style={{ color: "gray" }}>
                          {project.uniqueItems} Unique Items
                        </Text>
                        <Text style={{ color: "gray" }}>
                          {project.totalItems} Total Items
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text style={{ fontSize: 20, color: "gray" }}>
                        {
                          <Image
                            style={{ height: 15, width: 15 }}
                            source={require("../assets/img/pointing-arrow.png")}
                          ></Image>
                        }
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={{ flex: 1, alignSelf: "center", marginTop: 5 }}>
              <Text style={{ color: "gray" }}>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  cardView: {
    borderWidth: 0,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
});

