import React, { useState, useEffect } from "react";
import { FlatList, TextInput, Text, View, TouchableOpacity } from "react-native";
import SafeArea from "../../SafeArea";

import { searchUser } from "../../../Controller/SearchUserCommand";
import { useRoute, useIsFocused } from "@react-navigation/native";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function SearchUserView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const array = await searchUser(searchQuery);
        // remove the current user from the results of the search
        const userIndex = array.findIndex((user) => user.email === route.params.User.userUserName);
        if (userIndex > -1) {
          array.splice(userIndex, 1);
        }
        setListOfUsers(array);
        console.log(array)
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, [searchQuery]);
  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        <TextInput
          placeholder="Search a User"
          onChangeText={(value) => {
            const search = value;
            setSearchQuery(search);
          }}
          style={App_StyleSheet.search}
        />
        <FlatList
          data={listOfUsers} 
          keyExtractor={(item) => item.email}  
          style={App_StyleSheet.list}  
          ListEmptyComponent={<Text style={App_StyleSheet.text}>No users found</Text>}  
          renderItem={({ item }) => (
            <TouchableOpacity
              style={App_StyleSheet.list_item}  
              onPress={() => {
                if (navigation) {
                  navigation.navigate("Friend", {
                    FriendEmail: item.email, 
                  });
                }
              }}
            >
              <Text>{item.email}</Text>  // Display the user's email instead of other user details
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeArea>
  );
}

export default SearchUserView;