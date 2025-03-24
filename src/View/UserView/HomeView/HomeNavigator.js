import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostListingsView from "./PostListingsView";
import ProfileView from "../ProfileView/ProfileView";
import CommunitiesView from "./CommunitiesView";
import CommunityView from "./CommunityView";
import CreateCommunityView from "./CreateCommunityView";
import SearchCommunityView from "./SearchCommunityView";
import CreatePostView from "./CreatePostView";
import PostView from "./PostView";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

const HomeStack = createStackNavigator();
let communitiesIcon = require("../../../../assets/communities.png");
let searchIcon = require("../../../../assets/search.png");

function HomeNavigator({ navigation }) {
  const route = useRoute();
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="Teacher's Lounge"
        component={PostListingsView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Communities')}
              style={App_StyleSheet.header_button}
            >
              <Image source={communitiesIcon} style={App_StyleSheet.header_icon} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="Communities"
        component={CommunitiesView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={App_StyleSheet.header_button}
              onPress={() => navigation.navigate('Find Communities')}
            >
              <Image source={searchIcon} style={App_StyleSheet.header_icon} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="Community"
        component={CommunityView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="Create Community"
        component={CreateCommunityView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="Find Communities"
        component={SearchCommunityView}
        initialParams={route.params}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="Create Post"
        component={CreatePostView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="View Post"
        component={PostView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 15,
    padding: 5,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
});

export default HomeNavigator;