import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationView from "./ConversationView";
import CreateNewChatView from "./CreateNewChatView";
import MessagesView from "./MessagesView";
import ConversationInfoView from "./ConversationInfoView";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

const HomeStack = createStackNavigator();
MessagesNavigator.lastClick = null;
let newChatIcon = require("../../../../assets/newMessage.png");

function MessagesNavigator({ navigation }) {
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
        name="Messages"
        component={MessagesView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              style={App_StyleSheet.header_button}
              onPress={() => navigation.navigate('New Chat')}
            >
              <Image source={newChatIcon} style={App_StyleSheet.header_icon} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="Conversation"
        component={ConversationView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false,
        }}
      />
      <HomeStack.Screen
        name="New Chat"
        component={CreateNewChatView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
      <HomeStack.Screen
        name="Conversation Info"
        component={ConversationInfoView}
        initialParams={route.params}
        options={{ headerBackTitleVisible: false }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MessagesNavigator;
