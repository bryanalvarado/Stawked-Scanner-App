import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Logout } from "../components/Logout";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";
import SettingsCard from "../components/SettingsCard";
import Setting from "../components/Setting";

export function UserSettingsView() {
  const { user } = useAuth();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserInfo();
  },[])

  const setUserInfo = () => {
    getNickname();
    getEmail();
  }

  const getNickname = async () => {
    try {
       const temp = await user.functions.getNickname(user.id); // Change nickname attribute
       setNickname(temp)
    } catch (err) {
      console.log(err);
    }
  };

  const getEmail = async () => {
    try {
       const temp = await user.functions.getEmail(user.id); 
       setEmail(temp)
    } catch (err) {
      console.log(err);
    }
  };


  const alertFunction = (title) => {
    Alert.alert("Pressed " + title);
  };

  return (
    <View style={myStyles.screen}>
      <View style={myStyles.scrollview}>
        <ScrollView alwaysBounceVertical={true}>
          <View style={[myStyles.header]}>
            <View style={{ paddingLeft: 10 }}>
              <Text style={myStyles.nametext}>{nickname}</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={[myStyles.nametext, myStyles.emailtext]}>
                {email}
              </Text>
            </View>
          </View>

          <View style={[myStyles.settingCategory, { marginTop: 10 }]}>
            <Text style={myStyles.settingCategoryText}>Account Settings</Text>
          </View>

          <SettingsCard style={myStyles.categoryView}>
            <Setting
              style={myStyles.topSetting}
              settingName="Nickname"
              onClick={() => alertFunction("Nickname")}
            />

            <Setting
              style={myStyles.midSetting}
              settingName="Email"
              onClick={() => alertFunction("Email")}
            />

            <Setting
              style={myStyles.bottomSetting}
              settingName="Password"
              onClick={() => alertFunction("Password")}
            />
          </SettingsCard>

          <View style={myStyles.settingCategory}>
            <Text style={myStyles.settingCategoryText}>Miscellanious</Text>
          </View>

          <SettingsCard style={myStyles.categoryView}>
            <Setting
              style={myStyles.topSetting}
              settingName="Notifications"
              onClick={() => alertFunction("Notifications")}
            />

            <Setting
              style={myStyles.bottomSetting}
              settingName="About"
              onClick={() => alertFunction("About")}
            />
          </SettingsCard>
          <Logout />
        </ScrollView>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  categoryView: {
    justifyContent: "space-between",
  },
  topSetting: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  midSetting: {},
  bottomSetting: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 0,
  },
  header: {
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 10,
  },
  nametext: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
  },
  emailtext: {
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "Inter-Bold",
  },
  settingCategory: {
    marginTop: 5,
    marginLeft: 10,
  },
  settingCategoryText: {
    fontFamily: "Inter-ExtraBold",
  },
  scrollview: {
    height: "77%",
  },
});
