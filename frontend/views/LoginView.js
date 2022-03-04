import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";

export function LoginView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = useAuth();

  const nav = useNavigation();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      nav.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
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
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <Button onPress={onPressSignIn} title="Sign In" />
      <Text style={{ textAlignVertical: "center", textAlign: "center" }}>
        Don't have an account?
      </Text>
      <Button title="Sign up" onPress={() => navigation.navigate("Sign-up")} />
    </View>
  );
}
