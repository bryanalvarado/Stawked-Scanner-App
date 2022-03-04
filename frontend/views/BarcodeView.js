// import React in our code
import React, { useState, useEffect, Component } from "react";
import { useNavigation } from "@react-navigation/native";

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
import { useItems } from "../providers/ItemsProvider";

// import CameraScreen
import { CameraScreen } from "react-native-camera-kit";

export function Barcode() {
  const [qrvalue, setQrvalue] = useState("");
  const [openScanner, setOpenScanner] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { createItem } = useItems();
  const nav = useNavigation();

  React.useEffect(() => {
    const openCam = nav.addListener("focus", () => {
      setOverlayVisible(true);
      onOpenScanner();
    });
    return openCam;
  }, [nav]);

  const onOpenlink = () => {
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue) => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
  };

  const home = () => {
    setOpenScanner(false);
  };

  const onOpenScanner = () => {
    if (Platform.OS === "android") {
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
            setQrvalue("");
            setOpenScanner(true);
          } else {
            alert("CAMERA permission denied");
            nav.goBack();
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
          nav.goBack();
        }
      }
    } else {
      setQrvalue("");
      setOpenScanner(true);
    }
  };

  return (
    <>
      <Overlay isVisible={overlayVisible}>
        <SafeAreaView style={{ flex: 1 }}>
          {openScanner ? (
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
                  nav.goBack();
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
                  ? (createItem(qrvalue),
                    setQrvalue(""),
                    alert("Item Scanned"),
                    setOverlayVisible(false),
                    nav.navigate("Inventory"))
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
    </>
  );
}
