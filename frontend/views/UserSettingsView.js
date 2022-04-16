import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Logout } from "../components/Logout";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";
import SettingsCard from "../components/SettingsCard";
import Setting from "../components/Setting";
import SettingModal from "../components/SettingModal";
import AnimatedInput from "../components/AnimatedInput";
import { validateNickname } from "../providers/Validation";
import { useNavigation } from "@react-navigation/native";

export function UserSettingsView() {
  const { user, changeUserPassword } = useAuth();

  const [inputNickname, setInputNickname] = useState("");
  const [nickname, setNickname] = useState("");
  const [invalidInputNickname, setInvalidInputNickname] = useState(false);

  const [email, setEmail] = useState("");

  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

  //const [aboutPressedVisible,setChangeAboutVisible] = useState(false);
  const nav = useNavigation();
  useEffect(() => {
    setUserInfo();
  }, []);

  const setUserInfo = () => {
    getNickname(user.id);
    getEmail(user.id);
  };

  const getNickname = async (userId) => {
    try {
      const temp = await user.functions.getNickname(userId); // Change nickname attribute
      setNickname(temp);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getEmail = async (userId) => {
    try {
      const temp = await user.functions.getEmail(userId);
      setEmail(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const setNewNickname = async (inputNickname) => {
    try {
      const temp = await user.functions.addNickname(user.id, inputNickname);
    } catch (err) {
      console.log(err);
    }
  };

  const alertFunction = (title) => {
    console.log(title);
  };
  
  const passwordChangingFunction = () => {
    changeUserPassword(email)
    setChangePasswordModalVisible(false);
    Alert.alert(`We have sent an email to ${email}.`, "Please check your email!");
  };

  const changeNickname = () => {
    if (validateNickname(inputNickname) === true) {
      setNicknameModalVisible(false);
      setNewNickname(inputNickname);
      setNickname(inputNickname);
    } else {
      setInvalidInputNickname(true);
    }
    setInputNickname("");
  };

  return (
    <View style={myStyles.screen}>
      <SettingModal
        visible={nicknameModalVisible}
        title={"Change Nickname"}
        onClose={() => {
          setNicknameModalVisible(false);
          setInvalidInputNickname(false);
          setInputNickname("");
        }}
      >
        <AnimatedInput
          style={{ borderBottomColor: "black" }}
          textStyle={{ marginTop: 0, paddingBottom: 0 }}
          placeholder={"New Nickname"}
          onChangeText={setInputNickname}
          value={inputNickname}
          focus={() => {
            setInvalidInputNickname(false);
          }}
        />
        {invalidInputNickname ? (
          <Text style={{ color: "red" }}>Invalid Nickname!</Text>
        ) : null}

        <Pressable
          style={[myStyles.button, myStyles.buttonClose, styles.navBarShadow]}
          onPress={() => {
            changeNickname();
            // try
          }}
        >
          <Text style={myStyles.textStyle}>Change</Text>
        </Pressable>
      </SettingModal>

      <SettingModal
        visible={changePasswordModalVisible}
        title={"Change Password"}
        onClose={() => {
          setChangePasswordModalVisible(false);
        }}
      >
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontWeight: "bold"}}>Would you like us to send an email?</Text>
        </View>
        
        <Pressable
          style={[myStyles.button, myStyles.buttonClose, styles.navBarShadow]}
          onPress={() => {
            passwordChangingFunction();
          }}
        >
          <Text style={myStyles.textStyle}>Send Email</Text>
        </Pressable>
      </SettingModal>

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
              onClick={() => setNicknameModalVisible(true)}
              imageValue = {1}
            />
            <Setting
              style={myStyles.bottomSetting}
              settingName="Password"
              onClick={() => {setChangePasswordModalVisible(true);}}
              imageValue = {2}
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
              imageValue = {3}
            />

            <Setting
              style={myStyles.bottomSetting}
              settingName="About"
              onClick={() => {nav.navigate("About")}}
              imageValue = {4}
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
    backgroundColor: "white",
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
    // fontFamily: "Inter-Bold",
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
  emailtext: {
    fontSize: 15,
    fontWeight: "normal",
    // fontFamily: "Inter-Bold",
  },
  settingCategory: {
    marginTop: 5,
    marginLeft: 10,
  },
  settingCategoryText: {
    // fontFamily: "Inter-ExtraBold",
  },
  scrollview: {
    flex: 1,
  },
});
