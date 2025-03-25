import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsView from "./FriendsView";
import FriendView from "./FriendView";
import SearchUserView from "./SearchUserView";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

const FriendsStack = createStackNavigator();
function FriendsNavigator({ navigation }) {
  let searchIcon = require("../../../../assets/search.png");
  const route = useRoute();
  return (
    <FriendsStack.Navigator
      screenOptions={{
        activeBackgroundColor: "blue",
        activeTintColor: "white",
        inactiveBackgroundColor: "gray",
        inactiveTintColor: "black",
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#6382E8",
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: "bold",
        },
        headerTintColor: "#ffffff",
        headerLeftContainerStyle: { paddingLeft: 10 }
      }}
    >
      <FriendsStack.Screen
        name="Friends"
        component={FriendsView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={App_StyleSheet.header_button}
              onPress={() => navigation.navigate('Search')}
            >
              <Image source={searchIcon} style={App_StyleSheet.header_icon} />
            </TouchableOpacity>
          ),
        }}
      />
      <FriendsStack.Screen
        name="Friend"
        component={FriendView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <FriendsStack.Screen
        name="Search"
        component={SearchUserView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
    </FriendsStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default FriendsNavigator;
