import { React, useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Animated, Image, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-paper";
//import LogInCommand from "../Controller/LogInCommand";
import { login } from "../Controller/LogInCommand";
import App_StyleSheet from "../Styles/App_StyleSheet";

let email = "";
let password = "";
let logo = require("../../assets/logo.png");

function SignInView({ navigation }) {
  return (

    <View style={App_StyleSheet.register_signIn_background}>
      <View style={App_StyleSheet.block}>
        <Image style={App_StyleSheet.logoStyle} source={logo} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <TextInput
            style={App_StyleSheet.textBlock}
            placeholder="Email"
            underlineColor={"transparent"}
            selectionColor={"black"}
            activeUnderlineColor={"transparent"}
            multiline={false}
            returnKeyType="done"
            onChangeText={(value) => (email = value)}
            autoCapitalize="none"
          />
          <TextInput
            secureTextEntry={true}
            style={App_StyleSheet.textBlock}
            placeholder="Password"
            underlineColor={"transparent"}
            selectionColor={"black"}
            activeUnderlineColor={"transparent"}
            multiline={false}
            returnKeyType="done"
            onChangeText={(value) => (password = value)}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={App_StyleSheet.default_button}
          onPress={
            async () => {
              let user = await login({ navigation }, email, password);
            }
          }
        >
          <Text style={App_StyleSheet.text}>{"Sign In"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={App_StyleSheet.default_button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={App_StyleSheet.text}>{"Sign Up"}</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
export default SignInView;
