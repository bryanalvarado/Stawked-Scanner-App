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
  manageTeamWrapper: {
    width: 350,
  },
  manageTeamTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageTeamButtonContainer: {
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
});

export default styles;
