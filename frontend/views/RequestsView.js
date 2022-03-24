import React, {useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Request from '../components/Request';
import { useAuth } from '../providers/AuthProvider';

export function RequestsView(props) {
    const { user } = useAuth()

    const [requests, setRequests] = useState([]);

//     const getRequests = async () => {
//     if (user != null) {
//       try {
//         const teamMembers = await user.functions.getMyRequests([]);
//         setRequests(teamMembers);
//       } catch (err) {
//         Alert.alert("An error occurred while getting requests", err);
//       }
//     }
//   };

    // Load the requests when the component is first mounted or when the user changes.
    // useEffect(() => {
    //     getRequests();
    // }, [user]);

    // const addTeamMember = async () => {
    //     try {
    //         await user.functions.addMemberToCurrent(newTeamMember, user.id);
    //         await user.functions.addCurrentToMember(newTeamMember, user.id);
    //         getRequests();
    //     } catch (err) {
    //         Alert.alert(
    //             "An error occurred while accepting",
    //             err.message
    //         );

    //         let filteredArray = requests.filter(req => req !== incomingId)
    //         setRequests(filteredArray)
    //     }
    // };

    const acceptRequest = (incomingId) => {
        Alert.alert("accepted Request " + incomingId);
        // does what add to household does.
    }

    const denyRequest = (incomingId) => {
        Alert.alert("denyed Request " + incomingId);
        // remove id from request scheme of current user.


        let filteredArray = requests.filter(req => req !== incomingId)
        setRequests(filteredArray)
    }


    return (
        <View style={myStyles.screen}>
            <ScrollView>
                {requests.map((request) =>
                    request ?
                    <Request style={myStyles.request}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={myStyles.requestText}>{request /* getNickname(request)*/}</Text>
                            <Text style={[myStyles.requestText, {fontSize: 14}]}>{request /* getEmail(request)*/}</Text>
                        </View>
                        

                        
                        <View style={{flexDirection: 'row'}}>
                            <Pressable
                                style={[myStyles.button, {backgroundColor: "#e73e18", paddingHorizontal: 17,marginHorizontal: 15}]}
                                onPress={() => {
                                    denyRequest(request);
                                }}
                            >
                                <Text style={myStyles.textStyle}>Deny</Text>
                            </Pressable>

                            <Pressable
                                style={[myStyles.button, {backgroundColor: "royalblue"}]}
                                onPress={() => {
                                    acceptRequest(request);
                                }}
                            >
                                <Text style={myStyles.textStyle}>Accept</Text>
                            </Pressable>
                        </View>
                        
                        
                        
                    </Request> : null
                )}
            </ScrollView>
        </View>
    );
} 

const myStyles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    requestText:{
        //fontWeight: 'bold',
        fontSize: 20,
        fontFamily: "Inter-Bold",
    },
    request: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10
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
})
