import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TypingAnimation } from "react-native-typing-animation";

const AnimatedInput = props => {

    const [isTyping, setIsTyping] = useState(false)

    const typing = () => {
        return (
            <TypingAnimation 
                dotColor="#e32f45"
                style={{marginRight: 25, marginTop: 20}}
            />
        )
    }



    return (
        
        <View style={{...myStyles.action, ...props.style}}>
            <TextInput placeholder={props.placeholder} style={{...myStyles.textInput, ...props.textStyle}} 
                onFocus={() => {
                    setIsTyping(true);
                    if(props.focus){
                        props.focus();
                    } 
                    //  setFailedSignin(false)
                    //  setTypingEmail(true)
                    //  setTypingPassword(false);
                }}
                onBlur={() => {
                    setIsTyping(false);
                    if(props.blur){
                        props.blur();
                    }
                }}
                onChangeText={props.onChangeText}
                value={props.value}
                autoCapitalize="none"
                secureTextEntry={props.isSecure ? props.isSecure : false}
            />
            {isTyping ? typing() : null}
        </View>
    );
} 

const myStyles = StyleSheet.create({
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  }, 
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray'
  },

})

export default AnimatedInput;