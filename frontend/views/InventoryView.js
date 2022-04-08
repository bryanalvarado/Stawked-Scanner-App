import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import styles from "../stylesheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export function InventoryView({ navigation }) {
  const { user, projectData } = useAuth();
  const [newMemberOf, setNewMemberOf] = useState()

  useEffect(() => {
    updateMemberOf();
    return function cleanup() {
      updateMemberOf()
  }
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
      await user.functions.addToUniqueItems(user.id)
      await user.functions.updateAllOtherInventorys(user.id)
      const memberOf = await user.functions.updateMemberOf(user.id);
      console.log(memberOf)
      setNewMemberOf(memberOf)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <View style={myStyles.screen}>
      <View>
        <ScrollView>
          {newMemberOf ? (
          newMemberOf.map((project) => (
            <View key={project.name}>

              <TouchableOpacity onPress={() => onClickProject(project)} style={[myStyles.cardView, styles.navBarShadow]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                  <View>
                    <View >
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {project.name}
                      </Text>
                    </View>

                    <View >
                    <Text style={{color: 'gray'}}>
                      {project.uniqueItems} Unique Items
                      </Text>
                      <Text style={{color: 'gray'}}>
                      {project.totalItems} Total Items
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={{fontSize: 20, color: 'gray'}}>
                      {'>'}
                    </Text>
                  </View>


                </View>
              </TouchableOpacity>
            </View>
          ))) :  <Text >
          {'Loading...'}
        </Text>}
        </ScrollView>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  cardView:{
    borderWidth: 0,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20
  }
})