import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../stylesheet';

const Request = props => {
    return(
        <View
        style={{ ...styles.settingCard, ...styles.navBarShadow, ...props.style }}
        >
        {props.children}
        </View>
    )
} 

const myStyles = StyleSheet.create({


})

export default Request;