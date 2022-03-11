import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Logout } from "../components/Logout";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";
import SettingsCard from "../components/SettingsCard";
import Setting from "../components/Setting";

export function UserSettingsView() {

  const { user } = useAuth();

  const alertFunction = (title) => {
    Alert.alert("Pressed " + title)
  }

  return (
    <View style={myStyles.screen}>
      

      <View style={myStyles.scrollview}>
        <ScrollView alwaysBounceVertical={true}>

            <View style={[myStyles.header]}>
              <View style={{paddingLeft: 10}}>
                <Text style={myStyles.nametext}>{"John Doe"}</Text>
              </View>

              <View style={{paddingLeft: 10}} >
                <Text style={[myStyles.nametext, myStyles.emailtext]}>{"johndoe@gmail.com"}</Text>
              </View>
            </View>

            <View style={[myStyles.settingCategory, {marginTop: 10}]}>
                <Text style={myStyles.settingCategoryText} >Account Settings</Text>
            </View>

            <SettingsCard style={myStyles.categoryView} >
              
                <Setting style={myStyles.topSetting} settingName="Nickname" onClick={() => alertFunction("tests")}/>

                <Setting  settingName="Email" onClick={() => alertFunction("tests")}/>

                <Setting style={myStyles.bottomSetting} settingName="Password" onClick={() => alertFunction("tests")}/>

            </SettingsCard>

            <View style={myStyles.settingCategory}>
              <Text style={myStyles.settingCategoryText} >Additional Settings</Text>
            </View>

            {/* <SettingsCard style={myStyles.categoryView} >

              <Setting style={myStyles.topSetting} settingName="Nickname" onClick={() => alertFunction("tests")}/>

              <Setting  settingName="Email" onClick={() => alertFunction("tests")}/>

              <Setting style={myStyles.bottomSetting} settingName="sss" onClick={() => alertFunction("tests")}/>
            </SettingsCard > */}


            <Logout />
        </ScrollView>
      </View>
      
      
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  categoryView: {
    justifyContent: "space-between",
    
  },
  topSetting: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,

  },
  bottomSetting: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 0,
  },
  header: {
    justifyContent: "space-around",
    backgroundColor: 'white',
    padding: 10,
  },
  nametext: {
    fontSize: 30,
    fontWeight: "bold"
  }, 
  emailtext: {
    fontSize: 15,
    fontWeight: "normal"
  },
  settingCategory: {
    marginTop: 5,
    marginLeft: 10
  },
  settingCategoryText: {
    fontWeight: "bold"
  },
  scrollview: {
    height: '77%'
  },


  
  
});
