import React, { useState, useEffect } from "react";
import { View, Alert, Pressable, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles from "../stylesheet";
import { Text } from "react-native-elements";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { useAuth } from "../providers/AuthProvider";
import SettingModal from "./SettingModal";
import AnimatedInput from "./AnimatedInput";

export function ManageFamily({navigation, route}) {
  const { user } = useAuth();
  const [newTeamMember, setNewTeamMember] = useState("");
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [inviteUserModalVisible, setInviteUserModalVisible] = useState(false);

  const requestUser = async () => {
    if (user != null) {
      try {
        await user.functions.requestUser(user.id, newTeamMember);
        Alert.alert("User has been requested!")
        setInviteUserModalVisible(false);
      } catch (err) {
        Alert.alert("An error occured", err.message)
      }
      setNewTeamMember("")
    }
  };
  // getTeam calls the backend function getMyTeamMembers to retrieve theclea
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
  }, [teamMemberList]);

  return (
    <View style={styles.manageFamilyWrapper}>

      <SettingModal
        visible={inviteUserModalVisible}
        title={"Invite A User"}
        onClose={() => {
          setInviteUserModalVisible(false);
          setNewTeamMember("");
        }}
      >
        <AnimatedInput
          style={{ borderBottomColor: "black" }}
          textStyle={{ marginTop: 0, paddingBottom: 0 }}
          placeholder={"User's Email"}
          onChangeText={setNewTeamMember}
          value={newTeamMember}
          // focus={() => {
          //   setInvalidInputNickname(false);
          // }}
        />
        <Pressable
          style={[myStyles.button, myStyles.buttonClose, styles.navBarShadow]}
          onPress={() => {
            requestUser();
            // try
          }}
        >
          <Text style={myStyles.textStyle}>Send Invite</Text>
        </Pressable>
      </SettingModal>
      
      <View
        style={{
          marginVertical: 10,
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
          onPress={() => setInviteUserModalVisible(true)}
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
              Invite User
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView contentContainerStyle={myStyles.scrollView}  >
        {teamMemberList.length > 0 ? teamMemberList.map((member) => (
          <TouchableOpacity  
            key={member.name}
            style={[myStyles.user, styles.navBarShadow]}
            onPress={() => {openDeleteDialogue(member)}}
          >
            <View style={{flexDirection: 'row' ,justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold'}}>{member.name}</Text>
              <Image style={{height: 15, width: 15}} source={require("../assets/img/pointing-arrow.png")}></Image>
            </View>
          </TouchableOpacity>
          
        )) : <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{color: 'gray', alignSelf: 'center'}}>It's quite lonely in here, consider inviting someone!</Text>
            </View>
        }
      </ScrollView>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  user: {
    borderWidth: 0,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});