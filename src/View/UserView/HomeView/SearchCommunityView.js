import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea.js";
import { getAllCommunities } from "../../../Controller/CommunitiesManager.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import Community from "../../../Model/Community.js";

function SearchCommunityView({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      loadCommunities();
    }
  }, [isFocused]);

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
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
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
            onPress={() =>
              navigation.navigate("Community", {
                Community: new Community(item.key, item.value),
              })}
          >
            <Text>{item.value}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeArea>
  );
}

export default SearchCommunityView;
