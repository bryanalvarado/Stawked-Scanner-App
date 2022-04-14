import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import styles from '../stylesheet';
import style from '../stylesheet';


const SettingModal = props => {
  
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!props.visible);
        }}
      >
        <View style={myStyles.centeredView}>
            
          <View style={myStyles.modalView}>
              <TouchableOpacity style={[myStyles.closeModalView, style.navBarShadow]} onPress={() => {
                  props.onClose()
              }}>
                <Text style={myStyles.closeModalText}>X</Text>
              </TouchableOpacity>
            <Text style={myStyles.modalText}>{props.title}</Text>
                {props.children}
          </View>
        </View>
      </Modal>
  );
};

const myStyles = StyleSheet.create({
  closeModalText: {
    fontWeight: 'bold',
    color: 'white'
  },
  closeModalView: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    borderRadius: 35,
    paddingHorizontal: 5,
    paddingVertical: 1,

    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(101, 101, 101, .7)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center"
  }
});

export default SettingModal;
