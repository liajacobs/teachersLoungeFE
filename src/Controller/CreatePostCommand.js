import { apiUrl, createPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Creates a new post and adds to the database
async function CreatePost({ navigation }, title, content, file, user) {
  if (content != "") {
    let postUrl = apiUrl + createPostRoute;
    console.log(postUrl)
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        content: content,
        fileUrl: file.url,
        email: user.userUserName,
        fileType: file.type,
        fileDisplayName: file.name,
      }),
    };

    const response = await fetch(postUrl, reqOptions);
    const data = await response.json();
    if (response.status != 200) {
      Alert.alert("Error", "Unable to create post");
    } else {
      user.createPost(content, file.url);
      Alert.alert("Success", "Post created");
      navigation.navigate("Home");
    }
  }
}

export default CreatePost;
