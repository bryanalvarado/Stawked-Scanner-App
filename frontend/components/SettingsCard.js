import React from 'react';
import { View, } from 'react-native';
import styles from '../stylesheet';

const SettingsCard = props => {
    return (
        
        <View style={{...styles.settingCard, ...styles.navBarShadow, ...props.style}}>
            {props.children}
        </View>
        
    );
} 


export default SettingsCard;