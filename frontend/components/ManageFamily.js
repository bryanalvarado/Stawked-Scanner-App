import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Alert } from "react-native";
import styles from "../stylesheet";
import { Text, ListItem } from "react-native-elements";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useAuth } from "../providers/AuthProvider";

export function ManageFamily() {
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
      await user.functions.addTeamMember(newTeamMember);
      getTeam();
    } catch (err) {
      Alert.alert(
        "An error occurred while adding a Family member",
        err.message
      );
    }
  };

  // removeTeamMember calls the backend function removeTeamMember to remove a
  // team member from the logged in user's project
  const removeTeamMember = async (email) => {
    try {
      await user.functions.removeTeamMember(email);
      getTeam();
    } catch (err) {
      Alert.alert("An error occurred while removing a Family member", err);
    }
  };

  const openDeleteDialogue = (member) => {
    Alert.alert("Remove the following member from your Family?", member.name, [
      {
        text: "Remove",
        onPress: () => {
          removeTeamMember(member.name);
        },
      },
      { text: "cancel", style: "cancel" },
    ]);
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
            <ListItem.Title>{member.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setNewTeamMember(text)}
          value={newTeamMember}
          placeholder="Family member username"
          style={styles.addTeamMemberInput}
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          width: 300,
          height: 60,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 35,
          backgroundColor: "#e32f45",
          ...styles.navBarShadow, // Manage Family Shadow>
        }}
      >
        <TouchableOpacity onPress={() => addTeamMember(newTeamMember)}>
          <Text style={{ fontSize: 24, color: "white" }}>Add to family</Text>
        </TouchableOpacity>
      </View>
      {/* <Button
        onPress={() => addTeamMember(newTeamMember)}
        title="Add Family Member"
      /> */}
    </View>
  );
}
