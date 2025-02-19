import React, { useState } from "react";
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
import SafeArea from "../../SafeArea";
import CreatePost from "../../../Controller/CreatePostCommand";
import { createCommunityPost } from "../../../Controller/CommunitiesManager";
import UploadFileCommand from "../../../Controller/UploadFileCommand";
import { selectDoc } from "../../../Controller/DocumentPicker";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CreatePostView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  let [file, setFile] = useState("");
  const [postContent, setPostContent] = useState("");

  return (
    <SafeArea>
      <TextInput
        style={App_StyleSheet.postTextInput}
        placeholder={
          route.params?.Community === undefined
            ? "Write a post..."
            : `Write a post to ${route.params?.Community?.name}...`
        }
        onChangeText={(value) => setPostContent(value)}
        value={postContent}
        underlineColor="#808080"
        activeUnderlineColor="#808080"
        multiline
      />
      {file.url != "" && <Text>{file.url}</Text>}
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
          onPress={() =>
            route.params?.Community === undefined
              ? CreatePost(
                { navigation },
                postContent,
                file,
                route.params.User,
              )
              : createCommunityPost(
                { navigation },
                postContent,
                file,
                route.params.User,
                route.params?.Community?.id
              )
          }
        >
          <Text style={App_StyleSheet.text}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
export default CreatePostView;
