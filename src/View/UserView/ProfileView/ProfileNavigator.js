import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileView from "./ProfileView";
import EditProfileView from "./EditProfileView";
import EditView from "./EditView";
import SettingsView from "./SettingsView"
import PostListingsView from "../HomeView/PostListingsView";
import PostModeratorView from "../ProfileView/PostModeratorView";
import UserModeratorView from "../ProfileView/UserModeratorView";
const HomeStack = createStackNavigator();
ProfileNavigator.lastClick = null;

function ProfileNavigator({ navigation }) {
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
        name="Profile"
        component={ProfileView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Edit Profile"
        component={EditProfileView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingsView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Edit Name"
        component={EditView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Edit Username"
        component={EditView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Edit School"
        component={EditView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Home"
        component={PostListingsView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="User Moderation"
        component={UserModeratorView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Post Moderation"
        component={PostModeratorView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
    </HomeStack.Navigator>
  );
}

export default ProfileNavigator;
