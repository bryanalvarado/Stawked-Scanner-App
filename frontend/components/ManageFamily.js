import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Alert } from "react-native";
import styles from "../stylesheet";
import { Text, ListItem } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useAuth } from "../providers/AuthProvider";

export function ManageFamily({navigation, route}) {
  const { user } = useAuth();
  const [newTeamMember, setNewTeamMember] = useState(null);
  const [teamMemberList, setTeamMemberList] = useState([]);

  // getTeam calls the backend function getMyTeamMembers to retrieve the
  // team members of the logged in user's project
  const getTeam = async () => {
    if (user != null) {
      try {
        const teamMembers = await user.functions.getMyTeamMembers([]);
        setTeamMemberList(teamMembers);
      } catch (err) {
        Alert.alert("An error occurred while getting team members", err);
      }
    }
  };

  // addTeamMember calls the backend function addTeamMember to add a
  // team member to the logged in user's project
  const addTeamMember = async () => {
    try {
      await user.functions.addMemberToCurrent(newTeamMember, user.id);
      await user.functions.addCurrentToMember(newTeamMember, user.id);
      getTeam();
    } catch (err) {
      Alert.alert(
        "An error occurred while adding a household member",
        err.message
      );
    }
  };

  // removeTeamMember calls the backend function removeTeamMember to remove a
  // team member from the logged in user's project
  const removeTeamMember = async (email) => {
    try {
      await user.functions.removeMemberFromCurrent(email);
      await user.functions.removeCurrentFromUser(email, user.id);
      getTeam();
    } catch (err) {
      console.log(err);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert(
      "Remove the following member from your household?",
      member.name,
      [
        {
          text: "Remove",
          onPress: () => {
            removeTeamMember(member.name);
          },
        },
        { text: "cancel", style: "cancel" },
      ]
    );
  };

  // Load the team when the component is first mounted or when the user changes.
  useEffect(() => {
    getTeam();
  }, [user]);

  return (
    <View style={styles.manageFamilyWrapper}>
      {teamMemberList.map((member) => (
        <ListItem
          onPress={() => openDeleteDialogue(member)}
          bottomDivider
          key={member.name}
        >
          <ListItem.Content>
            <ListItem.Title style={{ textTransform: "capitalize" }}>
              {member.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setNewTeamMember(text)}
          value={newTeamMember}
          placeholder="Household member username"
          style={styles.addTeamMemberInput}
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          alignContent: "center",
          alignSelf: "center",
          borderRadius: 35,
          alignItems: "center",
          elevation: 0,
          backgroundColor: "#fcfcfc",
          ...styles.navBarShadow,
        }}
      >
        <TouchableHighlight
          onPress={() => addTeamMember(newTeamMember)}
          style={{
            width: 300,
            height: 60,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 35,
            backgroundColor: "royalblue",
          }}
          underlayColor={3}
        >
          <View>
            <Text style={{ fontSize: 24, color: "white" }}>
              Add to household
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* <Button
        onPress={() => addTeamMember(newTeamMember)}
        title="Add Family Member"
      /> */}
    </View>
  );
}