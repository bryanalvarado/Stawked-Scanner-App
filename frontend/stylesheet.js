import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    padding: 5,
  },
  inputStyle: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  manageFamilyWrapper: {
    width: 350,
  },
  manageFamilyTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageFamilyButtonContainer: {
    textAlign: "left",
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: "400",
  },
  navBarShadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  settingCard:{
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: '2%',
    //height: 50,
    flex: 1,
    backfaceVisibility: 'hidden',
  },
  settingCardText: {
    paddingTop: 15,
    paddingLeft: 20,
    fontWeight: 'bold'
  }
});

export default styles;
