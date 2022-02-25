// import React in our code
import React, { useState, useEffect, Component } from "react";
import { AddTask } from "../components/AddTask";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from "react-native";

import { Overlay, Input, Button } from "react-native-elements";

import styles from "../barcodestyle";

// import CameraScreen
import { CameraScreen } from "react-native-camera-kit";

export function Barcode({ createTask }) {
  const [qrvalue, setQrvalue] = useState("");
  const [opneScanner, setOpneScanner] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const nav = useNavigation();

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const home = () => {
    setOpneScanner(false);
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === "android") {
      // Calling the camera permission function
      requestCameraPermission();

      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs permission for camera access",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue("");
            setOpneScanner(true);
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
    } else {
      setQrvalue("");
      setOpneScanner(true);
    }
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        // overlayStyle={{ width: "100%" }}
        onBackdropPress={() => {
          setOverlayVisible(false);
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {opneScanner ? (
            <View style={{ flex: 1 }}>
              <CameraScreen
                showFrame={false}
                // Show/hide scan frame
                scanBarcode={true}
                // Can restrict for the QR Code only
                laserColor={"blue"}
                // Color can be of your choice
                frameColor={"yellow"}
                // If frame is visible then frame color
                colorForScannerFrame={"black"}
                // Scanner Frame color
                onReadCode={(event) =>
                  onBarcodeScan(event.nativeEvent.codeStringValue)
                }
              />
              <TouchableHighlight
                onPress={() => {
                  setOverlayVisible(false);
                }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>Close Scanner</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.textStyle}>
                {qrvalue
                  ? (createTask(qrvalue),
                    setQrvalue(""),
                    alert("Item Scanned"),
                    setOverlayVisible(false))
                  : ""}
              </Text>
              {qrvalue.includes("https://") ||
              qrvalue.includes("http://") ||
              qrvalue.includes("geo:") ? (
                <TouchableHighlight onPress={onOpenlink}>
                  <Text style={styles.textLinkStyle}>
                    {qrvalue.includes("geo:") ? "Open in Map" : "Open Link"}
                  </Text>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
        </SafeAreaView>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="Scan"
        onPress={() => {
          setOverlayVisible(true);
          onOpneScanner();
        }}
      />
    </>
  );
}
