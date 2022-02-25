import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      nav.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [user]);

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
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          //   onChangeText={setEmail}
          //   value={email}
          placeholder="Nickname"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <Button onPress={onPressSignUp} title="Create User" />
    </View>
  );
}
