import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea.js";
import CreatePost from "../../../Controller/CreatePostCommand.js";
import { createCommunityPost } from "../../../Controller/CommunitiesManager.js";
import UploadFileCommand from "../../../Controller/UploadFileCommand.js";
import { selectDoc, selectPic } from "../../../Controller/DocumentPicker.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import { getUserCommunities } from "../../../Controller/CommunitiesManager.js";

function CreatePostView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [file, setFile] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [communities, setCommunities] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [selectedCommunityName, setSelectedCommunityName] = useState("");

  async function fetchCommunities() {
    const data = await getUserCommunities(route.params?.User?.userUserName);
    const formattedCommunities = data.map((c) => ({
      key: c.id,
      value: c.name,
    }));
    setCommunities(formattedCommunities);
  }

  useEffect(() => {
    if (isFocused) {
      setFile("");
      setPostContent("");
      setPostTitle("");
      setSelectedCommunityId(null);
      setSelectedCommunityName("");
    }
  }, [isFocused]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Post Title:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Write a title for your post..."
            onChangeText={(value) => setPostTitle(value)}
            value={postTitle}
            underlineColor="#808080"
            activeUnderlineColor="#808080"
            multiline={false}
          />

          <Text style={styles.label}>Post Content:</Text>
          <TextInput
            style={[styles.textInput]}
            placeholder="Write a post..."
            onChangeText={(value) => setPostContent(value)}
            value={postContent}
            underlineColor="#808080"
            activeUnderlineColor="#808080"
            multiline
          />
          <Text style={styles.label}>Select a community (optional):</Text>
          <SelectList
            setSelected={(value) => {
              if (value === "None") {
                setSelectedCommunityId(null);
                setSelectedCommunityName("");
              } else {
                const selected = communities.find((c) => c.key === value);
                setSelectedCommunityId(value);
                setSelectedCommunityName(selected ? selected.value : "");
              }
            }}
            data={[
              { key: null, value: "None" },
              ...communities,
            ]}
            placeholder="Select a community"
            defaultOption={
              selectedCommunityId
                ? { key: selectedCommunityId, value: selectedCommunityName }
                : null
            }
            boxStyles={styles.selectBox}
          />

          <TouchableOpacity
            style={styles.smallButton}
            onPress={async () => {
              let file = await selectDoc();
              setFile(file);
            }}
          >
            <Text style={styles.smallButtonText}>
              {file.url ? file.url : "No file uploaded"}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={App_StyleSheet.medium_button}
              onPress={() => {
                if (selectedCommunityId !== "None") {
                  createCommunityPost(
                    { navigation },
                    postTitle,
                    postContent,
                    file,
                    route.params.User,
                    selectedCommunityId
                  );
                } else {
                  CreatePost({ navigation }, postTitle, postContent, file, route.params.User);
                }
              }}
            >
              <Text style={App_StyleSheet.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: "90%",
    maxWidth: 600,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 5,
    marginLeft: 10,
  },
  selectBox: {
    height: 50,
    marginBottom: 20,
    width: "100%",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#808080",
    marginBottom: 20,
  },
  smallButton: {
    backgroundColor: "#E7ECFE",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  smallButtonText: {
    color: "#4A90E2",
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
});

export default CreatePostView;
