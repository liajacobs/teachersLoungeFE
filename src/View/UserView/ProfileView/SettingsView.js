import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OpenEditProfileCommand from "../../../Controller/OpenEditProfileCommand";
import LogOutCommand from "../../../Controller/LogOutCommand";
import SafeArea from "../../SafeArea";

function SettingsView({ route }) {
  const navigation = useNavigation();
  const user = route.params.User;

  const a = new OpenEditProfileCommand(user);
  const LogCommand = new LogOutCommand();

  return (
    <SafeArea>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => a.OpenEditProfile({ navigation })}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => LogCommand.LogOut({ navigation })}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    padding: 15,
    marginBottom: 15,
    width: "60%",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#e7ecfe"
  },
  buttonText: {
    fontSize: 18,
  },
});

export default SettingsView;
