import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AnimatedInput from "../components/AnimatedInput";
import { useAuth } from "../providers/AuthProvider";
import { myStyles } from "./LoginView";
import styles from "../stylesheet";
import { validateEmail, validateNickname } from "../providers/Validation";

export function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidNickname, setInvalidNickname] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  const { user, signUp, signIn } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      addNickname()
      nav.reset({ index: 0, routes: [{ name: "Home" }] });

    }
  }, [user]);

  const nicknameError = () => {
    if(invalidNickname){
      return (
        <Text style={myStyles.failedLoginText}>
          Invalid nickname, please try again
        </Text>
      );
    }
    return null;
  }

  const signupErrors = () => {
    if (invalidEmail) {
      return (
        <Text style={myStyles.failedLoginText}>
          Invalid email, please try again
        </Text>
      );
    } 
    return null;
  };

  const validateSignup = () => {
    if(validateEmail(email) === false){
      setEmail("");
      setInvalidEmail(true);
    } else if (validateNickname(nickname) === false) {
      setNickname("");
      setInvalidNickname(true);
    } else {
      // passed checks
      onPressSignUp(); 
    }
  }



  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  const addNickname = async () => {
    try {
       const temp = await user.functions.addNickname(user.id, nickname); // Change nickname attribute
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={myStyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={myStyles.header}>
        <ImageBackground
          source={require("../assets/img/header.png")}
          style={myStyles.imageBG}
        >
          <Image source={require("../assets/img/Logo.png")}></Image>
        </ImageBackground>
      </View>

      <View style={myStyles.footer}>
        <Text style={[myStyles.title, {}]}>E-mail</Text>
        <AnimatedInput
          textStyle={{ marginTop: 0, paddingBottom: 0 }}
          focus={() => {
            setInvalidEmail(false);
          }}
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
        />

        <Text style={[myStyles.title, { marginTop: 1 }]}>Nickname</Text>
        <AnimatedInput
          textStyle={{ marginTop: 0, paddingBottom: 0 }}
          focus={() => {
            setInvalidNickname(false);
          }}
          placeholder={"Nickname"}
          onChangeText={setNickname}
          value={nickname}
        />

        <Text style={[myStyles.title, { marginTop: 1 }]}>Password</Text>
        <AnimatedInput
          textStyle={{ marginTop: 0, paddingBottom: 0 }}
          placeholder={"Password"}
          onChangeText={setPassword}
          value={password}
          isSecure={true}
        />

        {signupErrors()}
        {nicknameError()}

        <TouchableOpacity
          onPress={validateSignup}
          style={{ marginTop: 5, marginHorizontal: "30%" }}
        >
          <View style={myStyles.button_container}>
            <View
              style={[
                myStyles.animation,
                { backgroundColor: "royalblue", width: "100%" },
              ]}
            >
              <Text style={myStyles.textLogin}>Sign Up </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 15 }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}