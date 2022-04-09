import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Request from "../components/Request";
import { useAuth } from "../providers/AuthProvider";

export function RequestsView(props) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    if (user != null) {
      try {
        const myRequests = await user.functions.getMyRequests(user.id);
        const temp = [];
        myRequests.map((info) => {
          temp.push({
            email: info.email,
            nickname: info.nickname,
            id: info.id,
          });
        });
        setRequests(temp);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Load the requests when the component is first mounted or when the user changes.
  useEffect(() => {
    getRequests();
  }, [user]);

  const addTeamMember = async (currentUserId, requestingUserId) => {
    if (user != null) {
      try {
        await user.functions.addCurrentToMember(
          requestingUserId,
          currentUserId
        );
        await user.functions.addCurrentToMember(
          currentUserId,
          requestingUserId
        );
        removeRequest(currentUserId, requestingUserId);
      } catch (err) {
        Alert.alert("An error occurred while accepting", err.message);
      }
    }
  };

  const acceptRequest = (incomingId) => {
    Alert.alert("Accepted Users Request ", "You will now see them in your inventory!");
    addTeamMember(user.id, incomingId);
  };

  const denyRequest = (incomingId) => {
    Alert.alert("Denied Request");
    // remove id from request scheme of current user.
    removeRequest(user.id, incomingId);
  };

  const removeRequest = async (loggedInUserId, requestUserId) => {
    try {
      await user.functions.removeRequest(loggedInUserId, requestUserId);
      let filteredArray = requests.filter((req) => req !== requestUserId);
      setRequests(filteredArray);
      getRequests();
    } catch (err) {
      Alert.alert("An error occurred while removing", err.message);
    }
  };
  
  const noRequests = () => {
    return (
      <View style={{flex: 1, alignSelf: 'center', marginTop: 5}}> 
        <Text style={{color: 'gray'}}>No Requests</Text>
      </View>
    )
  }


  return (
    <View style={myStyles.screen}>
      <ScrollView>
        {requests.length > 0 ? 
          requests.map((request) =>
              <Request key={request.id} style={myStyles.request}>
                
                <View style={{ flexDirection: "column" }}>
                  <Text style={myStyles.requestText}>{request.nickname}</Text>
                  <Text style={[myStyles.requestText, { fontSize: 14 }]}>
                    {request.email}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[
                      myStyles.button,
                      {
                        backgroundColor: "#e73e18",
                        paddingHorizontal: 17,
                        marginHorizontal: 15,
                      },
                    ]}
                    onPress={() => {
                      denyRequest(request.id);
                    }}
                  >
                    <Text style={myStyles.textStyle}>Deny</Text>
                  </Pressable>

                  <Pressable
                    style={[myStyles.button, { backgroundColor: "royalblue" }]}
                    onPress={() => {
                      acceptRequest(request.id);
                    }}
                  >
                    <Text style={myStyles.textStyle}>Accept</Text>
                  </Pressable>
                </View>
              </Request>
            )
           : noRequests()    }
      </ScrollView>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  requestText: {
    //fontWeight: 'bold',
    fontSize: 20,
    // fontFamily: "Inter-Bold",
  },
  request: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 4,
  },
  buttonAccept: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
