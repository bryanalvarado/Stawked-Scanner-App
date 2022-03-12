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

export function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  const { user, signUp, signIn } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      nav.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [user]);

  const signupErrors = () => {
    if (invalidEmail) {
      return (
        <Text style={myStyles.failedLoginText}>
          Invalid email, please try again
        </Text>
      );
    } else if (userTaken) {
      return (
        <Text style={myStyles.failedLoginText}>
          There is already an account with that email
        </Text>
      );
    } else if (nickname === "") {
      <Text style={myStyles.failedLoginText}>Please fill out a nickname</Text>;
    } else {
      return null;
    }
  };

  const validateEmail = () => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmail("");
      setInvalidEmail(true);
      return false;
    } else {
      onPressSignUp();
    }
  };

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

  return (
    <View style={myStyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={myStyles.header}>
        <ImageBackground
          source={require("../assets/img/header.png")}
          style={myStyles.imageBG}
        >
          <Image
            source={require("../assets/img/home.png")}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text style={myStyles.headerTopText}>Sign up</Text>
          <Text style={myStyles.headerBotText}>We're happy to have you!</Text>
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

        <TouchableOpacity
          onPress={validateEmail}
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
