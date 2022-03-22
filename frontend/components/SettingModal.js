import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';


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
        <View style={styles.centeredView}>
            
          <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeModalView} onPress={() => {
                  props.onClose()
              }}>
                <Text style={styles.closeModalText}>X</Text>
              </TouchableOpacity>
            <Text style={styles.modalText}>{props.title}</Text>
                {props.children}
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  closeModalText: {
    fontWeight: 'bold',
    color: 'red'
  },
  closeModalView: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'red',
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
