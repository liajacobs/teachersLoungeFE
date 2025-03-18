import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea.js";
import CreatePost from "../../../Controller/CreatePostCommand.js";
import { createCommunityPost } from "../../../Controller/CommunitiesManager.js";
import UploadFileCommand from "../../../Controller/UploadFileCommand.js";
import { selectDoc } from "../../../Controller/DocumentPicker.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import { getUserCommunities } from "../../../Controller/CommunitiesManager.js";

function CreatePostView({ navigation }) {
  const route = useRoute();
  const [file, setFile] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [communities, setCommunities] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [selectedCommunityName, setSelectedCommunityName] = useState("");

  useEffect(() => {
    async function fetchCommunities() {
      const data = await getUserCommunities(route.params?.User?.userUserName);
      const formattedCommunities = data.map((c) => ({
        key: c.id,
        value: c.name,
      }));
      setCommunities(formattedCommunities);

      if (route.params?.Community) {
        setSelectedCommunityId(route.params.Community.id);
        setSelectedCommunityName(route.params.Community.name);
      }
    }
    fetchCommunities();
  }, []);

  return (
    <SafeArea>
      <SelectList
        setSelected={(value) => {
          const selected = communities.find((c) => c.key === value);
          setSelectedCommunityId(value);
          setSelectedCommunityName(selected ? selected.value : "");
        }}
        data={communities}
        placeholder="Select a community..."
        defaultOption={
          selectedCommunityId
            ? { key: selectedCommunityId, value: selectedCommunityName }
            : null
        }
      />
      <TextInput
        style={App_StyleSheet.postTextInput}
        placeholder="Write a title for your post..."
        onChangeText={(value) => setPostTitle(value)}
        value={postTitle}
        underlineColor="#808080"
        activeUnderlineColor="#808080"
        multiline
      />
      <TextInput
        style={App_StyleSheet.postTextInput}
        placeholder="Write a post..."
        onChangeText={(value) => setPostContent(value)}
        value={postContent}
        underlineColor="#808080"
        activeUnderlineColor="#808080"
        multiline
      />
      {file.url && <Text>{file.url}</Text>}
      <View style={App_StyleSheet.listings}>
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={async () => {
            let file = await selectDoc();
            setFile(file);
          }}
        >
          <Text style={App_StyleSheet.text}>{"Upload File"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() => {
            if (selectedCommunityId) {
              createCommunityPost(
                { navigation },
                postContent,
                file,
                route.params.User,
                selectedCommunityId
              );
            } else {
              CreatePost({ navigation }, postContent, file, route.params.User);
            }
          }}
        >
          <Text style={App_StyleSheet.text}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

export default CreatePostView;