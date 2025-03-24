import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea.js";
import { getAllCommunities, getUserCommunities } from "../../../Controller/CommunitiesManager.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import Community from "../../../Model/Community.js";

function SearchCommunityView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  const isFocused = useIsFocused();
  const route = useRoute();

  let searchIcon = require("../../../../assets/search.png");

  useEffect(() => {
    if (isFocused) {
      loadCommunities();
      loadUserCommunities()
    }
  }, [isFocused]);

  const loadUserCommunities = async () => {
    const data = await getUserCommunities(route.params.User.userUserName);
    setUserCommunities(
      data.map((c) => {
        return { ["key"]: c.id, ["value"]: c.name };
      })
    );
  };

  const loadCommunities = async () => {
    const data = await getAllCommunities();
    const formattedData = data.map((c) => ({
      key: c.id,
      value: c.name,
    }));
    setCommunities(formattedData);
    setFilteredCommunities(formattedData);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCommunities(communities);
    } else {
      setFilteredCommunities(
        communities.filter((c) =>
          c.value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, communities]);

  return (
    <SafeArea>
      <View style={App_StyleSheet.content}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for communities..."
          style={App_StyleSheet.search}
        />
        <FlatList
          data={filteredCommunities}
          keyExtractor={(item) => item.key}
          style={App_StyleSheet.list}
          ListEmptyComponent={<Text style={App_StyleSheet.text}>No communities found</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                App_StyleSheet.list_item,
              ]}
              onPress={() => {
                navigation.navigate("Community", {
                  Community: new Community(item.key, item.value),
                  isMember: userCommunities.some((c) => c.key === item.key)
                })
              }
              }
            >
              <Text>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeArea>
  );
}

export default SearchCommunityView;
